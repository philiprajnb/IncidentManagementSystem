import api from "./axios";
import type { Incident } from "../types/incident";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const getIncidents = async (): Promise<Incident[]> => {
  const response =
    await api.get<ApiResponse<Incident[]>>("/incidents");

  return response.data.data;
};

export const getIncidentById = async (
  id: string
): Promise<Incident> => {

  const response =
    await api.get<ApiResponse<Incident>>(`/incidents/${id}`);

  return response.data.data;
};