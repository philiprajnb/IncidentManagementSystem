import { Request, Response } from "express";
import incidentService from "../services/incident.service";
import aiAnalysisService from "../services/ai-analysis.service";
import { createIncidentSchema, getIncidentsQuerySchema, updateIncidentStatusSchema } from "../validators/incident.validator";
import { ZodError } from "zod";
interface GetIncidentParams {
    id: string;
}
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
/**
* Get all incidents
*/
    async getAllIncidents(
    req: Request,
    res: Response
    ): Promise<void> {
    try {
        const filters = getIncidentsQuerySchema.parse(req.query);

        const incidents =
        await incidentService.getAllIncidents(filters);

        res.status(200).json({
        success: true,
        data: incidents,
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

/**
 * Get incident by ID
 */

    async getIncidentById(
    req: Request<GetIncidentParams>,
    res: Response
    ): Promise<void> {

    try {

        const incident =
        await incidentService.getIncidentById(req.params.id);

        if (!incident) {
        res.status(404).json({
            success: false,
            message: "Incident not found",
        });
        return;
        }

        res.status(200).json({
        success: true,
        data: incident,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
        success: false,
        message: "Internal server error",
        });

    }
    }

/**
 * Update incident status
 */
    async updateIncidentStatus(
    req: Request<GetIncidentParams>,
    res: Response
    ): Promise<void> {
    try {
        const { status } = updateIncidentStatusSchema.parse(req.body);

        const incident =
        await incidentService.updateIncidentStatus(
            req.params.id,
            status
        );

        if (!incident) {
        res.status(404).json({
            success: false,
            message: "Incident not found",
        });
        return;
        }

        res.status(200).json({
        success: true,
        message: "Incident status updated successfully",
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

/**
 * Analyze an incident using AI
 */
    async analyzeIncident(
    req: Request<GetIncidentParams>,
    res: Response
    ): Promise<void> {

    try {

        const incident =
        await incidentService.findIncidentById(req.params.id);

        if (!incident) {

        res.status(404).json({
            success: false,
            message: "Incident not found",
        });

        return;
        }

        const analysis =
        await aiAnalysisService.analyzeIncident(incident);

        res.status(200).json({
        success: true,
        data: analysis,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
        success: false,
        message: "Failed to analyze incident",
        });

    }

    }
}

export default new IncidentController();