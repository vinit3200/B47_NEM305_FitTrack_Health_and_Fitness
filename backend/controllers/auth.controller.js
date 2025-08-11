let User = require('../models/User.model');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let { sendWelcomeEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
  try{
    let { username, email, password } = req.body;
    if(!email || !password) return res.status(400).json({ msg: 'email & password required' });
    let existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ msg: 'User exists' });
    let hashed = await bcrypt.hash(password, 10);
    let user = await User.create({ username, email, password: hashed });
    sendWelcomeEmail(email, username);
    res.status(201).json({ msg: 'Registered', userId: user._id });
  }catch(err){ res.status(500).json({ msg: err.message }); }
};

exports.login = async (req,res)=>{
  try{
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });
    let ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    let token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  }catch(err){ res.status(500).json({ msg: err.message }); }
};
