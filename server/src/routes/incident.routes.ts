import { Router } from "express";
import incidentController from "../controllers/incident.controller";

const router = Router();

// POST /api/incidents
router.post("/", incidentController.createIncident);

export default router;