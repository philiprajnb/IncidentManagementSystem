export enum IncidentSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum IncidentStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}



export interface CreateIncidentRequest {

title: string;

description: string;

severity: IncidentSeverity;

}

export interface UpdateIncidentStatusRequest {

  status: IncidentStatus;

}