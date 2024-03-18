import express from "express";
import {
  createESP,
  getAllESPs,
  getESPById,
  updateESPById,
  deleteESPById,
} from "../../controllers/users/espController";
import { verifyToken, verifyTokenAndAdmin } from "../../utils/jwtUtils";
export const espRoute = (router: express.Router) => {
  router.post("/esps", createESP);
  router.get("/esps", getAllESPs);
  router.get("/esps/:id", getESPById);
  router.put("/esps/:id", updateESPById);
  router.delete("/esps/:id", verifyTokenAndAdmin, deleteESPById);
};
