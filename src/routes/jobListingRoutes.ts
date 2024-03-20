import express from "express";
import {
  createJobListing,
  getAllJobListings,
  getJobListingById,
  updateJobListing,
  deleteJobListing,
  getJobListingByRef,
} from "../controllers/jobListing";

const router = express.Router();

// Create a new job listing
router.post("/", createJobListing);

// Get all job listings
router.get("/", getAllJobListings);

// Get a single job listing by ID
router.get("/listing/:id", getJobListingById);
router.get("/listingbyref/:ref", getJobListingByRef);

// Update a job listing
router.put("/:id", updateJobListing);

// Delete a job listing
router.delete("/:id", deleteJobListing);

export default router;
