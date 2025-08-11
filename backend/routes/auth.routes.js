let router = require('express').Router();
let { register, login } = require('../controllers/auth.controller');
router.post('/register', register);
router.post('/login', login);
module.exports = router;
