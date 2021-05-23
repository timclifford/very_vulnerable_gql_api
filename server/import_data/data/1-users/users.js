const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { getObjectId, getObjectIds } = require('../../helpers/index');

const users = [
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc210"),
    username: "admin",
    display_name: "Administator",
    email: "admin@sys-admin.com",
    password: "$2b$10$F3iSWtEGYgS8ueqYdSYCguhibBFMA7gKe05uM3W8j1Q9aUN/EIZzK",
    practice: null,
    roles: ["user", "super-admin"],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc214"),
    username: "dr-john-doe",
    display_name: "Dr. John Doe",
    email: "dr.john.doe@general-practice-1.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b0"),
    roles: ['user', 'doctor'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc215"),
    username: "dr-rachel-adams",
    display_name: "Dr. Rachel Adams",
    email: "dr.rachel.adams@general-practice-2.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b1"),
    roles: ['user', 'doctor'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc216"),
    username: "dr-susan-richards",
    display_name: "Dr. Susan Richards",
    email: "dr.susan.richards@general-practice-3.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b2"),
    roles: ['user', 'doctor'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc217"),
    username: "adam-andrews",
    display_name: "Adam Andrews",
    email: "adam.andrews@general-practice-1.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b0"),
    roles: ['user', 'receptionist'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc218"),
    username: "jane-smith",
    display_name: "Jane Smith",
    email: "jane.smith@general-practice-2.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b1"),
    roles: ['user', 'receptionist'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc219"),
    username: "chloe-howard",
    display_name: "Chloe Howard",
    email: "chlow.howard@general-practice-3.com",
    password: "$2b$10$EWbF4QF6pWjybTq1UUywe.d.KQ9X6Onhd/BLzM5//VWFhM9iH5q6i",
    practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b2"),
    roles: ['user', 'receptionist'],
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc220"),
    username: "super-admin",
    display_name: "Super Administator",
    email: "super.admin@superadmin.com",
    password: "$2b$10$BCBLMru2qIs3s9xYh2/5O.rDThJCcvkUirzhpV58YfugRc7XL2Xgi",
    practice: null,
    roles: ['user', 'super-admin'],
    __v: 0
  }
];

module.exports = users;
