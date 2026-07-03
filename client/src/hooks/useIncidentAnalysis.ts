import { useQuery } from "@tanstack/react-query";

import { analyzeIncident } from "../api/incident.api";

export const useIncidentAnalysis = (id?: string) => {
  return useQuery({
    queryKey: ["incident-analysis", id],
    queryFn: () => analyzeIncident(id!),
    enabled: false,
    retry: false,
  });
};
