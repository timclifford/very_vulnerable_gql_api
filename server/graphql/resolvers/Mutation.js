const bcrypt = require("bcrypt");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, isDoctor, isReceptionist, isAdmin } = require("../middleware");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, passwordResetEmail } = require("../../utils/mail");
const createToken = require("../../utils/createToken");
const mongoose = require('mongoose');

const Mutation = {
  signupUser: async (root, { username, display_name, email, password, passwordConfirm, practice, roles }, { User, res }) => {
    const user = await User.findOne({ username });
    email = email.toLowerCase();

    if (user) {
      throw new Error("User already exists");
    }

    // check if passwords match
    if (password !== passwordConfirm) {
      throw new Error("Your passwords don't match");
    }

    const newUser = await new User({
      username,
      display_name,
      email,
      password,
      practice,
      roles
    }).save();

    const token = createToken(newUser, process.env.JWT_SECRET);
    // set the jwt as a cookie on the response
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
    });

    return { token };
  },
  signinUser: async (root, { email, password }, { User, res }) => {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No user found for email ${email}`);
    }
    // Validate password against given user credentials
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = createToken(user, process.env.JWT_SECRET);
    // set the jwt as a cookie on the response
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
    });

    return {
      token
    };
  },
  signoutUser: async (root, args, { res }) => {
    res.clearCookie("token", { domain: process.env.DOMAIN });
    return { message: "Come back soon" };
  },
  requestReset: async (root, { email }, { User, res }) => {
    // check if there is a user with that email
    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // set a reset token and expiry on that user
    const randomBytesPromise = promisify(randomBytes);
    const resetToken = (await randomBytesPromise(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 36000000; // 1 hour from now
    // update user with resetToken and resetTokenExpiry
    await User.updateOne(
      { email },
      {
        resetToken,
        resetTokenExpiry,
      }
    );

    const passwordResetUrl =
      process.env.NODE_ENV === "development"
        ? `http://${process.env.CLIENT_URI}/reset?resetToken=${resetToken}`
        : `https://${process.env.CLIENT_URI}/reset?resetToken=${resetToken}`;
    // send an email with the reset token
    await transport.sendMail({
      from: "example@general-practice.com",
      to: user.email,
      subject: `Password Reset Token - ${proces.env.DOMAIN}`,
      html: passwordResetEmail(`Password Reset Token \n\n
      <a href="${passwordResetUrl}">Reset password</a>`),
    });
    return { message: "Password reset token has been sent." };
  },
  resetPassword: async (root, { password, passwordConfirm, resetToken }, { User, res }) => {
    // check if passwords match
    if (password !== passwordConfirm) {
      throw new Error("Your passwords don't match");
    }
    // check if the reset token is legit
    // check if it is expired
    const expiryCheck = Date.now() - 3600000;
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: expiryCheck },
    });
    if (!user) {
      throw new Error("This token is either invalid or has expired");
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the new password to the user and remove old reset token
    // findOneAndUpdate will return the user to be returned
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    );
    // generate a JWT
    const token = createToken(updatedUser, process.env.JWT_SECRET);
    // set the JWT cookie
    res.cookie("token", token, {
      domain: process.env.DOMAIN,
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
    });
    return updatedUser;
  },
  addUser: combineResolvers(
    isAuthenticated,
    isAdmin,
    async (root, { username, display_name, email, password, practice, roles }, { User, Practice, res }) => {
      const user = await User.findOne({ username });
      email = email.toLowerCase();

      if (user) {
        throw new Error("User already exists");
      }

      let practiceObj;
      if (practice) {
        practiceObj = await Practice.findOne({ name: practice });
      }

      const newUser = await new User({
        username,
        display_name,
        email,
        password,
        practice: practiceObj,
        roles
      }).save();

      const token = createToken(newUser, process.env.JWT_SECRET);
      return { token };
  }
  ),
  updateUser: combineResolvers(
    isAuthenticated,
    // isAdmin,
    async (parent, {
      input: { user, patch }
    }, {
      User,
      Practice,
      req,
      pubsub
    }) => {
      const userObj = await User.findOne({ _id: user._id });

      if (!userObj) {
        throw new Error("User doesn't exist");
      }

      let practiceObj = null;
      if (patch.practice) {
        practiceObj = await Practice.findOne({ name: patch.practice });
      }

      const updateUser = await User.updateOne({ _id: user._id }, {
        ...patch,
        practice: practiceObj
      });

      let updatedUser = await User.findOne({ _id: user._id });
      if (practiceObj !== null) {
        updatedUser.practice = practiceObj
        return updatedUser;
      }

      return updatedUser;
    }
  ),
  deleteUser: combineResolvers(
    isAuthenticated,
    // isAdmin,
    async (parent, {
      input: { user }
    }, { User, req, pubsub }) => {
      const { _id } = user;
      const u = await User.deleteOne({ _id });
      return `Successfully deleted user '${_id}'`;
    }
  ),
  postNote: combineResolvers(
    isAuthenticated,
    async (parent, { patient, text, date }, { Note, req, pubsub }) => {
      const newNote = new Note({
        patient,
        text,
        date,
        sender: req.userId,
      });
      const note = await newNote.save();
      const populatedNote = await note.populate("sender").execPopulate();
      pubsub.publish("note-added", { newNote: populatedNote });
      return populatedNote;
    }
  ),
  addAppointment: combineResolvers(
    isAuthenticated,
    // isReceptionist,
    async (parent, {
      patient, date, booked_by, doctor
    }, { Appointment, Patient, Practice, User, req, pubsub }) => {

      const patientObj = patient && await Patient.findOne({ name: patient });
      const bookedByObj = await User.findOne({ display_name: booked_by }) || null;
      const doctorObj = await User.findOne({ username: doctor }) || null;

      if (patientObj === null) {
        throw new Error("Patient doesn't exist.")
      }

      if (bookedByObj === null) {
        throw new Error("User who booked doesn't exist.")
      }

      if (doctorObj === null) {
        throw new Error("Doctor doesn't exist.")
      }

      const patient_practice =  await Practice.findOne({ _id: patientObj.practice });

      const newAppointment = new Appointment({
        patient: patientObj._id,
        date,
        practice: patient_practice._id,
        doctor: doctorObj._id,
        booked_by: bookedByObj._id,
      });

      const appointment = await newAppointment.save();
      return appointment;
    }
  ),
  updateAppointment: combineResolvers(
    isAuthenticated,
    isReceptionist,
    async (parent, {
      input: { appointment, patch }
    }, {
      Appointment,
      Patient,
      Practice,
      User,
      req,
      pubsub
    }) => {
      const doctorObj = await User.findOne({ username: patch.doctor }) || null;
      const bookedByObj = await User.findOne({ display_name: patch.booked_by }) || null;

      if (doctorObj === null) {
        throw new Error(`Doctor not found`);
      }

      if (bookedByObj === null) {
        throw new Error(`User who booked not found`);
      }

      const updated = await Appointment.updateOne({ _id: appointment._id }, {
        date: patch.date,
        booked_by: bookedByObj._id,
        doctor: doctorObj._id
      });

      let updatedAppointment = await Appointment.findOne({ _id: appointment._id });
      let { _id, patient, doctor, practice, booked_by, date } = updatedAppointment;
      const patientObj = await Patient.findOne({ _id: patient });
      const patient_practice = await Practice.findById(practice);

      return { _id: _id, patient: { _id: patient }, practice: patient_practice, patient: patientObj, doctor: doctorObj, booked_by: bookedByObj, date };
    }
  ),
  deleteAppointment: combineResolvers(
    isAuthenticated,
    isReceptionist,
    async (parent, {
      input: { appointment }
    }, { Appointment, req, pubsub }) => {
      const { _id } = appointment;
      const a = await Appointment.deleteOne({ _id });
      return `Successfully deleted appointment '${_id}'`;
    }
  ),
  addPractice: async (parent, { name, address, phone_number }, { Practice, req, pubsub }) => {
    const newPractice = new Practice({ name, address, phone_number });
    const practice = await newPractice.save();
    return practice;
  },
  addMedicalRecord: combineResolvers(
    isAuthenticated, isDoctor,
    async (parent, {
      patient, age, sex, weight, recent_heart_events, current_health_assessment, diabetes, crp
    }, { MedicalRecord, Patient, Practice, User, user, req, pubsub }) => {

      const p = await Patient.findOne({ name: patient });

      if (p !== null && p.medical_record.length !== 0) {
        throw new Error("Patient already has a medical record");
      }

      const [{ _id, username, practice }] = await User.find({username: user.username});
      const doctor_practice = await Practice.findById(practice);

      const newPatient = await new Patient({ name: patient, doctor: username, practice: doctor_practice }).save();
      const newMedicalRecord = new MedicalRecord({
        patient: p !== null ? p : newPatient,
        age,
        sex,
        weight,
        recent_heart_events,
        current_health_assessment,
        diabetes,
        crp
      });

      const medical_record = await newMedicalRecord.save();
      await Patient.updateOne({ _id: newPatient._id }, { medical_record: newMedicalRecord._id });

      return medical_record;
    }
  ),
  updateMedicalRecord: combineResolvers(
    isAuthenticated, isDoctor,
    async (parent, {
      input: { patient, patch }
    }, { Patient, MedicalRecord, req, pubsub }) => {
      const { _id } = patient;
      const p = await Patient.findOne({ _id });
      const medical_record_id = { _id: p.medical_record.slice(0,1).shift() };

      if (p.medical_record.length === 0) {
        const record = await new MedicalRecord({ ...patch, patient: _id }).save();
        await Patient.updateOne({ _id: _id }, { medical_record: record._id });

        return await MedicalRecord.findOne({ _id: record._id });
      }
      else {
        const record = await MedicalRecord.updateOne(medical_record_id, { ...patch });
        return await MedicalRecord.findOne(medical_record_id);
      }
    }
  ),
  addPatient: combineResolvers(
    isAuthenticated, isReceptionist,
    async (parent, {
      name, address, phone_number, doctor, practice, appointments
    }, { Patient, Practice, req, pubsub }) => {

      const patient_practice = practice && await Practice.findOne({ name: practice });

      if (patient_practice === null) {
        throw new Error("Practice doesn't exist.")
      }

      const newPatient = new Patient({
        name,
        address,
        phone_number,
        doctor,
        practice: patient_practice,
        appointments
      });

      const patient = await newPatient.save();
      return patient;
    }
  ),
  updatePatient: combineResolvers(
    isAuthenticated, isReceptionist,
    async (parent, {
      input: { patient, patch }
    }, { Patient, Practice, req, pubsub }) => {

      const { _id } = patient;
      const practice = patch.practice ? await Practice.findOne({ name: patch.practice }) : {}

      await Patient.updateOne({ _id }, { ...patch, practice: practice._id });

      const p = await Patient.findOne({ _id });
      const {name, doctor } = p && p;

      return { _id, name, doctor };
    }
  ),
  deletePatient: combineResolvers(
    isAuthenticated, isDoctor,
    async (parent, {
      input: { patient }
    }, { Patient, req, pubsub }) => {
      const { _id } = patient;
      const p = await Patient.deleteOne({ _id });
      return `Successfully deleted patient '${_id}'`;
    }
  )
};

module.exports = Mutation;
