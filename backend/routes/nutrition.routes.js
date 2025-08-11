let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');
let nc = require('../controllers/nutrition.controller');
router.post('/', auth, nc.addNutrition);
router.get('/', auth, nc.getNutrition);
module.exports = router;
