"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobListing_1 = require("../controllers/jobListing");
const router = express_1.default.Router();
// Create a new job listing
router.post("/", jobListing_1.createJobListing);
// Get all job listings
router.get("/", jobListing_1.getAllJobListings);
// Get a single job listing by ID
router.get("/listing/:id", jobListing_1.getJobListingById);
router.get("/listingbyref/:ref", jobListing_1.getJobListingByRef);
// Update a job listing
router.put("/:id", jobListing_1.updateJobListing);
// Delete a job listing
router.delete("/:id", jobListing_1.deleteJobListing);
exports.default = router;
//# sourceMappingURL=jobListingRoutes.js.map