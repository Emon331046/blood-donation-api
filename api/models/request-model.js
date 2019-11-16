const mongoose = require('mongoose');
const requestSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  bloodGroup: String,
  AmountOfBlood: Number,
  location: String,
  contactNo: String,
  needWithIn: String,
  managed: Boolean
})
module.exports = mongoose.model('Requester',requestSchema);
