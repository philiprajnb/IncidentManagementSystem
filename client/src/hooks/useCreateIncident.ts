import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createIncident } from "../api/incident.api";

export const useCreateIncident = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createIncident,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });

    },

  });

};