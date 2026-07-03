import Incident, { IIncident } from "../models/incident";
import { CreateIncidentRequest, IncidentStatus, IncidentFilter } from "../types/incident";
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
* Get all incidents with optional filters
*/
async getAllIncidents(
  filters: IncidentFilter
): Promise<IncidentResponseDto[]> {

  const query: Record<string, string> = {};

  if (filters.severity) {
    query.severity = filters.severity;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  const incidents = await Incident.find(query)
    .sort({ createdAt: -1 });

  return incidents.map(toIncidentDto);
}

/**
* Get incident by ID
*/
async getIncidentById(
  id: string
): Promise<IncidentResponseDto | null> {

  const incident = await Incident.findById(id);

  if (!incident) {
    return null;
  }

  return toIncidentDto(incident);
}

/**
 * Update an incident's status
 */
async updateIncidentStatus(
  id: string,
  status: IncidentStatus
): Promise<IncidentResponseDto | null> {

  const incident = await Incident.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!incident) {
    return null;
  }

  return toIncidentDto(incident);
}

/**

 * Returns the raw Mongoose document.

 * Used internally by other services like AI.

 */

async findIncidentById(

  id: string

): Promise<IIncident | null> {

  return Incident.findById(id);

}
}


export default new IncidentService();