"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
// Create a new notification
router.post("/", notificationController_1.createNotification);
// Get all notifications
router.get("/", notificationController_1.getAllNotifications);
// Get a single notification by ID
router.get("/:id", notificationController_1.getNotificationById);
// Update a notification
router.put("/:id", notificationController_1.updateNotification);
// Delete a notification
router.delete("/:id", notificationController_1.deleteNotification);
exports.default = router;
//# sourceMappingURL=notificationRoute.js.map