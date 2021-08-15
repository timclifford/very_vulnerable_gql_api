const mongoose = require('mongoose');
const { getObjectId, getObjectIds } = require('../../helpers/index');

const notes = [
  {
    _id: new mongoose.Types.ObjectId("61059056d4108c906ca7ff1a"),
    patient: new mongoose.Types.ObjectId("61058f1342af852451f83cd3"),
    text: "A medical message about a patient's health.",
    date: "2020-05-12T15:43:53.696Z",
    sender: new mongoose.Types.ObjectId("61058e8e77190f49df6e7d1b"),
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("610590624dc0ae28cff20e44"),
    patient: new mongoose.Types.ObjectId("61058f4acfc978a23b5274d5"),
    text: "Another medical message about a patient's health.",
    date: "2020-05-18T11:23:19.696Z",
    sender: new mongoose.Types.ObjectId("61058ea4d1bb361df4bcc156"),
    __v: 0
  }
];

module.exports = notes;
