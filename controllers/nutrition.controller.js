let Nutrition = require('../models/nutrition.model');

exports.addNutrition = async (req, res) => {
  let { food, calories, protein, carbs, fat } = req.body;
  try {
    let nutrition = new Nutrition({
      userId: req.user.id,
      food,
      calories,
      protein,
      carbs,
      fat
    });
    await nutrition.save();
    res.status(201).json({ msg: 'Nutrition log added', nutrition });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to log nutrition', error: err.message });
  }
};

exports.getNutrition = async (req, res) => {
  try {
    let nutritionLogs = await Nutrition.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(nutritionLogs);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch nutrition logs', error: err.message });
  }
};
