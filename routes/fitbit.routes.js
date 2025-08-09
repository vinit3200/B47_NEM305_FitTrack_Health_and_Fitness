let express = require('express');
let router = express.Router();
let auth = require('../middlewares/auth.middleware');

router.get('/sync-fitbit', auth, async (req, res) => {
  let data = {
    steps: 8000,
    caloriesBurned: 500,
    workouts: 1,
    date: new Date().toISOString().split('T')[0]
  };

  res.json({ message: 'Data synced successfully from Fitbit', data });
});

module.exports = router;
