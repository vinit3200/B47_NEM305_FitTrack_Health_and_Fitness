let Workout = require('../models/Workout.model');
let Nutrition = require('../models/Nutrition.model');
let mongoose = require('mongoose');

exports.calories = async (req,res)=>{
  try{
    let userId = mongoose.Types.ObjectId(req.user.id);
    let burned = await Workout.aggregate([{ $match:{ userId } }, { $group:{ _id:null, total:{$sum:'$calories'} } }]);
    let consumed = await Nutrition.aggregate([{ $match:{ userId } }, { $group:{ _id:null, total:{$sum:'$calories'} } }]);
    res.json({ burned: burned[0]?.total||0, consumed: consumed[0]?.total||0 });
  } catch(err){ res.status(500).json({ msg: err.message }); }
};

exports.weeklyProgress = async (req,res)=>{
  try{
    let userId = require('mongoose').Types.ObjectId(req.user.id);
    let weekly = await Workout.aggregate([
      { $match: { userId } },
      { $group: {
          _id: { year: { $year: '$date' }, week: { $week: '$date' } },
          totalBurned: { $sum: '$calories' },
          totalDuration: { $sum: '$duration' }
      }},
      { $sort: { '_id.year': -1, '_id.week': -1 } },
      { $limit: 12 }
    ]);
    res.json(weekly);
  }catch(err){ res.status(500).json({ msg: err.message }); }
};
