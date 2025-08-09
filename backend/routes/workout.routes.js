let express = require('express');
let router = express.Router();
let { addWorkout, getWorkouts } = require('../controllers/workout.controller');
let authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, addWorkout);
router.get('/', authMiddleware, getWorkouts);

module.exports = router;
