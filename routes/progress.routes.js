let express = require('express');
let router = express.Router();
let authMiddleware = require('../middlewares/auth.middleware');
let { getUserProgress } = require('../controllers/progress.controller');

router.get('/', authMiddleware, getUserProgress);

module.exports = router;
