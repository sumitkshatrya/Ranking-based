// backend/models/History.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true,
    maxlength: 50
  },
  points: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

// Index for history queries
historySchema.index({ userId: 1, createdAt: -1 });
historySchema.index({ createdAt: -1 });

module.exports = mongoose.model('History', historySchema);