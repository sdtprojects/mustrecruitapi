import express from "express";
import { authRoute } from "./auth/auth";
const router = express.Router();

export default (): express.Router => {
  // users
  // usersRoute(router);

  // AUTH
  authRoute(router);

  return router;
};
