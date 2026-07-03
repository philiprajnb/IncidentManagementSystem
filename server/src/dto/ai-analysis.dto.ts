import { IncidentSeverity } from "../types/incident";

export interface AIAnalysisDto {
  summary: string;
  recommendedSeverity: IncidentSeverity;
  reason: string;
  possibleRootCauses: string[];
  confidence: number;
}