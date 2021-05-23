const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  address: { type: String },
  weight: { type: String, required: true },
  sex: { type: String, required: true },
  recent_heart_events: { type: Boolean },
  current_health_assessment: { type: String },
  diabetes: { type: Boolean },
  crp: { type: String },
  phone_number: { type: String },
  doctor: { type: String, required: true },
  notes: [{ ref: "Note", type: Schema.Types.ObjectId }],
  appointments: [{ ref: "Appointment", type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model("Patient", PatientSchema);
