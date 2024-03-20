"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplication = exports.updateApplication = exports.getApplicationById = exports.getAllApplications = exports.createApplication = void 0;
const Application_1 = __importDefault(require("../models/Application"));
// CREATE - Create a new application
const createApplication = async (req, res) => {
    try {
        const newApplication = new Application_1.default(req.body);
        await newApplication.save();
        res.status(201).json(newApplication);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
exports.createApplication = createApplication;
// READ - Get all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application_1.default.find();
        res.status(200).json(applications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllApplications = getAllApplications;
// READ - Get a single application by ID
const getApplicationById = async (req, res) => {
    try {
        const application = await Application_1.default.findById(req.params.id);
        if (!application) {
            return res.status(404).json("Application not found!");
        }
        res.status(200).json(application);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getApplicationById = getApplicationById;
// UPDATE - Update an application
const updateApplication = async (req, res) => {
    try {
        const updatedApplication = await Application_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedApplication) {
            return res.status(404).json("Application not found!");
        }
        res.status(200).json(updatedApplication);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateApplication = updateApplication;
// DELETE - Delete an application
const deleteApplication = async (req, res) => {
    try {
        const deletedApplication = await Application_1.default.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json("Application not found!");
        }
        res.status(200).json(deletedApplication);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteApplication = deleteApplication;
//# sourceMappingURL=applicationController.js.map