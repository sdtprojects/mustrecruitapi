import express from "express";
import { loginController } from "../../controllers/auth/loginuser";

export const authRoute = (router: express.Router) => {
  router.post("/auth/login", loginController);
};
