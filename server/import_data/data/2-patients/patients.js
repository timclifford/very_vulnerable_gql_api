const mongoose = require('mongoose');

const patients = [
  {
    _id: new mongoose.Types.ObjectId("61058f1342af852451f83cd3"),
    name: "Kevin Vardy",
    address: "27 Roker Terrace, LANGLEY, GU33 1QX",
    phone_number: "07983284918",
    doctor: 'dr-john-doe',
    practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
    medical_record: new mongoose.Types.ObjectId("61058f29bd215d1542c8dd5c"),
    appointments: [
      new mongoose.Types.ObjectId("61058f36e8f75debf02801e0")
    ],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058f4acfc978a23b5274d5"),
    name: "Lisa Phillips",
    address: "97 Abingdon Road, BRADFORD, IP13 4QA",
    phone_number: "07792819281",
    doctor: 'dr-rachel-adams',
    practice: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
    medical_record: new mongoose.Types.ObjectId("61058f72bdcaab2fe27b61f2"),
    appointments: [
      new mongoose.Types.ObjectId("61058f81537d31d86f66fdce")
    ],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058f8e83cec5990e73992a"),
    name: "Roger Penrose",
    address: "87 Fraserburgh Rd, LULLINGTON, HD3 5XU",
    phone_number: "07819483947",
    doctor: 'dr-rachel-adams',
    practice: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
    medical_record: new mongoose.Types.ObjectId("61058f9ebb6691551bf8b3a5"),
    appointments: [
      new mongoose.Types.ObjectId("61058fab5c06f30db448be84")
    ],
    __v: 0
   },
   {
    _id: new mongoose.Types.ObjectId("61058fbbc7847a13c4e63f2d"),
    name: "Claire Smith",
    address: "85 Davids Lane, OXFORD, LA12 2ET",
    phone_number: "07883749272",
    doctor: 'dr-john-doe',
    practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
    medical_record: new mongoose.Types.ObjectId("61058fc9c66715626bd9135e"),
    appointments: [
      new mongoose.Types.ObjectId("61058fd556017157184425a8")
    ],
    __v: 0
   },
   {
      _id: new mongoose.Types.ObjectId("61058fe2cfc0f56c1638329b"),
      name: "Paul Hart",
      address: "12 Edgar Lane, BRIGHTON, BR15 1VT",
      phone_number: "07938783987",
      doctor: 'dr-susan-richards',
      practice: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
      medical_record: new mongoose.Types.ObjectId("610590003ecaca645d80dd4b"),
      appointments: [
        new mongoose.Types.ObjectId("6105900da2a79377ba22559f")
      ],
      __v: 0
   },
   {
      _id: new mongoose.Types.ObjectId("6105901cfa4b8b3aa1b3520a"),
      name: "Charlie Austin",
      address: "33 May Lane, CAMBRIDGE, CB21 3ED",
      phone_number: "07867382761",
      doctor: 'dr-susan-richards',
      practice: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
      medical_record: new mongoose.Types.ObjectId("6105902d6ff67f350daf5f11"),
      appointments: [
        new mongoose.Types.ObjectId("6105903af5bb1e5426033976")
      ],
      __v: 0
   }
];

module.exports = patients;
