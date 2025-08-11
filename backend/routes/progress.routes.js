let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');
let pc = require('../controllers/progress.controller');
router.get('/', auth, pc.getProgress);
module.exports = router;
