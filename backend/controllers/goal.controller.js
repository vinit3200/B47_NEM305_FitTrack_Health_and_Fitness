let Goal = require('../models/Goal.model');

exports.createGoal = async (req,res)=>{
  try{
    let { goalType, targetValue } = req.body;
    if(!goalType || targetValue==null) return res.status(400).json({ msg:'Missing fields' });
    let g = await Goal.create({ userId: req.user.id, goalType, targetValue });
    res.status(201).json(g);
  }catch(err){ res.status(500).json({ msg: err.message }); }
};

exports.getGoals = async (req,res)=>{
  try{ let goals = await Goal.find({ userId: req.user.id }); res.json(goals); }
  catch(err){ res.status(500).json({ msg: err.message }); }
};

exports.updateGoal = async (req,res)=>{
  try{
    let { id } = req.params;
    let { currentValue } = req.body;
    let goal = await Goal.findOne({ _id:id, userId: req.user.id });
    if(!goal) return res.status(404).json({ msg:'Not found' });
    goal.currentValue = currentValue ?? goal.currentValue;
    if(goal.currentValue >= goal.targetValue) goal.status = 'completed';
    await goal.save();
    res.json(goal);
  }catch(err){ res.status(500).json({ msg: err.message }); }
};
