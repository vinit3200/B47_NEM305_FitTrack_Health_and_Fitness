let express = require('express');
let VisualController = require('../controllers/visual.controller');
let router = express.Router();

router.get('/calories', VisualController.getCaloriesStats);
router.get('/progress', VisualController.getProgressStats);

module.exports = router;
