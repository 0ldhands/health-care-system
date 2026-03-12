const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.controller.js');
const auth = require('../middleware/auth.js');

router.post('/', auth, reminderController.createReminder);
router.get('/', auth, reminderController.getReminders);
router.put('/:id', auth, reminderController.updateReminder);
router.delete('/:id', auth, reminderController.deleteReminder);

module.exports = router;