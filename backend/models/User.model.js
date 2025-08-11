let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' }
},{ timestamps:true });

module.exports = mongoose.model('User', userSchema);
