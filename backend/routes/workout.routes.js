let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');
let wc = require('../controllers/workout.controller');
router.post('/', auth, wc.addWorkout);
router.get('/', auth, wc.getWorkouts);
module.exports = router;
