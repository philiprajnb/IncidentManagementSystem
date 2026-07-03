import { Router } from "express";
import incidentController from "../controllers/incident.controller";

const router = Router();

// POST /api/incidents
router.post("/", incidentController.createIncident);

// GET /api/incidents
router.get("/", incidentController.getAllIncidents);

export default router;