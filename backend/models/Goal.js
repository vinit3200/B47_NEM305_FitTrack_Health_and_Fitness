let mongoose = require('mongoose');

let goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalType: { type: String, enum: ['calories', 'protein', 'workout', 'steps'], required: true },
  targetValue: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', goalSchema);
