let express = require('express');
let router = express.Router();
let Goal = require('../models/Goal');
let auth = require('../middlewares/auth.middleware');

router.post('/', auth, async (req, res) => {
  try {
    let { goalType, targetValue } = req.body;
    let goal = new Goal({ userId: req.userId, goalType, targetValue });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    let goals = await Goal.find({ userId: req.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    let goal = await Goal.findOne({ _id: req.params.id, userId: req.userId });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    goal.currentValue = req.body.currentValue || goal.currentValue;
    if (goal.currentValue >= goal.targetValue) {
      goal.status = 'completed';
    }
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
