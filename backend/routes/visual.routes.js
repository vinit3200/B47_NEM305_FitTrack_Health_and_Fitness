let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');
let vc = require('../controllers/visual.controller');
router.get('/calories', auth, vc.calories);
router.get('/progress', auth, vc.weeklyProgress);
module.exports = router;
