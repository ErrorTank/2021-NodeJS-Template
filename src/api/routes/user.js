import { Router } from "express";
import Logger from "../../loaders/logger";
import middlewares from "../../api/middlewares"
const app = Router();

export default () => {
  app.get("/authorize", middlewares.auth, async (req, res, next) => {
    return res.json({ user: req.user }).status(200);
  });


  return app;
};
