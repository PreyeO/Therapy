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

export const getAppointmentAddress = async () => {
  try {
    const response = await api.get("/api/appointment-addresses");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const setupclinicianBusinessPeriods = async (periods) => {
  try {
    const response = await api.post("/api/business-periods/", periods);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getclinicianBusinessPeriods = async () => {
  try {
    console.log("Fetching business periods...");
    const response = await api.get(`/api/business-periods/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// export const updateclinicianBusinessPeriods = async (periodDayId) => {
//   try {
//     const response = await api.patch(`/api/business-periods/${periodDayId}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };
