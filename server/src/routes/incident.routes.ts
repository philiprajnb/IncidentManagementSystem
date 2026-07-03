import { Router } from "express";
import incidentController from "../controllers/incident.controller";

const router = Router();

// POST /api/incidents
router.post("/", incidentController.createIncident);

// GET /api/incidents
router.get("/", incidentController.getAllIncidents);

// GET /api/incidents/:id/analysis
router.get("/:id/analysis", incidentController.analyzeIncident);

// PATCH /api/incidents/:id/status
router.patch("/:id/status", incidentController.updateIncidentStatus);

// GET /api/incidents/:id
router.get("/:id", incidentController.getIncidentById);

export default router;
