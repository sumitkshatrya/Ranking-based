const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim:true,
    unique:true,
    maxlength:50
  },
  points: {
    type:Number,
    default:0,
    min:0
  }
}, {
  timestamps: true
});

// Index for leaderboard queries
userSchema.index({ points: -1, name: 1 });

module.exports = mongoose.model('User', userSchema);