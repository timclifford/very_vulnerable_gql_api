const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("../middleware");

const User = require("../../models/User");
const Practice = require("../../models/Practice");
const Appointment = require("../../models/Appointment");
const Patient = require("../../models/Patient");
const MedicalRecord = require("../../models/MedicalRecord");
const Note = require("../../models/Note");

// Returns a complete Patient object given patient ID
const getPatientObj = async (patient) => {
  if (!patient) return;

  const patientObj = await Patient.findById(patient) || null;
  const practiceObj = await Practice.findById(patientObj.practice) || null;
  const medicalRecordObj = await MedicalRecord.findById(patientObj.medical_record) || null;
  const notes = await Note.findOne({ patient: patient._id }) || null;
  const { sender } = notes || [];
  const senderData = await User.findById(sender) || null;

  return {
    ...patientObj._doc,
    practice: { ...practiceObj._doc },
    medical_record: { ...medicalRecordObj._doc, patient: getPatientObj(patient) },
    notes: notes, sender: senderData
  };
}

const getMedicalRecordObj = async (medical_record) => {
  const medicalRecordObj = await MedicalRecord.findById(medical_record) || null;

  return {
    ...medicalRecordObj._doc,
    patient: getPatientObj(medical_record.patient)
  }
}

const getDoctorObj = async (doctor) => {
  const doctorObj = await User.findById(doctor) || null;
  const practiceObj = await Practice.findById(doctorObj.practice) || null;

  return {
    ...doctorObj._doc,
    practice: practiceObj
  }
}

const getUserObj = async (user) => {
  const userObj = await User.findById(user) || null;
  const practiceObj = await Practice.findById(userObj.practice) || null;

  return {
    ...userObj._doc,
    practice: practiceObj
  }
}

