let Workout = require('../models/workout.model');
let Nutrition = require('../models/nutrition.model');

exports.getCaloriesStats = async (req, res) => {
  try {
    let userId = req.user.id;

    let caloriesOut = await Workout.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalBurned: { $sum: '$caloriesBurned' } } },
    ]);

    let caloriesIn = await Nutrition.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalConsumed: { $sum: '$calories' } } },
    ]);

    res.json({
      burned: caloriesOut[0]?.totalBurned || 0,
      consumed: caloriesIn[0]?.totalConsumed || 0,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch calorie stats' });
  }
};

exports.getProgressStats = async (req, res) => {
  try {
    let userId = req.user.id;

    let progress = await Workout.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            week: { $week: '$date' },
            year: { $year: '$date' },
          },
          totalBurned: { $sum: '$caloriesBurned' },
        },
      },
      { $sort: { '_id.year': -1, '_id.week': -1 } },
      { $limit: 4 }, 
    ]);

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch progress stats' });
  }
};

