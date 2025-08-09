let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let User = require('../models/user.model');
let sendWelcomeEmail = require('../utils/mailer');

exports.register = async (req, res) => {
  let { username, email, password, role } = req.body;
  try {
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    let hashed = await bcrypt.hash(password, 10);
    let user = await User.create({ username, email, password: hashed, role });
    await sendWelcomeEmail(email, username);
    res.status(201).json({ msg: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    let token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};
