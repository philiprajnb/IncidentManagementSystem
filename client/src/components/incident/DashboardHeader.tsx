import { Button, Row, Col } from "react-bootstrap";
interface Props {

  onCreate: () => void;

}
const DashboardHeader = ({

  onCreate,

}: Props) => {
  return (
    <Row className="align-items-center mb-4">
      <Col>
        <h2 className="mb-1">Incident Dashboard</h2>

        <p className="text-muted mb-0">
          Monitor and manage incidents.
        </p>
      </Col>

      <Col xs="auto">
        <Button variant="primary" onClick={onCreate} >
          + New Incident
        </Button>
      </Col>
    </Row>
  );
};

export default DashboardHeader;