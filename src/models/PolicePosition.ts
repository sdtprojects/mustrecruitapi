// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define interface for the PolicePosition document
interface IPolicePosition extends Document {
  position_name: string;
  position_abbrev: string;
}

// Define schema for the PolicePosition document
const PolicePositionSchema = new Schema<IPolicePosition>({
  position_name: { type: String, required: true },
  position_abbrev: { type: String, required: true },
});

// Create and export the PolicePosition model
const PolicePosition = mongoose.model<IPolicePosition>(
  "PolicePosition",
  PolicePositionSchema
);
export default PolicePosition;
