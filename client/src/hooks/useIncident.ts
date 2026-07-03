import { useQuery } from "@tanstack/react-query";

import { getIncidentById } from "../api/incident.api";

export const useIncident = (id?: string) => {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => getIncidentById(id!),
    enabled: Boolean(id),
  });
};
