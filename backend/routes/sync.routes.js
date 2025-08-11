let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');

router.get('/fitbit', auth, (req, res) => {
  let data = { steps: 8000, caloriesBurned: 450, workouts: [{type:'run', duration:30, calories:300}] };
  res.json({ message: 'Synced (mock)', data });
});
module.exports = router;
