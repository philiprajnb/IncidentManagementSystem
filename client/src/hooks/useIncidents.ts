import { useQuery } from "@tanstack/react-query";

import { getIncidents } from "../api/incident.api";
import type { IncidentFilters } from "../types/incident";

export const useIncidents = (filters: IncidentFilters = {}) => {
  return useQuery({
    queryKey: ["incidents", filters],
    queryFn: () => getIncidents(filters),
  });
};
