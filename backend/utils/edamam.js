let axios = require('axios');
require('dotenv').config();

async function searchFood(query) {
  let url = `https://api.edamam.com/api/food-database/v2/parser`;
  let res = await axios.get(url, {
    params: {
      app_id: process.env.EDAMAM_APP_ID,
      app_key: process.env.EDAMAM_APP_KEY,
      ingr: query
    }
  });
  return res.data;
}

module.exports = { searchFood };
