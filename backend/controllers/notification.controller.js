const Notification = require('../models/notification.model.js');

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await Notification.find({ userId }).sort({ date: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await Notification.countDocuments({ userId, read: false });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const note = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deletNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notification.deleteOne({reminderId:id})
    if (!note) return res.status(404).json({ message: 'Notification not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};