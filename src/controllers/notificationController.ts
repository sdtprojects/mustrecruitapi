import { Request, Response } from "express";
import Notification from "../models/Notification";

// CREATE - Create a new notification
export const createNotification = async (req: Request, res: Response) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Get all notifications
export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ - Get a single notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json("Notification not found!");
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update a notification
export const updateNotification = async (req: Request, res: Response) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json("Notification not found!");
    }
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Delete a notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(
      req.params.id
    );
    if (!deletedNotification) {
      return res.status(404).json("Notification not found!");
    }
    res.status(200).json(deletedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
