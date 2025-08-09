let mongoose = require('mongoose');

let subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
