// Import necessary modules
import mongoose, { Schema, Document } from "mongoose";

// Define interface for the Notification document
interface INotification extends Document {
  recipientId: string;
  senderId: string;
  message: string;
}

// Define schema for the Notification document
const NotificationSchema = new Schema<INotification>({
  recipientId: { type: String, required: true },
  senderId: { type: String, required: true },
  message: { type: String, required: true },
});

// Create and export the Notification model
const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
export default Notification;
