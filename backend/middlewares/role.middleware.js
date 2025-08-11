module.exports = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
  if (req.user.role !== role) return res.status(403).json({ msg: 'Forbidden' });
  next();
};
