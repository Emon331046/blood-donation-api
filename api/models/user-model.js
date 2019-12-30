const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  location: {type: String, required: true},
  contactNo: {type: String, required: true},
  bloodGroup: {type: String, required: true}
})
module.exports = mongoose.model('User',userSchema);
