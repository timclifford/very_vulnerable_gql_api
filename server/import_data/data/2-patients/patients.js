const mongoose = require('mongoose');
const { getObjectId, getObjectIds } = require('../../helpers/index');

const patients = [
  {
     _id: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c0"),
     name: "Kevin Vardy",
     age: 28,
     address: "27 Roker Terrace, LANGLEY, GU33 1QX",
     weight: "82kg",
     sex: "male",
     recent_heart_events: true,
     current_health_assessment: "HIGHRISK",
     diabetes: true,
     crp: "ABNORMAL",
     phone_number: "07983284918",
     doctor: 'dr-john-doe',
     notes: [new mongoose.Types.ObjectId("5f0b1d5792168e4ad3f7e65a")],
     appointments: [
       new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293b8")
     ]
  },
  {
     _id: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c1"),
     name: "Lisa Phillips",
     age: 23,
     address: "97 Abingdon Road, BRADFORD, IP13 4QA",
     weight: "64kg",
     sex: "female",
     recent_heart_events: false,
     current_health_assessment: "LOWRISK",
     diabetes: false,
     crp: "NORMAL",
     phone_number: "07792819281",
     doctor: 'dr-rachel-adams',
     notes: [new mongoose.Types.ObjectId("5f0b1d5792168e4ad3f7e65b")],
     appointments: [
       new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293b9")
     ]
  },
  {
      _id: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c2"),
      name: "Roger Penrose",
      age: 65,
      address: "87 Fraserburgh Rd, LULLINGTON, HD3 5XU",
      weight: "76kg",
      sex: "male",
      recent_heart_events: false,
      current_health_assessment: "MEDIUMRISK",
      diabetes: false,
      crp: "NORMAL",
      phone_number: "07819483947",
      doctor: 'dr-rachel-adams',
      notes: [],
      appointments: [
        new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293ba")
      ]
   },
   {
      _id: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c3"),
      name: "Claire Smith",
      age: 85,
      address: "85 Davids Lane, OXFORD, LA12 2ET",
      weight: "56kg",
      sex: "female",
      recent_heart_events: false,
      current_health_assessment: "MEDIUMRISK",
      diabetes: false,
      crp: "NORMAL",
      phone_number: "07883749272",
      doctor: 'dr-john-doe',
      notes: [],
      appointments: [
        new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293bb")
      ]
   },
   {
      _id: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c4"),
      name: "Paul Hart",
      age: 21,
      address: "12 Edgar Lane, BRIGHTON, BR15 1VT",
      weight: "86kg",
      sex: "male",
      recent_heart_events: false,
      current_health_assessment: "MEDIUMRISK",
      diabetes: true,
      crp: "NORMAL",
      phone_number: "07938783987",
      doctor: 'dr-susan-richards',
      notes: [],
      appointments: [
        new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293bc")
      ]
   },
   {
      _id: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c5"),
      name: "Charlie Austin",
      age: 36,
      address: "33 May Lane, CAMBRIDGE, CB21 3ED",
      weight: "79kg",
      sex: "female",
      recent_heart_events: false,
      current_health_assessment: "LOWRISK",
      diabetes: false,
      crp: "NORMAL",
      phone_number: "07867382761",
      doctor: 'dr-susan-richards',
      notes: [],
      appointments: [
        new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293bd")
      ]
   }
];

module.exports = patients;
