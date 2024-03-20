// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define interface for the PoliceStation document
interface IPoliceStation extends Document {
  station_name: string;
  station_district: string;
}

// Define schema for the PoliceStation document
const PoliceStationSchema = new Schema<IPoliceStation>({
  station_name: { type: String, required: true },
  station_district: { type: String, required: true },
});

// Create and export the PoliceStation model
const PoliceStation = mongoose.model<IPoliceStation>(
  "PoliceStation",
  PoliceStationSchema
);
export default PoliceStation;
