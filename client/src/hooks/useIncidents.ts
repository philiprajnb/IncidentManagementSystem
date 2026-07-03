import { useQuery } from "@tanstack/react-query";
import { getIncidents } from "../api/incident.api";

export const useIncidents = () => {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: getIncidents,
  });
};