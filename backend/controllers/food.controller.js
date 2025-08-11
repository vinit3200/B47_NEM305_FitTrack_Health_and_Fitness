let { searchFood: eda } = require('../utils/edamam');

exports.searchFood = async (req, res) => {
  let q = req.query.q;
  if(!q) return res.status(400).json({ msg: 'q query required' });
  try {
    let data = await eda(q);
    res.json(data);
  } catch (err) { res.status(500).json({ msg: err.message }); }
};
