import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  getUSerNotifications,
} from "../controllers/notificationController";

const router = express.Router();

// Create a new notification
router.post("/", createNotification);

// Get all notifications
router.get("/", getAllNotifications);

// Get a users notifications
router.get("/user/:userId", getUSerNotifications);

// Get a single notification by ID
router.get("/:id", getNotificationById);

// Update a notification
router.put("/:id", updateNotification);

// Delete a notification
router.delete("/:id", deleteNotification);

export default router;
