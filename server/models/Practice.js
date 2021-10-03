const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PracticeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone_number: { type: String }
});

module.exports = mongoose.model("Practice", PracticeSchema);
