// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define interface for the JobListing document
interface IJobListing extends Document {
  ref: string;
  post: string;
  vacancies: number;
  salary_scale: string;
  deadline: string;
}

// Define schema for the JobListing document
const JobListingSchema = new Schema<IJobListing>({
  ref: { type: String, required: true },
  post: { type: String, required: true },
  vacancies: { type: Number, required: true },
  salary_scale: { type: String, required: true },
  deadline: { type: String, required: true },
});

// Create and export the JobListing model
const JobListing = mongoose.model<IJobListing>("JobListing", JobListingSchema);
export default JobListing;
