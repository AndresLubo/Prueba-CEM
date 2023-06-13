const { Router } = require("express");
const passport = require("passport");

const { UserService } = require("./user.service");
const service = new UserService();

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(parseInt(id));
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      const response = await service.create(data);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const response = await service.update(parseInt(id), changes);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.delete(parseInt(id));
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
