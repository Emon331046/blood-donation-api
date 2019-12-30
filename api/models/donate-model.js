const mongoose = require('mongoose');
const donatorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  bloodGroup: String,
  location: String,
  contactNo: String
})
module.exports = mongoose.model('Donator',donatorSchema);
