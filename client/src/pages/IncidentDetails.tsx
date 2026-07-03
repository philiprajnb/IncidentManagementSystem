import { useParams } from "react-router-dom";

const IncidentDetails = () => {

  const { id } = useParams();

  return (
    <>
      <h2>Incident Details</h2>

      <p>Incident ID: {id}</p>
    </>
  );
};

export default IncidentDetails;