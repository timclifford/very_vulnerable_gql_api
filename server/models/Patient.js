const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  address: { type: String },
  phone_number: { type: String },
  practice: [{ ref: "Practice", type: Schema.Types.ObjectId }],
  doctor: { type: String, required: true },
  medical_record: [{ ref: "MedicalRecord", type: Schema.Types.ObjectId }],
  appointments: [{ ref: "Appointment", type: Schema.Types.ObjectId }]
});

module.exports = mongoose.model("Patient", PatientSchema);
