const { Router } = require('express');

const AuthController = require('../modules/auth/auth.controller');
const UserController = require('../modules/user/user.controller');
const DepositController = require('../modules/deposit/deposit.controller');

const routerApi = (app) => {
  const router = Router();

  app.use('/api/cem/v1', router);
  router.use('/auth', AuthController);
  router.use('/users', UserController);
  router.use('/deposits', DepositController);

}


module.exports = { routerApi };
