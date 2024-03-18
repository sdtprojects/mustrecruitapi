import express from "express";
import {
  createFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmerById,
  deleteFarmerById,
} from "../../controllers/users/farmerController";
import { verifyToken, verifyTokenAndAuthorization } from "../../utils/jwtUtils";

export const farmerRoute = (router: express.Router) => {
  router.post("/farmers", createFarmer);
  router.get("/farmers", getAllFarmers);
  router.get("/farmers/:id", getFarmerById);
  router.put("/farmers/:id", updateFarmerById);
  router.delete("/farmers/:id", verifyTokenAndAuthorization, deleteFarmerById);
};
