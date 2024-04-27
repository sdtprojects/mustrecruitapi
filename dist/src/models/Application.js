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
// Define schema for the AcademicDocument subdocument
const AcademicDocumentSchema = new mongoose_1.Schema({
    document_desc: { type: String, required: true },
    level_of_education: { type: String, required: true },
    document_file: { type: String, required: true },
    file_name: { type: String, required: true },
});
// Define schema for the Application document
const ApplicationSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    national_id_fontface: { type: String },
    national_id_backface: { type: String },
    nin_number: { type: String, required: true },
    post_title: { type: String, required: true },
    job_ref: { type: String, required: true },
    documents: { type: [AcademicDocumentSchema] },
}, { timestamps: true });
// Create and export the Application model
const Application = mongoose_1.default.model("Application", ApplicationSchema);
exports.default = Application;
//# sourceMappingURL=Application.js.map