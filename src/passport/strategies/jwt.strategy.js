const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../config/config.env');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};

const JwtStrategy = new Strategy(options, (payload, done) => done(null, payload));

module.exports = JwtStrategy;
