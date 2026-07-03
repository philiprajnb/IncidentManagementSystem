import mongoose, { Schema, Document } from "mongoose";
import { IncidentSeverity, IncidentStatus } from "../types/incident";

export interface IIncident extends Document {
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const incidentSchema = new Schema<IIncident>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    severity: {
      type: String,
      enum: Object.values(IncidentSeverity),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(IncidentStatus),
      default: IncidentStatus.OPEN,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IIncident>("Incident", incidentSchema);