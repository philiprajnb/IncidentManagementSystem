import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import IncidentDetails from "./pages/IncidentDetails";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/incidents/:id"
          element={<IncidentDetails />}
        />
      </Route>
    </Routes>
  );
}

export default App;