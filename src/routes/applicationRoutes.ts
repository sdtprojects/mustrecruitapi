import express from "express";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationByRefAndNIN,
} from "../controllers/applicationController";

const router = express.Router();

// Create a new application
router.post("/", createApplication);

// Get all applications
router.get("/", getAllApplications);

// Get a single application by ID
router.get("/:id", getApplicationById);
router.get("/findbyrefandnin/:job_ref/:nin_number", getApplicationByRefAndNIN);

// Update an application
router.put("/:id", updateApplication);

// Delete an application
router.delete("/:id", deleteApplication);

export default router;
