import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateIncidentStatus } from "../api/incident.api";
import type { IncidentStatus } from "../types/incident";

interface UpdateIncidentStatusVariables {
  id: string;
  status: IncidentStatus;
}

export const useUpdateIncidentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: UpdateIncidentStatusVariables) =>
      updateIncidentStatus(id, { status }),
    onSuccess: (incident) => {
      queryClient.setQueryData(
        ["incident", incident.id],
        incident
      );
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
    },
  });
};
