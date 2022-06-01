const User = require('../../models/User');
const bcrypt = require('bcrypt');

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('urls');
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};