const Query = {
  users: combineResolvers(isAuthenticated, async (parent, args, { User, Practice }) => {
    const usersObj = await User.find() || null;

    const users = await Promise.all(usersObj.map(async user => {
      const practiceObj = await Practice.findById(user.practice) || null;
      return { ...user._doc, practice: practiceObj };
    }));

    return users;
  }),
  doctors: combineResolvers(isAuthenticated, async (parent, args, { User }) => {
    return await User.find({roles: "doctor"});
  }),
  practices: async (parent, args, { Practice }) => {
    return await Practice.find();
  },
  appointment: async (parent, args, {
    Appointment,
    Practice
  }) => {
    const appointment = await Appointment.findById(args._id) || null;

    if (appointment) {
      const { _id, patient, doctor, practice, booked_by, date } = appointment._doc;
      const patientObj = await getPatientObj(patient) || null;
      const doctorObj = await getDoctorObj(doctor) || null;
      const practiceObj = await Practice.findById(practice) || null;
      const bookedByObj = await getUserObj(booked_by) || null;

      return { _id, patient: patientObj, doctor: doctorObj, practice: practiceObj, booked_by: bookedByObj, date };
    }
  },
  appointments: combineResolvers(isAuthenticated, async (parent, args, {
     Appointment,
     Practice
   }) => {
    if (!args.practice) throw new Error("Practice needs to be given as an argument");

    const appointmentsObj = await Appointment.find({ practice: args.practice }) || null;

    const appointments = await Promise.all(appointmentsObj.map(async appointment => {
      const { _id, patient, doctor, practice, booked_by, date } = appointment._doc;

      const patientObj = await getPatientObj(patient) || null;
      const doctorObj = await getDoctorObj(doctor) || null;
      const practiceObj = await Practice.findById(practice) || null;
      const bookedByObj = await getUserObj(booked_by) || null;

      return { _id, patient: patientObj, doctor: doctorObj, practice: practiceObj, booked_by: bookedByObj, date };
    }));

    return appointments;
  }),
  patient: combineResolvers(isAuthenticated, async (parent, args, {
    User,
    Patient,
    MedicalRecord,
    Note,
    Practice,
    user
  }) => {
    // Get currrent user.
    const [{ _id, roles }] = await User.find({username: user.username});

    // Only doctors and receptionists can see patient data
    if (!['doctor', 'receptionist'].some(r => roles.includes(r))) {
      throw new Error("Access denied: Not allowed to view patient data");
    }

    if (args._id || args.name) {
      const patient = args._id ? await Patient.findById(args._id) : await Patient.findOne({ name: args.name });

      // Return early if receptionist
      if (roles.includes('receptionist')) {
        const practice = await Practice.findById(patient.practice);

        return { ...patient._doc, practice, medical_record: {} }
      }

      if (!patient) {
        throw new Error(`No patient could be found with '${args._id || args.name}'`);
      }

      // Check if doctor (user) is caring for this patient.
      if (patient.doctor !== user.username) {
        throw new Error(`No access to see this patient's '${args.name || args._id}' medical record.`);
      }

      const practice = await Practice.findById(patient.practice);

      const medical_record = await MedicalRecord.findById(patient.medical_record[0]);
      if (medical_record === null) {
        return { ...patient._doc, practice };
      }

      const notes = await Note.findOne({ patient: patient._id }) || [];

      if (notes === null) {
        return { ...patient._doc, practice, ...medical_record._doc };
      }

      const { sender } = notes || [];
      const senderData = await User.findById(sender);

      return full_medical_record = {...patient._doc, practice, medical_record: {...medical_record._doc}, notes: notes, sender: senderData};
    }
  }),
  patientsDirectory: combineResolvers(async (parent, args, { User, Patient, Practice, user }) => {
    if (!user) {
      throw new Error("Must be logged in.");
    }

    // Get currrent user.
    const [{ _id, roles, practice }] = await User.find({username: user.username});

    if (!roles.includes("receptionist")) {
      throw new Error(`No access to patient directory with your role`);
    }

    if (practice._id != args.practice) {
      throw new Error(`No access to this practice's patient directory`);
    }

    let patients = await Patient.find({ practice: args.practice });

    const p = patients.map(async (p) => {
      let practice = await Practice.findById(p.practice);
      return { ...p._doc, practice: {...practice._doc} };
    });

    return Promise.all(p).then(results => results);
  }),
  patients: combineResolvers(async (parent, args, { User, Patient, Practice, MedicalRecord, user }) => {
    if (!user) {
      throw new Error("Must be logged in.");
    }

    // Get currrent user.
    const [{ _id, roles }] = await User.find({username: user.username});

    // AUTHZ ISSUE: Authorisation logic should not be in the resolver, but in the business layer.
    if (!roles.includes("doctor")) {
      throw new Error("Only doctors can see patient records.");
    }

    // Only doctors caring for a patient are able to see their records
    if (args.doctor !== user.username) {
      throw new Error("No access to see these patients.");
    }

    if (args.search) {
      const patients = await Patient.find(JSON.parse(args.search));

      const p = patients.map(async (p) => {
        let practice = await Practice.findById(p.practice);
        let medical_record = await MedicalRecord.findById(p.medical_record);
        return getPatientObj(p._id);
      });

      return Promise.all(p).then(results => results);
    }
    else {
      // Only return patients to the doctors who are currently in their care.
      const patients = await Patient.find({doctor: args.doctor});

      const p = patients.map(async (p) => {
        return getPatientObj(p._id);
      });

      return Promise.all(p).then(results => results);
    }
  }),
  me: combineResolvers(async (parent, args, { Practice, User, user }, req) => {
    const current_user = req.userId ? req.userId : user;

    if (!current_user) {
      return null;
    }

    const userObj = await User.findById(current_user._id) || null;
    const { practice } = userObj || null;
    const practiceObj = practice && await Practice.findById(practice) || null;

    return {...userObj._doc, practice: practice ? practiceObj._doc : null};
  }),
  user: combineResolvers(async (parent, args, { User, Practice, user }, req) => {
    let userObj = {};

    if (args._id) {
      userObj = await User.findById(args._id);
    }

    if (!userObj) {
      return ("No user could be found with that id.");
    }

    if (userObj?.practice) {
      const { practice } = userObj || null;
      const practiceObj = Practice && await Practice.findById(practice) || null;

      return { ...userObj._doc, practice: Practice && practiceObj._doc };
    }
    else {
      return { ...userObj._doc };
    }
  }),
  notes: combineResolvers(isAuthenticated, async (parent, args, { Note, User }) => {
    if (args.patientId) {
      const notes = await Note.find({patient: args.patientId});

      const withSender = await Promise.all(notes.map(async note => {
        const { sender } = note || null;
        const senderData = await User.findById(sender);
        return { ...note._doc, sender: senderData };
      }));

      return withSender;
    }
  }),
};

module.exports = Query;
