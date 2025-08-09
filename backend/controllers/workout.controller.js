let Workout = require('../models/workout.model');

exports.addWorkout = async (req, res) => {
  let { type, duration, calories } = req.body;
  try {
    let workout = new Workout({
      userId: req.user.id,
      type,
      duration,
      calories
    });
    await workout.save();
    res.status(201).json({ msg: 'Workout logged successfully', workout });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to log workout', error: err.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    let workouts = await Workout.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch workouts', error: err.message });
  }
};
