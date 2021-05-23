const mongoose = require('mongoose');
const { getObjectId, getObjectIds } = require('../../helpers/index');

const notes = [
  {
    _id: new mongoose.Types.ObjectId("5f0b1d5792168e4ad3f7e65a"),
    patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c0"),
    text: "A medical message about a patient's health.",
    date: "2020-05-12T15:43:53.696Z",
    sender: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc214"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("5f0b1d5792168e4ad3f7e65b"),
    patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c1"),
    text: "Another medical message about a patient's health.",
    date: "2020-05-18T11:23:19.696Z",
    sender: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc215"),
    __v: 0
  }
];

module.exports = notes;
