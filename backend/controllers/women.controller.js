const Women = require('../models/women.model.js');

exports.addWomenRecord = async (req, res) => {
  try {
    const { name, age } = req.body;
    const userId = req.userId;

    if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }

    const newRecord = await Women.create({
      userId,
      name,
      age
    });

    res.status(201).json({
      success: true,
      message: 'Women record added successfully',
      data: newRecord
    });

  } catch (error) {
    console.error('Error adding women record:', error);
    res.status(500).json({ error: 'Failed to add women record' });
  }
};


exports.getWomenRecords = async (req, res) => {
  try {
    const userId = req.userId;

    const records = await Women.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: records
    });
  } catch (error) {
    console.error('Error fetching women records:', error);
    res.status(500).json({ error: 'Failed to fetch women records' });
  }
};