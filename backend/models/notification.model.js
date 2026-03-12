const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reminderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reminder' },
  message: String,
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);