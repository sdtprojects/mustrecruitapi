// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define interface for the AcademicDocument subdocument
interface AcademicDocument {
  qualification: string;
  institution: string;
  grade: string;
  year: string;
  document_file: string;
}

// Define interface for the Application document
interface IApplication extends Document {
  fullname: string;
  phone_number: string;
  national_id_fontface: string;
  national_id_backface: string;
  username: string;
  nin_number: string;
  academic_documents: AcademicDocument[];
}

// Define schema for the AcademicDocument subdocument
const AcademicDocumentSchema = new Schema<AcademicDocument>({
  qualification: { type: String, required: true },
  institution: { type: String, required: true },
  grade: { type: String, required: true },
  year: { type: String, required: true },
  document_file: { type: String, required: true },
});

// Define schema for the Application document
const ApplicationSchema = new Schema<IApplication>({
  fullname: { type: String, required: true },
  phone_number: { type: String, required: true },
  national_id_fontface: { type: String },
  national_id_backface: { type: String },
  username: { type: String, required: true },
  nin_number: { type: String, required: true },
  academic_documents: { type: [AcademicDocumentSchema] },
});

// Create and export the Application model
const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
export default Application;
