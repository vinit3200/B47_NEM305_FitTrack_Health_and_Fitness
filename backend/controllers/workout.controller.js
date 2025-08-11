let Workout = require('../models/Workout.model');

exports.addWorkout = async (req, res) => {
  try {
    let { type, duration, calories, date } = req.body;
    if(!type || duration == null || calories == null) return res.status(400).json({ msg: 'Missing fields' });
    let w = await Workout.create({ userId: req.user.id, type, duration, calories, date });
    res.status(201).json(w);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getWorkouts = async (req, res) => {
  try {
    let items = await Workout.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};
