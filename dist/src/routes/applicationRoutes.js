"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const router = express_1.default.Router();
// Create a new application
router.post("/", applicationController_1.createApplication);
// Get all applications
router.get("/", applicationController_1.getAllApplications);
// Get a single application by ID
router.get("/:id", applicationController_1.getApplicationById);
// Update an application
router.put("/:id", applicationController_1.updateApplication);
// Delete an application
router.delete("/:id", applicationController_1.deleteApplication);
exports.default = router;
//# sourceMappingURL=applicationRoutes.js.map