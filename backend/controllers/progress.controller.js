let Workout = require('../models/workout.model');
let Nutrition = require('../models/nutrition.model');

exports.getUserProgress = async (req, res) => {
  let userId = req.user.id;

  try {
    let workoutAgg = await Workout.aggregate([
      { $match: { userId: req.user._id } },
      { $group: {
          _id: null,
          totalCaloriesBurned: { $sum: '$calories' },
          totalDuration: { $sum: '$duration' }
        }
      }
    ]);

    let nutritionAgg = await Nutrition.aggregate([
      { $match: { userId: req.user._id } },
      { $group: {
          _id: null,
          totalCaloriesConsumed: { $sum: '$calories' },
          totalProtein: { $sum: '$protein' },
          totalCarbs: { $sum: '$carbs' },
          totalFat: { $sum: '$fat' }
        }
      }
    ]);

    res.status(200).json({
      caloriesBurned: workoutAgg[0]?.totalCaloriesBurned || 0,
      workoutDuration: workoutAgg[0]?.totalDuration || 0,
      caloriesConsumed: nutritionAgg[0]?.totalCaloriesConsumed || 0,
      macros: {
        protein: nutritionAgg[0]?.totalProtein || 0,
        carbs: nutritionAgg[0]?.totalCarbs || 0,
        fat: nutritionAgg[0]?.totalFat || 0
      }
    });

  } catch (error) {
    res.status(500).json({ msg: 'Failed to get progress', error: error.message });
  }
};
