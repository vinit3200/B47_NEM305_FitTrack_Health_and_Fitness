let mongoose = require('mongoose');
let workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, 
  calories: { type: Number, required: true },  
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Workout', workoutSchema);
