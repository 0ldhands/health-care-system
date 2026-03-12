const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    index: true
  },
  normalizedName: {
    type: String,
    required: true,
    unique: true
  },
  servingSize: {
    type: String,
    default: '100g'
  },
  // Macronutrients
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  fiber: Number,
  sugar: Number,
  // Micronutrients
  sodium: Number,
  potassium: Number,
  cholesterol: Number,
  // Metadata
  source: String,
  apiResponse: Object, // Store full API response
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Auto-delete after 1 hour (cache TTL)
  }
});

module.exports = mongoose.model('NutritionData', nutritionSchema);