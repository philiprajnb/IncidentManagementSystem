import Badge from "react-bootstrap/Badge";

import {
  IncidentStatus,
} from "../../types/incident";

interface Props {
  status: IncidentStatus;
}

const StatusBadge = ({
  status,
}: Props) => {

  const variant = {
    OPEN: "danger",
    IN_PROGRESS: "warning",
    RESOLVED: "success",
  }[status];

  return (
    <Badge bg={variant}>
      {status.replace("_", " ")}
    </Badge>
  );
};

export default StatusBadge;