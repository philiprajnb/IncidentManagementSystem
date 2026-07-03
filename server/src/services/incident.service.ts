import Incident, { IIncident } from "../models/incident";
import { CreateIncidentRequest, IncidentStatus } from "../types/incident";

export class IncidentService {
  /**
   * Creates a new incident
   */
  async createIncident(
    incidentData: CreateIncidentRequest
  ): Promise<IIncident> {
    const incident = await Incident.create({
      ...incidentData,
      status: IncidentStatus.OPEN,
    });

    return incident.toObject();
  }
}

export default new IncidentService();