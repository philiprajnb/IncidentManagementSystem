export const IncidentSeverity = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type IncidentSeverity =
  (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export const IncidentStatus = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
} as const;

export type IncidentStatus =
  (typeof IncidentStatus)[keyof typeof IncidentStatus];

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIncidentRequest {
  title: string;
  description: string;
  severity: IncidentSeverity;
}

export interface UpdateIncidentStatusRequest {
  status: IncidentStatus;
}

export interface IncidentFilters {
  severity?: IncidentSeverity;
  status?: IncidentStatus;
}

export interface IncidentAnalysis {
  summary: string;
  recommendedSeverity: IncidentSeverity;
  reason: string;
  possibleRootCauses: string[];
  confidence: number;
}
