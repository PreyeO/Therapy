import axios from "axios";
import { getAuthToken } from "@/services/api/authentication/auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = getAuthToken();
if (token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || "Unknown error occurred";
    throw new Error(message);
  } else {
    throw new Error("Unknown error occurred");
  }
};

export const getUnavailableSlots = async () => {
  try {
    console.log("Fetching unavaialable slots...");
    const response = await api.get(`/api/clinician-unavailable-slots/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAppointments = async () => {
  try {
    console.log("Fetching all appointments with details...");
    const response = await api.get(`/api/appointments?detail=true`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getFullAppointments = async () => {
  try {
    const queryParams = new URLSearchParams({
      detail: "true", // Only passing detail=true
    }).toString();

    const response = await api.get(`/api/appointments?${queryParams}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAppointmentRequests = async () => {
  try {
    const response = await api.get(
      `/api/appointments?detail=true&acceptance_status=null`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUpcomingAppointments = async () => {
  try {
    const response = await api.get(
      `/api/appointments?detail=true&status=null&acceptance_status=Accepted`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getWaitlistedAppointments = async () => {
  try {
    const response = await api.get(
      `/api/appointments?detail=true&acceptance_status=Waitlisted`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  data: {
    service?: string;
    start_time?: string;
    status?: string;
    acceptance_status?: string;
  }
) => {
  try {
    const payload: Record<string, string | undefined> = {};

    if (data.service) payload.service = data.service;
    if (data.start_time) payload.start_time = data.start_time;
    if (data.status) payload.status = data.status;
    if (data.acceptance_status)
      payload.acceptance_status = data.acceptance_status;

    const response = await api.patch(
      `/api/appointments/${appointmentId}/`,
      payload
    );

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getNameSearch = async (name: string) => {
  try {
    const response = await api.get(
      `/api/appointments/?detail=true&search=${name}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getDateSearch = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(
      `/api/appointments/?detail=true&start_time=${startDate},${endDate}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
