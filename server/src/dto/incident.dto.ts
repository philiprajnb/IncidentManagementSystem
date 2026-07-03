import { IIncident } from "../models/incident";

export interface IncidentResponseDto {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const toIncidentDto = (
  incident: IIncident
): IncidentResponseDto => ({
  id: incident._id.toString(),
  title: incident.title,
  description: incident.description,
  severity: incident.severity,
  status: incident.status,
  createdAt: incident.createdAt,
  updatedAt: incident.updatedAt,
});