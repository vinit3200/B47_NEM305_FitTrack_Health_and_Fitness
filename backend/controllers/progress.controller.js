let Workout = require('../models/Workout.model');
let Nutrition = require('../models/Nutrition.model');

exports.getProgress = async (req, res) => {
  try {
    let userId = require('mongoose').Types.ObjectId(req.user.id);

    let workoutAgg = await Workout.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalBurned: { $sum: '$calories' }, totalDuration: { $sum: '$duration' } } }
    ]);

    let nutritionAgg = await Nutrition.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalConsumed: { $sum: '$calories' }, totalProtein: { $sum: '$protein' }, totalCarbs: { $sum: '$carbs' }, totalFat: { $sum: '$fat' } } }
    ]);

    res.json({
      caloriesBurned: workoutAgg[0]?.totalBurned || 0,
      workoutDuration: workoutAgg[0]?.totalDuration || 0,
      caloriesConsumed: nutritionAgg[0]?.totalConsumed || 0,
      macros: {
        protein: nutritionAgg[0]?.totalProtein || 0,
        carbs: nutritionAgg[0]?.totalCarbs || 0,
        fat: nutritionAgg[0]?.totalFat || 0
      }
    });
  } catch (err) { res.status(500).json({ msg: err.message }); }
};
