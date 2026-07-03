import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import type { Incident } from "../../types/incident";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

interface Props {
  incidents: Incident[];
}

const IncidentTable = ({
  incidents,
}: Props) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      className="text-start align-middle"
    >
      <thead>
        <tr>
          <th>Title</th>
          <th>Severity</th>
          <th>Status</th>
          <th>Created</th>
          <th className="text-center" style={{ width: "120px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {incidents.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="text-center text-muted py-4"
            >
              No incidents found.
            </td>
          </tr>
        )}

        {incidents.map((incident) => (
          <tr key={incident.id}>
            <td>{incident.title}</td>

            <td>
              <SeverityBadge
                severity={incident.severity}
              />
            </td>

            <td>
              <StatusBadge
                status={incident.status}
              />
            </td>

            <td>
              {new Date(
                incident.createdAt
              ).toLocaleDateString()}
            </td>

            <td>
              <Link
                to={`/incidents/${incident.id}`}
                className="text-decoration-none"
                >
                <Button
                    size="sm"
                    variant="outline-primary"
                >
                    View
                </Button>
                </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default IncidentTable;
