let Nutrition = require('../models/Nutrition.model');
exports.addNutrition = async (req,res)=>{
  try{
    let { food, calories, protein=0, carbs=0, fat=0, date } = req.body;
    if(!food || calories==null) return res.status(400).json({ msg: 'Missing fields' });
    let item = await Nutrition.create({ userId: req.user.id, food, calories, protein, carbs, fat, date });
    res.status(201).json(item);
  }catch(err){ res.status(500).json({ msg: err.message }); }
};
exports.getNutrition = async (req,res)=>{
  try {
    let items = await Nutrition.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(items);
  } catch (err){ res.status(500).json({ msg: err.message }); }
};
