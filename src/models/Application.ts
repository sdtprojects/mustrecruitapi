// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define interface for the AcademicDocument subdocument
interface AcademicDocument {
  document_file: string;
  document_desc: string;
  level_of_education: string;
}

// Define interface for the Application document
interface IApplication extends Document {
  fullname: string;
  phone_number: string;
  nid_number: string;
  email: string;
  national_id_fontface: string;
  national_id_backface: string;
  documents: AcademicDocument[];
  progress: {
    step: String; // submitted - 25%, underreview - 50%, rejected/approved - 75% hired - 100%
    percent: number;
  };
}

// Define schema for the AcademicDocument subdocument
const AcademicDocumentSchema = new Schema<AcademicDocument>({
  document_desc: { type: String, required: true },
  level_of_education: { type: String, required: true },
  document_file: { type: String, required: true },
});

// Define schema for the Application document
const ApplicationSchema = new Schema<IApplication>({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  national_id_fontface: { type: String },
  national_id_backface: { type: String },
  nid_number: { type: String, required: true },
  documents: { type: [AcademicDocumentSchema] },
});

// Create and export the Application model
const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
export default Application;
