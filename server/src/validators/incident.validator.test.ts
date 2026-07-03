import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ZodError } from "zod";

import {
  createIncidentSchema,
  getIncidentsQuerySchema,
  updateIncidentStatusSchema,
} from "./incident.validator";
import {
  IncidentSeverity,
  IncidentStatus,
} from "../types/incident";

describe("incident validators", () => {
  it("accepts a valid incident creation payload", () => {
    const payload = {
      title: "Database latency",
      description:
        "Primary database response times are above expected thresholds.",
      severity: IncidentSeverity.HIGH,
    };

    assert.deepEqual(
      createIncidentSchema.parse(payload),
      payload
    );
  });

  it("rejects invalid incident creation payloads", () => {
    assert.throws(
      () =>
        createIncidentSchema.parse({
          title: "Bad",
          description: "Too short",
          severity: "URGENT",
        }),
      ZodError
    );
  });

  it("accepts valid severity and status filters", () => {
    const filters = {
      severity: IncidentSeverity.CRITICAL,
      status: IncidentStatus.OPEN,
    };

    assert.deepEqual(
      getIncidentsQuerySchema.parse(filters),
      filters
    );
  });

  it("rejects unsupported filter values", () => {
    assert.throws(
      () =>
        getIncidentsQuerySchema.parse({
          severity: "SEV_1",
          status: "ACTIVE",
        }),
      ZodError
    );
  });

  it("accepts valid status updates", () => {
    const payload = {
      status: IncidentStatus.RESOLVED,
    };

    assert.deepEqual(
      updateIncidentStatusSchema.parse(payload),
      payload
    );
  });

  it("rejects invalid status updates", () => {
    assert.throws(
      () =>
        updateIncidentStatusSchema.parse({
          status: "CLOSED",
        }),
      ZodError
    );
  });
});
