const cron = require('node-cron');
const Reminder = require('../models/reminder.model.js');
const reminderController = require('../controllers/reminder.controller.js');

// every minute check for due reminders
function startScheduler() {
  cron.schedule('* * * * *', async () => {
    const now = new Date();

    try {
      // find all unnotified reminders and filter in JS
      const list = await Reminder.find({ notified: false });
      const due = list.filter(r => {
        if (!r.date || !r.time) return false;
        const dt = new Date(`${r.date}T${r.time}:00`);
        return dt <= now;
      });

      due.forEach(reminder => {
        reminderController.markNotified(reminder);
      });
    } catch (err) {
      console.error('Scheduler error:', err);
    }
  });
}

module.exports = { startScheduler };
