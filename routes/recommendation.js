let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  let userBMI = 22; 
  let recommendations = [];

  if (userBMI < 18.5) {
    recommendations.push("Increase calorie intake.");
  } else if (userBMI > 25) {
    recommendations.push("Include more cardio.");
  } else {
    recommendations.push("Maintain your current routine.");
  }

  res.json({ recommendations });
});

module.exports = router;
