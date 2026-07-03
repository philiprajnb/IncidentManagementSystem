import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
        >
          Incident Management
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;