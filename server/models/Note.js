const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  patient: { ref: "Patient", type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: String },
  sender: { ref: "User", type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("Note", NoteSchema);
