const HealthCalc = require('../models/healthCalc.model.js');

// save a new calculation record
exports.saveCalculation = async (req, res) => {
  try {
    const { input, result } = req.body;
    if (!input || !result) {
      return res.status(400).json({ error: 'Input and result data required' });
    }


    const record = new HealthCalc({
      userId: req.userId || null,
      input,
      result
    });

    await record.save();
    res.json({ success: true, data: record });
  } catch (err) {
    console.error('Error saving calculation:', err);
    res.status(500).json({ error: 'Failed to save calculation' });
  }
};

// retrieve recent calculations (optionally user-specific)
exports.getCalculations = async (req, res) => {
  try {
    const query = {};
    if (req.userId) {
      query.userId = req.userId;
    }

    const history = await HealthCalc.find(query).sort({ createdAt: -1 }).limit(20);
    res.json(history);
  } catch (err) {
    console.error('Error fetching calculations:', err);
    res.status(500).json({ error: 'Failed to fetch calculations' });
  }
};

// retrieve all stored calculations (no user filter)
exports.getAllCalculations = async (req, res) => {
  try {
    const all = await HealthCalc.find({}).sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    console.error('Error fetching all calculations:', err);
    res.status(500).json({ error: 'Failed to fetch all calculations' });
  }
};
