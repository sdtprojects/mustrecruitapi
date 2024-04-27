"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobListing = void 0;
const mongoose_1 = require("mongoose");
const JobListingSchema = new mongoose_1.Schema({
    post: { type: String, required: true },
    briefAboutUni: { type: String, required: true },
    vacancies: { type: Number, required: true },
    salary_scale: { type: String, required: true },
    deadline: { type: String, required: true },
    ref: { type: String, required: true },
    allowancesAndBenefits: { type: String, required: true },
    reportingHierachy: { type: String, required: true },
    jobObjective: { type: String, required: true },
    jobDesc: { type: String, required: true },
    personSpecifications: { type: String, required: true },
    applicationProcedure: { type: String, required: true },
}, { timestamps: true });
const JobListing = (0, mongoose_1.model)("JobListing", JobListingSchema);
exports.JobListing = JobListing;
//# sourceMappingURL=JobListing.js.map