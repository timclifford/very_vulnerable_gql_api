const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("../middleware");

const Query = {
  users: combineResolvers(isAuthenticated, async (parent, args, { User, Practice }) => {
    const usersObj = await User.find() || null;

    const users = await Promise.all(usersObj.map(async user => {
      const practiceObj = await Practice.findById(user.practice) || null;
      return { ...user.toObject(), practice: practiceObj };
    }));

    return users;
  }),
  doctors: combineResolvers(isAuthenticated, async (parent, args, { User }) => {
    return await User.find({roles: "doctor"});
  }),
  practices: async (parent, args, { Practice }) => {
    return await Practice.find();
  },
  appointments: combineResolvers(isAuthenticated, async (parent, args, {
     Appointment,
     Patient,
     User,
     Practice
   }) => {
    const appointmentsObj = await Appointment.find() || null;

    const appointments = await Promise.all(appointmentsObj.map(async appointment => {
      const { _id, patient, doctor, practice, booked_by, date } = appointment.toObject();

      const patientObj = await Patient.findById(patient) || null;
      const doctorObj = await User.findById(doctor) || null;
      const practiceObj = await Practice.findById(practice) || null;
      const bookedByObj = await User.findById(booked_by) || null;

      return { _id, patient: patientObj, doctor: doctorObj, practice: practiceObj, booked_by: bookedByObj, date };
    }));

    return appointments;
  }),
  patient: combineResolvers(isAuthenticated, async (parent, args, { User, Patient, Note, user }) => {
    // Get currrent user.
    const [{ _id }] = await User.find({username: user.username});

    if (args._id || args.name) {
      const patient = args._id ? await Patient.findById(args._id) : await Patient.findOne({ name: args.name });

      //@TODO move to middleware
      if (!patient) {
        throw new Error("No patient could be found.");
      }

      // Check if doctor (user) is caring for this patient.
      if (patient.doctor !== user.username) {
        throw new Error("No access to see this patients records.");
      }

      const notes = await Note.find({ patient: patient._id }) || [];

      if (notes === null) {
        return patient.toObject();
      }

      const { sender } = notes || [];
      const senderData = await User.findById(sender);

      return { ...patient.toObject(), notes: notes, sender: senderData};
    }
  }),
  // @TODO add a search in here to demo NoSQL attack
  patients: combineResolvers(async (parent, args, { User, Patient, user }) => {
    if (!user) {
      throw new Error("Must be logged in.");
    }

    // NoSQL attack
    // console.log('arg: ', args.doctor);
    // console.log('attack: ', await Patient.find({doctor: { $ne: ""}}));

    // Get currrent user.
    const [{ _id, roles }] = await User.find({username: user.username});

    // NOTE: Authorisation logic shuold not be in the resolver, but in the business layer.
    if (!roles.includes("doctor")) {
      throw new Error("Only doctors can see patient records.");
    }

    // if (args.doctor !== user.username) {
    //   throw new Error("No access to see these patients.");
    // }

    if (args.search) {
      console.log('args search:', JSON.parse(JSON.stringify(args.search)));
      console.log('patient: ', await Patient.find(JSON.parse(JSON.stringify(args.search))));
      return await Patient.find(JSON.parse(JSON.stringify(args.search)));
    }
    else {
      // Only return patients to the doctors who are currently in their care.
      // const patients = await Patient.find({doctor: user.username});
      return await Patient.find({ doctor: args.doctor });
    }
  }),
  me: async (parent, args, { Practice, User, user }, req) => {
    const current_user = req.userId ? req.userId : user;

    if (!current_user) {
      return null;
    }

    const userObj = await User.findById(current_user) || null;
    const { practice } = userObj.toObject();

    const practiceObj = await Practice.findById(practice) || null;

    return {...userObj.toObject(), practice: practiceObj.toObject()};
  },
  notes: combineResolvers(isAuthenticated, async (parent, args, { Note, User }) => {
    if (args.patientId) {
      const notes = await Note.find({patient: args.patientId});

      const withSender = await Promise.all(notes.map(async note => {
        const { sender } = note || null;
        const senderData = await User.findById(sender);
        return { ...note.toObject(), sender: senderData };
      }));

      return withSender;
    }
  }),
};

module.exports = Query;
