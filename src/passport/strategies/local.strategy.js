const { Strategy } = require('passport-local');
const { AuthService } = require('../../modules/auth/auth.service');

const service = new AuthService();

const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await service.getUser(username, password);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});


module.exports = LocalStrategy;
