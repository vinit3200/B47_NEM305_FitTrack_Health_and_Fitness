let axios = require('axios');

exports.searchFood = async (req, res) => {
  let query = req.query.query;
  if (!query) return res.status(400).json({ msg: 'Query is required' });

  try {
    let url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}`;
    
    let response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch food data', error: error.message });
  }
};
