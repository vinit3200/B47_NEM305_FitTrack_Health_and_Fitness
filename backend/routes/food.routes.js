let router = require('express').Router();
let auth = require('../middlewares/auth.middleware');
let { searchFood } = require('../controllers/food.controller');
router.get('/search', auth, searchFood);
module.exports = router;
