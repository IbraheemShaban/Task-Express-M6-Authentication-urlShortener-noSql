const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt/lib/extract_jwt');
const { JWT_SECRET } = require('../config/keys');

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      username, // equivalent to { name : name }
    });
    if (user) {
      // TODO: compare password to authenticate user
      passwordsMatch = await bcrypt.compare(password, user.password);
    } else {
      passwordsMatch = false;
    }
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  }
);
