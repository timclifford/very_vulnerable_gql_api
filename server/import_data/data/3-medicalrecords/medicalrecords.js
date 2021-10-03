const mongoose = require('mongoose');
const { getObjectId, getObjectIds } = require('../../helpers/index');

const medicalrecords = [
  {
     _id: new mongoose.Types.ObjectId("61058f29bd215d1542c8dd5c"),
     patient: new mongoose.Types.ObjectId("61058f1342af852451f83cd3"),
     age: 28,
     weight: "82kg",
     sex: "male",
     recent_heart_events: true,
     current_health_assessment: "HIGHRISK",
     diabetes: true,
     crp: "ABNORMAL",
     notes: [new mongoose.Types.ObjectId("61059056d4108c906ca7ff1a")],
     __v: 0
  },
  {
     _id: new mongoose.Types.ObjectId("61058f72bdcaab2fe27b61f2"),
     patient: new mongoose.Types.ObjectId("61058f4acfc978a23b5274d5"),
     age: 23,
     weight: "64kg",
     sex: "female",
     recent_heart_events: false,
     current_health_assessment: "LOWRISK",
     diabetes: false,
     crp: "NORMAL",
     notes: [new mongoose.Types.ObjectId("610590624dc0ae28cff20e44")],
     __v: 0
  },
  {
      _id: new mongoose.Types.ObjectId("61058f9ebb6691551bf8b3a5"),
      patient: new mongoose.Types.ObjectId("61058f8e83cec5990e73992a"),
      age: 65,
      weight: "76kg",
      sex: "male",
      recent_heart_events: false,
      current_health_assessment: "MEDIUMRISK",
      diabetes: false,
      crp: "NORMAL",
      notes: [],
      __v: 0
   },
   {
      _id: new mongoose.Types.ObjectId("61058fc9c66715626bd9135e"),
      patient: new mongoose.Types.ObjectId("61058fbbc7847a13c4e63f2d"),
      age: 85,
      weight: "56kg",
      sex: "female",
      recent_heart_events: false,
      current_health_assessment: "MEDIUMRISK",
      diabetes: false,
      crp: "NORMAL",
      notes: [],
      __v: 0
   },
   {
      _id: new mongoose.Types.ObjectId("610590003ecaca645d80dd4b"),
      patient: new mongoose.Types.ObjectId("61058fe2cfc0f56c1638329b"),
      age: 21,
      weight: "86kg",
      sex: "male",
      recent_heart_events: false,
      current_health_assessment: "MEDIUMRISK",
      diabetes: true,
      crp: "NORMAL",
      notes: [],
      __v: 0
   },
   {
      _id: new mongoose.Types.ObjectId("6105902d6ff67f350daf5f11"),
      patient: new mongoose.Types.ObjectId("6105901cfa4b8b3aa1b3520a"),
      age: 36,
      weight: "79kg",
      sex: "female",
      recent_heart_events: false,
      current_health_assessment: "LOWRISK",
      diabetes: false,
      crp: "NORMAL",
      notes: [],
      __v: 0
   }
];

module.exports = medicalrecords;
