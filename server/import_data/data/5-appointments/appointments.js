const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const { getObjectId, getObjectIds } = require('../../helpers/index');

const appointments = [
  {
     _id: new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293b8"),
     patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c0"),
     doctor: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc214"),
     practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b0"),
     booked_by: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc217"),
     date: "2020-05-05T11:45:00.696Z"
  },
  {
     _id: new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293b9"),
     patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c1"),
     doctor: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc215"),
     practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b1"),
     booked_by: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc218"),
     date: "2020-05-11T13:00:00.696Z"
  },
  {
     _id: new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293ba"),
     patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c2"),
     doctor: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc215"),
     practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b1"),
     booked_by: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc218"),
     date: "2020-04-22T09:00:00.696Z"
  },
  {
     _id: new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293bb"),
     patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c3"),
     doctor: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc214"),
     practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b0"),
     booked_by: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc217"),
     date: "2020-05-25T14:15:00.696Z"
  },
  {
     _id: new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293bc"),
     patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c4"),
     doctor: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc216"),
     practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b2"),
     booked_by: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc219"),
     date: "2020-05-10T13:00:00.696Z"
  },
  {
     _id: new mongoose.Types.ObjectId("5f2b1fafc5969d05aef293bd"),
     patient: new mongoose.Types.ObjectId("5f0b054d0d8ffd7be78f05c5"),
     doctor: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc216"),
     practice: new mongoose.Types.ObjectId("5f26c91928c15831f5e3d7b2"),
     booked_by: new mongoose.Types.ObjectId("d033e22ae348aeb5660fc219"),
     date: "2020-05-12T17:00:00.696Z"
  }
];

module.exports = appointments;
