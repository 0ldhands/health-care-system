const mongoose = require('mongoose');

const healthCalcSchema = new mongoose.Schema({
  userId: String,

  // store both input and output so the frontend can display later
  input: {
    age: Number,
    gender: String,
    height: Number, // in cm
    weight: Number, // in kg
    activityLevel: String,

    // health checker fields
    sugar: Number,   // blood sugar mg/dL
    sysBP: Number,   // systolic
    diaBP: Number,   // diastolic
    temp: Number     // body temperature °C
  },

  result: mongoose.Schema.Types.Mixed, // flexible object

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('HealthCalc', healthCalcSchema);