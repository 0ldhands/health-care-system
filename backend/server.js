const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const nutritionRoutes = require('./routes/nutrition.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const womenRoutes = require('./routes/women.routes.js');
const reportsRoutes = require('./routes/reports.routes.js');
const healthCalcRoutes = require('./routes/healthCalc.routes.js');
// new reminder and notification routes
const reminderRoutes = require('./routes/reminder.routes.js');
const notificationRoutes = require('./routes/notification.routes.js');
const contactRoutes = require('./routes/contact.routes.js');

// scheduler utility
const { startScheduler } = require('./utils/scheduler.js');


const cookieParser = require('cookie-parser');
app.use(cookieParser()); 


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true                
}));
app.use(express.json());

// make files in the uploads folder accessible directly (e.g. when user copies link)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // start scheduler after DB is ready
    startScheduler();
  })
  .catch(err => console.error('MongoDB connection error:', err));
  

app.use('/api/nutrition', nutritionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/women', womenRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/calculator', healthCalcRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);

// catch‑all for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// central error handler (must be after all routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});