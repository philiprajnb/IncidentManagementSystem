import Badge from "react-bootstrap/Badge";

import {
  IncidentSeverity,
} from "../../types/incident";

interface Props {
  severity: IncidentSeverity;
}

const SeverityBadge = ({
  severity,
}: Props) => {

  const variant = {
    LOW: "success",
    MEDIUM: "warning",
    HIGH: "danger",
    CRITICAL: "dark",
  }[severity];

  return (
    <Badge bg={variant}>
      {severity}
    </Badge>
  );
};

export default SeverityBadge;