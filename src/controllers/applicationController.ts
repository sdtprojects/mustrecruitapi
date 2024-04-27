import { Request, Response } from "express";
import Application from "../models/Application";
import { sendEmail } from "../helpers/emailSender";

// CREATE - Create a new application
export const createApplication = async (req: Request, res: Response) => {
  try {
    const newApplication = new Application(req.body);
    await newApplication.save();

    //  send email to appicant
    await sendEmail(
      req.body.email,
      "Application Confirmation",
      `
   <p>Hi ${req.body.fullname}</p>
   <p>We wanted to let you know that we have received your application for the post: ${req.body.post_title}</p>
   <p>We will get back to you soon when we find youre fit for the role</p>
   <p>Staff Recuit Team</p>
   `
    );
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

// get application by ref and nin number
// READ - Get a single application by ID
export const getApplicationByRefAndNIN = async (
  req: Request,
  res: Response
) => {
  try {
    const application = await Application.findOne({
      job_ref: req.params.job_ref,
      nin_number: req.params.nin_number,
    });
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

    //  send email to appicant
    await sendEmail(
      updatedApplication.email,
      "Application Update",
      `
   <p>Hi ${updatedApplication.fullname}</p>
   <p>We wanted to let you know that your application has been considered for the post: ${updatedApplication.post_title}</p>
   <p>Stay tuned for the next steps in our recruitment process</p>
   <p>Staff Recuit Team</p>
   `
    );

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
