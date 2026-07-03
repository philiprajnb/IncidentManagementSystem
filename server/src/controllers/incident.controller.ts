import { Request, Response } from "express";
import incidentService from "../services/incident.service";
import { createIncidentSchema } from "../validators/incident.validator";
import { ZodError } from "zod";

export class IncidentController {
  /**
   * Create a new incident
   */
  async createIncident(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validatedData = createIncidentSchema.parse(req.body);

      // Create incident
      const incident = await incidentService.createIncident(validatedData);

      // Return success response
      res.status(201).json({
        success: true,
        message: "Incident created successfully",
        data: incident,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues,
        });
        return;
      }

      console.error(error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

export default new IncidentController();