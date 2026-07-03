import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import DashboardHeader from "../components/incident/DashboardHeader";
import IncidentTable from "../components/incident/IncidentTable";
import CreateIncidentModal from "../components/incident/CreateIncidentModal";

import { useIncidents } from "../hooks/useIncidents";
import {
  IncidentSeverity,
  IncidentStatus,
} from "../types/incident";
import type {
  IncidentFilters,
  IncidentSeverity as IncidentSeverityType,
  IncidentStatus as IncidentStatusType,
} from "../types/incident";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] =
    useState<IncidentFilters>({});

  const {
    data: incidents = [],
    isLoading,
    error,
  } = useIncidents(filters);

  const updateSeverityFilter = (
    severity: string
  ) => {
    setFilters((current) => ({
      ...current,
      severity: severity
        ? (severity as IncidentSeverityType)
        : undefined,
    }));
  };

  const updateStatusFilter = (status: string) => {
    setFilters((current) => ({
      ...current,
      status: status
        ? (status as IncidentStatusType)
        : undefined,
    }));
  };

  const hasFilters =
    Boolean(filters.severity) ||
    Boolean(filters.status);


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load incidents.</p>;
  }

  return (
    <>
      <DashboardHeader onCreate={() => setShowModal(true)} />

      <Row className="g-3 align-items-end mb-3 text-start">
        <Col md={4}>
          <Form.Group controlId="severity-filter">
            <Form.Label>Severity</Form.Label>
            <Form.Select
              value={filters.severity ?? ""}
              onChange={(event) =>
                updateSeverityFilter(event.target.value)
              }
            >
              <option value="">All severities</option>
              {Object.values(IncidentSeverity).map(
                (severity) => (
                  <option
                    key={severity}
                    value={severity}
                  >
                    {severity}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group controlId="status-filter">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={filters.status ?? ""}
              onChange={(event) =>
                updateStatusFilter(event.target.value)
              }
            >
              <option value="">All statuses</option>
              {Object.values(IncidentStatus).map(
                (status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md="auto">
          <Button
            variant="outline-secondary"
            onClick={() => setFilters({})}
            disabled={!hasFilters}
          >
            Clear filters
          </Button>
        </Col>
      </Row>

      <IncidentTable
        incidents={incidents}
      />
      <CreateIncidentModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default Dashboard;
