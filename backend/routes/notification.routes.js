const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller.js');
const auth = require('../middleware/auth.js');

router.get('/', auth, notificationController.getNotifications);
router.get('/unread-count', auth, notificationController.getUnreadCount);
router.put('/:id/read', auth, notificationController.markRead);
router.delete('/:id', auth, notificationController.deletNotification);

module.exports = router;