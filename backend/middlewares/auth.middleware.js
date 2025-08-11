let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });
  let token = authHeader.split(' ')[1];
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
