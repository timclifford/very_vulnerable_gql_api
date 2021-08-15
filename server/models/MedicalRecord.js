const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
  patient: { ref: "Patient", type: Schema.Types.ObjectId, required: true },
  age: { type: Number, required: true },
  weight: { type: String, required: true },
  sex: { type: String, required: true },
  recent_heart_events: { type: Boolean },
  current_health_assessment: { type: String },
  diabetes: { type: Boolean },
  crp: { type: String },
  notes: [{ ref: "Note", type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
