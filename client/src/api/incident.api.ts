import api from "./axios";

import type {
  CreateIncidentRequest,
  IncidentAnalysis,
  Incident,
  IncidentFilters,
  UpdateIncidentStatusRequest,
} from "../types/incident";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const getIncidents = async (
  filters: IncidentFilters = {}
): Promise<Incident[]> => {
  const response = await api.get<ApiResponse<Incident[]>>(
    "/incidents",
    {
      params: filters,
    }
  );

  return response.data.data;
};

export const getIncidentById = async (
  id: string
): Promise<Incident> => {
  const response = await api.get<ApiResponse<Incident>>(
    `/incidents/${id}`
  );

  return response.data.data;
};

export const createIncident = async (
  payload: CreateIncidentRequest
): Promise<Incident> => {
  const response = await api.post<ApiResponse<Incident>>(
    "/incidents",
    payload
  );

  return response.data.data;
};

export const updateIncidentStatus = async (
  id: string,
  payload: UpdateIncidentStatusRequest
): Promise<Incident> => {
  const response = await api.patch<ApiResponse<Incident>>(
    `/incidents/${id}/status`,
    payload
  );

  return response.data.data;
};

export const analyzeIncident = async (
  id: string
): Promise<IncidentAnalysis> => {
  const response = await api.get<
    ApiResponse<IncidentAnalysis>
  >(`/incidents/${id}/analysis`);

  return response.data.data;
};
