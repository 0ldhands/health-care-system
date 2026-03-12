const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: String, // Optional: for user-specific history
  query: String,
  result: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);