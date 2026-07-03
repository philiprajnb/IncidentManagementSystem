import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/common/NavigationBar";

const MainLayout = () => {
  return (
    <>
      <NavigationBar />

      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;