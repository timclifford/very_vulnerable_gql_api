const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const practices = [
  {
    _id: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
    name: "General Practice Bath",
    address: "GP Bath, Parks Road, Bath",
    phone_number: "(01792) 876123",
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
    name: "General Practice Liverpool",
    address: "GP Liverpool, Woodstock Road, Liverpool",
    phone_number: "(01682) 676123",
    __v: 0
  },
  {
    _id: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
    name: "General Practice Oxford",
    address: "GP Oxford, Broad Street, Oxford",
    phone_number: "(01865) 298787",
    __v: 0
  }
];

module.exports = practices;
