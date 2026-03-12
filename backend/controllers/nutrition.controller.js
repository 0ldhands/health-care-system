const NutritionData = require('../models/NutritionData.js');
const SearchHistory = require('../models/SearchHistory.js');

// Levenshtein distance function for spelling similarity
function levenshtein(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Normalize food name for caching
const normalizeName = (name) => {
  return name.toLowerCase().replace(/[^\w\s]/g, '').trim();
};

exports.searchNutrition = async (req, res) => {
  try {
    const { foodName } = req.body;

    if (!foodName) {
      return res.status(400).json({ error: 'Food name is required' });
    }

    const normalized = normalizeName(foodName);

    // 1. Try exact match first
    let cachedData = await NutritionData.findOne({ normalizedName: normalized });

    // 2. Build a safe fuzzy regex from individual words
    //    Each word becomes an independent pattern so "butter chicken" matches both words
    const words = normalized.split(/\s+/).filter((w) => w.length > 2); // ignore tiny words
    const escapedPatterns = [
      normalized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),  // escape full phrase
      ...words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),  // escape words
    ];

    // Add pattern for first word start and last word end
    if (words.length >= 2) {
      const first = words[0];
      const last = words[words.length - 1];
      if (first && last && first !== last) {
        const escapedFirst = first.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escapedLast = last.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        escapedPatterns.push(`^${escapedFirst}.*${escapedLast}$`);
      }
    }

    const fuzzyRegex = new RegExp(escapedPatterns.join('|'), 'i');

    // 3. Find related foods (exclude exact match by _id if found)
    const excludeId = cachedData ? cachedData._id : null;

    const relatedFoods = await NutritionData.find({
      normalizedName: { $regex: fuzzyRegex },
      ...(excludeId && { _id: { $ne: excludeId } }), // exclude exact match from related
    }).limit(5);

    // 4. Return response
    if (cachedData) {

      await SearchHistory.create({
        query: foodName,
        result: cachedData.foodName,
      });

      return res.json({
        data: cachedData,
        source: 'database',
        similar: relatedFoods.map(f => f.foodName),
      });
    }

    // 5. No exact match — return best match with similar
    if (relatedFoods.length > 0) {
    

      await SearchHistory.create({
        query: foodName,
        result: relatedFoods[0].foodName,
      });

      return res.json({
        data: relatedFoods[0],
        source: 'database',
        similar: relatedFoods.slice(1).map(f => f.foodName),
      });
    }

    // 6. No matches at all — try spelling similarity
    const allFoods = await NutritionData.find({});
    const distances = allFoods.map(food => ({
      food,
      distance: levenshtein(normalized, food.normalizedName)
    })).sort((a, b) => a.distance - b.distance);

    const closeFoods = distances.filter(d => d.distance <= 3 && d.distance > 0).slice(0, 5);

    if (closeFoods.length > 0) {
      

      await SearchHistory.create({
        query: foodName,
        result: closeFoods[0].food.foodName,
      });

      return res.json({
        data: closeFoods[0].food,
        source: 'database',
        similar: closeFoods.slice(1).map(d => d.food.foodName),
      });
    }

    return res.status(404).json({ error: 'Food not found' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch nutrition data' });
  }
};

// Get search history
exports.getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};