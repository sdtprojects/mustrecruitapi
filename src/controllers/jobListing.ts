import { Request, Response } from "express";
import { JobListing } from "../models/JobListing";

// CREATE - Create a new job listing
export const createJobListing = async (req: Request, res: Response) => {
  try {
    const newJobListing = new JobListing(req.body);
    await newJobListing.save();
    res.status(201).json(newJobListing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// READ - Get all job listings
export const getAllJobListings = async (req: Request, res: Response) => {
  try {
    const jobListings = await JobListing.find();
    res.status(200).json(jobListings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Get a single job listing by ID
export const getJobListingById = async (req: Request, res: Response) => {
  console.log(req.params.id);
  try {
    const jobListing = await JobListing.findOne({ _id: req.params.id });

    if (!jobListing) {
      return res.status(404).json("Job listing not found!");
    }
    res.status(200).json(jobListing);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// READ - Get a single job listing by ref
export const getJobListingByRef = async (req: Request, res: Response) => {
  try {
    const jobListingByRef = await JobListing.findOne({ ref: req.params.ref });

    if (!jobListingByRef) {
      return res.status(404).json("Job listing not found!");
    }
    res.status(200).json(jobListingByRef);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update a job listing
export const updateJobListing = async (req: Request, res: Response) => {
  try {
    const updatedJobListing = await JobListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJobListing) {
      return res.status(404).json("Job listing not found!");
    }
    res.status(200).json(updatedJobListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Delete a job listing
export const deleteJobListing = async (req: Request, res: Response) => {
  try {
    const deletedJobListing = await JobListing.findByIdAndDelete(req.params.id);
    if (!deletedJobListing) {
      return res.status(404).json("Job listing not found!");
    }
    res.status(200).json(deletedJobListing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
