import { Document, Schema, model } from "mongoose";

interface IJobListing extends Document {
  post: string;
  briefAboutUni: string;
  vacancies: number;
  salary_scale: string;
  deadline: string;
  ref: string;
  allowancesAndBenefits: string;
  reportingHierachy: string;
  jobObjective: string;
  jobDesc: string;
  personSpecifications: string;
  applicationProcedure: string;
}

const JobListingSchema = new Schema<IJobListing>(
  {
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
  },
  { timestamps: true }
);

const JobListing = model<IJobListing>("JobListing", JobListingSchema);

export { JobListing, IJobListing };
