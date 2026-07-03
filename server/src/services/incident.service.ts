import Incident, { IIncident } from "../models/incident";
import { CreateIncidentRequest, IncidentStatus } from "../types/incident";
import { IncidentResponseDto, toIncidentDto } from "../dto/incident.dto";

export class IncidentService {
  /**
   * Creates a new incident
   */
  async createIncident(
    incidentData: CreateIncidentRequest
  ): Promise<IncidentResponseDto> {
    const incident = await Incident.create({
      ...incidentData,
      status: IncidentStatus.OPEN,
    });

    return toIncidentDto(incident);
  }
  /**
   * Get all incidents
   */
  async getAllIncidents(): Promise<IncidentResponseDto[]> {
  const incidents = await Incident.find().sort({ createdAt: -1 });

  return incidents.map(toIncidentDto);
}
}

export default new IncidentService();