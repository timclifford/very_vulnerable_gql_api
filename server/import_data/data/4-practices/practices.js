const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { getObjectId, getObjectIds } = require('../../helpers/index');

const practices = [
  {
     _id: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b0"),
     name: "General Practice Bath",
     address: "GP Bath, Parks Road, Bath",
     phone_number: "(01792) 876123"
  },
  {
    _id: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b1"),
    name: "General Practice Liverpool",
    address: "GP Liverpool, Woodstock Road, Liverpool",
    phone_number: "(01682) 676123"
  },
  {
    _id: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b2"),
    name: "General Practice Oxford",
    address: "GP Oxford, Broad Street, Oxford",
    phone_number: "(01865) 298787"
  }
];

module.exports = practices;
