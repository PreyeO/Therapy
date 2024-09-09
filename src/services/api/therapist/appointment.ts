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
    console.log("Fetching all appointments...");
    const response = await api.get(`/api/appointments`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
