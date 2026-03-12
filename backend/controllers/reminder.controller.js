const Reminder = require('../models/reminder.model.js');
const Notification = require('../models/notification.model.js');

// create new reminder
exports.createReminder = async (req, res) => {
  try {
    const userId = req.userId;
    const { mode, personName, visitFor, medicine, date, time } = req.body;

    const reminderData = { userId, mode, personName, date, time };
    if (mode === 'health') reminderData.visitFor = visitFor;
    else if (mode === 'medicine') reminderData.medicine = medicine;

    const reminder = new Reminder(reminderData);
    await reminder.save();

    // schedule notification for this reminder (scheduler will also pick up newer ones automatically)
    // we'll just respond and let global scheduler job handle it

    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const userId = req.userId;
    const reminders = await Reminder.find({ userId }).sort({ date: 1, time: 1 });
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { mode, personName, visitFor, medicine, date, time } = req.body;

    const updateData = { mode, personName, date, time };
    if (mode === 'health') updateData.visitFor = visitFor;
    else if (mode === 'medicine') updateData.medicine = medicine;

    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });

    res.status(200).json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// this endpoint is for the scheduler to mark a reminder as notified and create a notification record
exports.markNotified = async (reminder) => {
  try {
    reminder.notified = true;
    await reminder.save();
    const msg = reminder.mode === 'health'
      ? `It's time for ${reminder.personName}'s ${reminder.visitFor}`
      : `Take medicine ${reminder.medicine} for ${reminder.personName}`;

    const notification = new Notification({
      userId: reminder.userId,
      reminderId: reminder._id,
      message: msg
    });
    await notification.save();
  } catch (err) {
    console.error('Error marking reminder notified:', err);
  }
};
