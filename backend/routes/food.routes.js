let express = require('express');
let router = express.Router();
let authMiddleware = require('../middlewares/auth.middleware');
let { searchFood } = require('../controllers/food.controller');

router.get('/search-food', authMiddleware, searchFood);

module.exports = router;
