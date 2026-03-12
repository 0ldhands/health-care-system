/**
 * Normalize food name for caching (used in Nutrition module)
 * Converts to lowercase, removes special characters and trims spaces
 */
const normalizeFoodName = (name) => {
  return name.toLowerCase().replace(/[^\w\s]/g, '').trim();
};

/**
 * Calculate BMI
 * @param {number} weightKg - weight in kilograms
 * @param {number} heightCm - height in centimeters
 * @returns {number} BMI rounded to 2 decimals
 */

const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 100) / 100;
};

/**
 * Format Date to YYYY-MM-DD
 * @param {Date} dateObj 
 * @returns {string} formatted date
 */
const formatDate = (dateObj) => {
  const yyyy = dateObj.getFullYear();
  let mm = dateObj.getMonth() + 1; // Months start at 0
  let dd = dateObj.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return `${yyyy}-${mm}-${dd}`;
};

module.exports = {
  normalizeFoodName,
  calculateBMI,
  formatDate
};