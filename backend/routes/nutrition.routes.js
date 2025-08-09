let express = require('express');
let router = express.Router();
let { addNutrition, getNutrition } = require('../controllers/nutrition.controller');
let authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, addNutrition);
router.get('/', authMiddleware, getNutrition);

module.exports = router;
