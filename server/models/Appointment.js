const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  patient: { ref: "Patient", type: Schema.Types.ObjectId, required: true },
  doctor: { ref: "User", type: Schema.Types.ObjectId, required: true },
  practice: { ref: "Practice", type: Schema.Types.ObjectId, required: true },
  booked_by: { ref: "User", type: Schema.Types.ObjectId, required: true },
  date: { type: String }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
