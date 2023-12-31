const { Router } = require('express');
const passport = require('passport');

const { AuthService } = require('./auth.service');
const service = new AuthService();

const router = Router();

router.post('/login',
passport.authenticate('local', { session: false }),
(req, res, next) => {
  try {

    const user = req.user;
    res.json(service.signToken(user))
  } catch (error) {
    next(error);
  }
})


module.exports = router;
