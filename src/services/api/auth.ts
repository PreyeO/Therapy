// services/api/auth.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Initializing api headers
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/", userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/api/users/login/", loginData);
    const userData = response.data;
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthToken(userData.token); // Set the token after login
    return userData;
  } catch (error) {
    handleError(error);
  }
};

// Get user data from local storage
export const getUserData = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    console.log("Retrieved user data:", JSON.parse(userData)); // Log retrieved user data
    return JSON.parse(userData);
  }
  console.log("No user data found in local storage");
  return null;
};

// Get auth token from local storage
export const getAuthToken = () => {
  const userData = getUserData();
  if (userData) {
    return userData.token;
  }
  return null;
};

// Handle logout
export const logoutUser = () => {
  localStorage.removeItem("user");
  delete api.defaults.headers.common["Authorization"];
};

// Handle API errors
const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.detail || "Unknown error occurred";
    throw new Error(message);
  } else {
    throw new Error("Unknown error occurred");
  }
};
