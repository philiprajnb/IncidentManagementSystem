import { z } from "zod";
import { IncidentSeverity, IncidentStatus } from "../types/incident";

export const createIncidentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  severity: z.enum(Object.values(IncidentSeverity)),
});

export const updateIncidentStatusSchema = z.object({
  status: z.enum(IncidentStatus),
});