const express = require("express");

const {
  boomErrorHandler,
  errorHandler,
} = require("./middlewares/error.handler");
const { routerApi } = require("./router/router");

const createApp = () => {
  const app = express();
  app.use(express.json());

  require('./passport/index.passport');
  routerApi(app);

  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };
