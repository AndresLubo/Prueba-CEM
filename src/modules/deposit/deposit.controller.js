const { Router } = require("express");
const passport = require("passport");

const { DepositService } = require('./deposit.service');
const service = new DepositService();

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {

      const data = {
        ...req.body,
        timeStamp: new Date()
      };

      const response = await service.makeDeposit(data);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
