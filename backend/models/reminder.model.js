const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    mode: { type: String, enum: ['health', 'medicine'], default: 'health' },
    personName: String,
    visitFor: String,          // used when mode==='health'
    medicine: String,          // used when mode==='medicine'
    date: String,              // yyyy-mm-dd
    time: String,              // HH:MM
    notified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);