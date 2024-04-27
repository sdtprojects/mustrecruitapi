"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.updateNotification = exports.getUSerNotifications = exports.getNotificationById = exports.getAllNotifications = exports.createNotification = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// CREATE - Create a new notification
const createNotification = async (req, res) => {
    try {
        const newNotification = new Notification_1.default(req.body);
        await newNotification.save();
        res.status(201).json(newNotification);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createNotification = createNotification;
// READ - Get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.default.find();
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllNotifications = getAllNotifications;
// READ - Get a single notification by ID
const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification_1.default.findById(req.params.id);
        if (!notification) {
            return res.status(404).json("Notification not found!");
        }
        res.status(200).json(notification);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getNotificationById = getNotificationById;
// READ - Get users notifications by user ID
const getUSerNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.default.find({
            recipientId: req.params.userId,
        });
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUSerNotifications = getUSerNotifications;
// UPDATE - Update a notification
const updateNotification = async (req, res) => {
    try {
        const updatedNotification = await Notification_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNotification) {
            return res.status(404).json("Notification not found!");
        }
        res.status(200).json(updatedNotification);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateNotification = updateNotification;
// DELETE - Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const deletedNotification = await Notification_1.default.findByIdAndDelete(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json("Notification not found!");
        }
        res.status(200).json(deletedNotification);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationController.js.map