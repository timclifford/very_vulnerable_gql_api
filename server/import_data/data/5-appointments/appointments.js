const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { getObjectId, getObjectIds } = require('../../helpers/index');

const appointments = [
  {
     _id: new mongoose.Types.ObjectId("61058f36e8f75debf02801e0"),
     patient: new mongoose.Types.ObjectId("61058f1342af852451f83cd3"),
     doctor: new mongoose.Types.ObjectId("61058e8e77190f49df6e7d1b"),
     practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
     booked_by: new mongoose.Types.ObjectId("61058ecba911845167fd30cb"),
     date: "2020-05-05T11:45:00.696Z",
     __v: 0
  },
  {
     _id: new mongoose.Types.ObjectId("61058f81537d31d86f66fdce"),
     patient: new mongoose.Types.ObjectId("61058f4acfc978a23b5274d5"),
     doctor: new mongoose.Types.ObjectId("61058ea4d1bb361df4bcc156"),
     practice: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
     booked_by: new mongoose.Types.ObjectId("61058edcf9cda4616198883f"),
     date: "2020-05-11T13:00:00.696Z",
     __v: 0
  },
  {
     _id: new mongoose.Types.ObjectId("61058fab5c06f30db448be84"),
     patient: new mongoose.Types.ObjectId("61058f8e83cec5990e73992a"),
     doctor: new mongoose.Types.ObjectId("61058ea4d1bb361df4bcc156"),
     practice: new mongoose.Types.ObjectId("61058f5a5a754efc48a889b4"),
     booked_by: new mongoose.Types.ObjectId("61058edcf9cda4616198883f"),
     date: "2020-04-22T09:00:00.696Z",
     __v: 0
  },
  {
     _id: new mongoose.Types.ObjectId("61058fd556017157184425a8"),
     patient: new mongoose.Types.ObjectId("61058fbbc7847a13c4e63f2d"),
     doctor: new mongoose.Types.ObjectId("61058e8e77190f49df6e7d1b"),
     practice: new mongoose.Types.ObjectId("61058e4bb81a2c86d3f81e61"),
     booked_by: new mongoose.Types.ObjectId("61058ecba911845167fd30cb"),
     date: "2020-05-25T14:15:00.696Z",
     __v: 0
  },
  {
     _id: new mongoose.Types.ObjectId("6105900da2a79377ba22559f"),
     patient: new mongoose.Types.ObjectId("61058fe2cfc0f56c1638329b"),
     doctor: new mongoose.Types.ObjectId("61058ebbddfd9ff3687a823a"),
     practice: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
     booked_by: new mongoose.Types.ObjectId("61058eeb9a10e56c114408be"),
     date: "2020-05-10T13:00:00.696Z",
     __v: 0
  },
  {
     _id: new mongoose.Types.ObjectId("6105903af5bb1e5426033976"),
     patient: new mongoose.Types.ObjectId("6105901cfa4b8b3aa1b3520a"),
     doctor: new mongoose.Types.ObjectId("61058ebbddfd9ff3687a823a"),
     practice: new mongoose.Types.ObjectId("61058ff015f4b6241f92d03b"),
     booked_by: new mongoose.Types.ObjectId("61058eeb9a10e56c114408be"),
     date: "2020-05-12T17:00:00.696Z",
     __v: 0
  }
];

module.exports = appointments;
