"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const mongoose_1 = __importStar(require("mongoose"));
// Define schema for the JobListing document
const JobListingSchema = new mongoose_1.Schema({
    ref: { type: String, required: true },
    post: { type: String, required: true },
    vacancies: { type: Number, required: true },
    salary_scale: { type: String, required: true },
    deadline: { type: String, required: true },
});
// Create and export the JobListing model
const JobListing = mongoose_1.default.model("JobListing", JobListingSchema);
exports.default = JobListing;
//# sourceMappingURL=JobListing.js.map