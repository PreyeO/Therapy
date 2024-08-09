import axios from "axios";
import { getAuthToken } from "@/services/api/auth";

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

export const setupTherapistProfile = async (profileId, profileData) => {
  try {
    console.log("API call to setupTherapistProfile with ID:", profileId);
    const response = await api.patch(
      `/api/therapist-profiles/${profileId}/`,
      profileData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTherapistProfile = async (profileId) => {
  try {
    const response = await api.get(`/api/therapist-profiles/${profileId}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const setupTherapistBusinessPeriods = async (periods) => {
  try {
    const response = await api.post(`/api/business-periods/`, periods);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTherapistBusinessPeriods = async () => {
  try {
    console.log("Fetching business periods...");
    const response = await api.get(`/api/business-periods/`);
    console.log("Fetched business periods:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching business periods:");
    handleError(error);
  }
};

export const getTherapistBusinessPeriodDetails = async (periodDayId) => {
  try {
    const response = await api.get(`/api/business-periods/${periodDayId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTherapistBusinessPeriods = async (periodDayId) => {
  try {
    const response = await api.patch(`/api/business-periods/${periodDayId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
