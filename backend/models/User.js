// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  profileFor: { type: String },
  gender: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  fathersName: { type: String },
  mothersName: { type: String },
  dob: { type: Date },
  school: { type: String },
  schoolYear: { type: String },
  college: { type: String },
  collegeYear: { type: String },
  university: { type: String },
  universityYear: { type: String },
  currentStatus: { type: String },
  occupation: { type: String },
  religion: { type: String },
  foodHabit: { type: String },
  weight: { type: String },
  height: { type: String },
  hobby: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
