const Reports = require('../models/reports.model.js');
const multer = require('multer');
const path = require('path');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add a new report
exports.addReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, data, file } = req.body;

    const reportData = { userId, title, description ,file};

    if (data) {
      reportData.data = JSON.parse(data);
    }

    if (req.file) {
      reportData.file = req.file.filename;
    }

    const report = new Reports(reportData);
    await report.save();

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reports for logged-in user
exports.getReports = async (req, res) => {
    try {
        const userId = req.userId;
        const reports = await Reports.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Stream a report file to the browser after verifying ownership
exports.viewReports = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const report = await Reports.findOne({ _id: id, userId });
    
    if (!report || !report.file) {
      return res.status(404).json({ message: 'Report or file not found' });
    }

    const filePath = path.join(process.cwd(), 'uploads', report.file);
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const report = await Reports.findOneAndDelete({ _id: id, userId });
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        res.status(200).json({ success: true, message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};