"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobListing = exports.updateJobListing = exports.getJobListingByRef = exports.getJobListingById = exports.getAllJobListings = exports.createJobListing = void 0;
const JobListing_1 = require("../models/JobListing");
// CREATE - Create a new job listing
const createJobListing = async (req, res) => {
    try {
        const newJobListing = new JobListing_1.JobListing(req.body);
        await newJobListing.save();
        res.status(201).json(newJobListing);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.createJobListing = createJobListing;
// READ - Get all job listings
const getAllJobListings = async (req, res) => {
    try {
        const jobListings = await JobListing_1.JobListing.find();
        res.status(200).json(jobListings);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllJobListings = getAllJobListings;
// READ - Get a single job listing by ID
const getJobListingById = async (req, res) => {
    console.log(req.params.id);
    try {
        const jobListing = await JobListing_1.JobListing.findOne({ _id: req.params.id });
        if (!jobListing) {
            return res.status(404).json("Job listing not found!");
        }
        res.status(200).json(jobListing);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.getJobListingById = getJobListingById;
// READ - Get a single job listing by ref
const getJobListingByRef = async (req, res) => {
    try {
        const jobListingByRef = await JobListing_1.JobListing.findOne({ ref: req.params.ref });
        if (!jobListingByRef) {
            return res.status(404).json("Job listing not found!");
        }
        res.status(200).json(jobListingByRef);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.getJobListingByRef = getJobListingByRef;
// UPDATE - Update a job listing
const updateJobListing = async (req, res) => {
    try {
        const updatedJobListing = await JobListing_1.JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJobListing) {
            return res.status(404).json("Job listing not found!");
        }
        res.status(200).json(updatedJobListing);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateJobListing = updateJobListing;
// DELETE - Delete a job listing
const deleteJobListing = async (req, res) => {
    try {
        const deletedJobListing = await JobListing_1.JobListing.findByIdAndDelete(req.params.id);
        if (!deletedJobListing) {
            return res.status(404).json("Job listing not found!");
        }
        res.status(200).json(deletedJobListing);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteJobListing = deleteJobListing;
//# sourceMappingURL=jobListing.js.map