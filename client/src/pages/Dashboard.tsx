import { useIncidents } from "../hooks/useIncidents";

const Dashboard = () => {
  const {
    data: incidents = [],
    isLoading,
    error,
  } = useIncidents();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load incidents.</p>;
  }

  return (
    <>
      <h2>Incident Dashboard</h2>

      <p>Total Incidents: {incidents.length}</p>

      <pre>{JSON.stringify(incidents, null, 2)}</pre>
    </>
  );
};

export default Dashboard;