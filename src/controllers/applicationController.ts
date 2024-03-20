import { Request, Response } from "express";
import Application from "../models/Application";

// CREATE - Create a new application
export const createApplication = async (req: Request, res: Response) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// READ - Get all applications
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Get a single application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json("Application not found!");
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update an application
export const updateApplication = async (req: Request, res: Response) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json("Application not found!");
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Delete an application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplication) {
      return res.status(404).json("Application not found!");
    }
    res.status(200).json(deletedApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
