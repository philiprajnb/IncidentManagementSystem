import { useState } from "react";
import type { ComponentProps } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import SeverityBadge from "../components/incident/SeverityBadge";
import StatusBadge from "../components/incident/StatusBadge";
import { useIncident } from "../hooks/useIncident";
import { useIncidentAnalysis } from "../hooks/useIncidentAnalysis";
import { useUpdateIncidentStatus } from "../hooks/useUpdateIncidentStatus";
import { IncidentStatus } from "../types/incident";
import type {
  Incident,
  IncidentStatus as IncidentStatusType,
} from "../types/incident";

interface IncidentStatusFormProps {
  incident: Incident;
}

const IncidentStatusForm = ({
  incident,
}: IncidentStatusFormProps) => {
  const statusMutation = useUpdateIncidentStatus();
  const [status, setStatus] =
    useState<IncidentStatusType>(incident.status);

  const handleStatusSubmit: ComponentProps<
    "form"
  >["onSubmit"] = (event) => {
    event.preventDefault();

    void statusMutation.mutateAsync({
      id: incident.id,
      status,
    });
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleStatusSubmit}>
          <Row className="g-3 align-items-end">
            <Col md={6} lg={4}>
              <Form.Group controlId="incident-status">
                <Form.Label>
                  Update status
                </Form.Label>
                <Form.Select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target
                        .value as IncidentStatusType
                    )
                  }
                  disabled={
                    statusMutation.isPending
                  }
                >
                  {Object.values(IncidentStatus).map(
                    (value) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {value.replace("_", " ")}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md="auto">
              <Button
                type="submit"
                disabled={
                  statusMutation.isPending ||
                  status === incident.status
                }
              >
                {statusMutation.isPending
                  ? "Updating..."
                  : "Update status"}
              </Button>
            </Col>
          </Row>

          {statusMutation.isError && (
            <Alert
              variant="danger"
              className="mt-3 mb-0"
            >
              Failed to update incident status.
            </Alert>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

const IncidentDetails = () => {
  const { id } = useParams();
  const {
    data: incident,
    isLoading,
    error,
  } = useIncident(id);
  const analysisQuery = useIncidentAnalysis(id);

  if (isLoading) {
    return <p>Loading incident...</p>;
  }

  if (error || !incident) {
    return (
      <Alert variant="danger">
        Failed to load incident details.
      </Alert>
    );
  }

  return (
    <Stack gap={4} className="text-start">
      <div>
        <Link
          to="/"
          className="text-decoration-none"
        >
          <Button
            variant="outline-secondary"
            size="sm"
            className="mb-3"
          >
            Back
          </Button>
        </Link>

        <h2 className="mb-2">{incident.title}</h2>

        <Stack
          direction="horizontal"
          gap={2}
          className="flex-wrap"
        >
          <SeverityBadge severity={incident.severity} />
          <StatusBadge status={incident.status} />
        </Stack>
      </div>

      <Card>
        <Card.Body>
          <Row className="g-4">
            <Col lg={8}>
              <h3 className="h5">Description</h3>
              <p className="text-body">
                {incident.description}
              </p>
            </Col>

            <Col lg={4}>
              <Stack gap={3}>
                <div>
                  <div className="text-muted small">
                    Incident ID
                  </div>
                  <div>{incident.id}</div>
                </div>

                <div>
                  <div className="text-muted small">
                    Created
                  </div>
                  <div>
                    {new Date(
                      incident.createdAt
                    ).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-muted small">
                    Updated
                  </div>
                  <div>
                    {new Date(
                      incident.updatedAt
                    ).toLocaleString()}
                  </div>
                </div>
              </Stack>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <IncidentStatusForm
        key={incident.id}
        incident={incident}
      />

      <Card>
        <Card.Body>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
            <div>
              <h3 className="h5 mb-1">
                AI incident analysis
              </h3>
              <p className="text-muted">
                Generate responder guidance from the
                incident title, description, severity, and
                status.
              </p>
            </div>

            <div>
              <Button
                variant="outline-primary"
                onClick={() => analysisQuery.refetch()}
                disabled={analysisQuery.isFetching}
              >
                {analysisQuery.isFetching
                  ? "Analyzing..."
                  : analysisQuery.data
                    ? "Refresh analysis"
                    : "Analyze incident"}
              </Button>
            </div>
          </div>

          {analysisQuery.isError && (
            <Alert variant="danger" className="mb-0">
              Failed to generate AI analysis. Check the
              backend AI configuration and try again.
            </Alert>
          )}

          {!analysisQuery.data &&
            !analysisQuery.isError &&
            !analysisQuery.isFetching && (
              <Alert variant="secondary" className="mb-0">
                No AI analysis has been generated yet.
              </Alert>
            )}

          {analysisQuery.data && (
            <Stack gap={3}>
              <div>
                <div className="text-muted small">
                  Executive summary
                </div>
                <p className="text-body">
                  {analysisQuery.data.summary}
                </p>
              </div>

              <Row className="g-3">
                <Col md={6}>
                  <div className="text-muted small">
                    Recommended severity
                  </div>
                  <SeverityBadge
                    severity={
                      analysisQuery.data
                        .recommendedSeverity
                    }
                  />
                </Col>

                <Col md={6}>
                  <div className="text-muted small">
                    Confidence
                  </div>
                  <div>
                    {analysisQuery.data.confidence}%
                  </div>
                </Col>
              </Row>

              <div>
                <div className="text-muted small">
                  Reason
                </div>
                <p className="text-body">
                  {analysisQuery.data.reason}
                </p>
              </div>

              <div>
                <div className="text-muted small mb-1">
                  Possible root causes
                </div>
                <ul className="mb-0">
                  {analysisQuery.data.possibleRootCauses.map(
                    (rootCause) => (
                      <li key={rootCause}>{rootCause}</li>
                    )
                  )}
                </ul>
              </div>
            </Stack>
          )}
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default IncidentDetails;
