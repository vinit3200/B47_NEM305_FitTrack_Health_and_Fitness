let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');
let gc = require('../controllers/goal.controller');

router.post('/', auth, gc.createGoal);
router.get('/', auth, gc.getGoals);
router.patch('/:id', auth, gc.updateGoal);

module.exports = router;
