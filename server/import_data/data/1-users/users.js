const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const users = [
  {
    _id: new mongoose.Types.ObjectId("61058e7c672ded63e989d9e4"),
    username: "admin",
    display_name: "GP Bath Administator",
    email: "admin@sys-admin.com",
    password: "$2b$10$F3iSWtEGYgS8ueqYdSYCguhibBFMA7gKe05uM3W8j1Q9aUN/EIZzK",
    practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
    roles: ["user", "super-admin"],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058e8e77190f49df6e7d1b"),
    username: "dr-john-doe",
    display_name: "Dr. John Doe",
    email: "dr.john.doe@general-practice-1.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
    roles: ['user', 'doctor'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058ea4d1bb361df4bcc156"),
    username: "dr-rachel-adams",
    display_name: "Dr. Rachel Adams",
    email: "dr.rachel.adams@general-practice-2.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
    roles: ['user', 'doctor'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058ebbddfd9ff3687a823a"),
    username: "dr-susan-richards",
    display_name: "Dr. Susan Richards",
    email: "dr.susan.richards@general-practice-3.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
    roles: ['user', 'doctor'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058ecba911845167fd30cb"),
    username: "adam-andrews",
    display_name: "Adam Andrews",
    email: "adam.andrews@general-practice-1.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
    roles: ['user', 'receptionist'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058edcf9cda4616198883f"),
    username: "jane-smith",
    display_name: "Jane Smith",
    email: "jane.smith@general-practice-2.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
    roles: ['user', 'receptionist'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058eeb9a10e56c114408be"),
    username: "chloe-howard",
    display_name: "Chloe Howard",
    email: "chloe.howard@general-practice-3.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
    roles: ['user', 'receptionist'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058efe65b0e7144be9175b"),
    username: "super-admin",
    display_name: "Super Administator",
    email: "super.admin@superadmin.com",
    password: "$2b$10$F3iSWtEGYgS8ueqYdSYCguhibBFMA7gKe05uM3W8j1Q9aUN/EIZzK",
    practice: null,
    roles: ['user', 'super-admin'],
    __v: 0
  }
];

module.exports = users;
