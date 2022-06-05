const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION_MS } = require('../../config/keys');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

  return token;
};

exports.signin = async (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    name: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  // const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  const token = jwt.sign(payload, JWT_SECRET);
  try {
    res.status(201).json(token);
  } catch (err) {
    res.status(500).json('Server Error');
  }
};

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    // res.status(201).json(newUser);
    res.status(201).json(token);
  } catch (err) {
    next(err);
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
