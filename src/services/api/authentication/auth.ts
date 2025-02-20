import { getErrorMessage } from "@/lib/utils";
import { resetAllStores } from "@/store/resetStores";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// initializing api headers
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
};

// api to send register users
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/", userData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.email?.[0] || "Unknown error occurred";
      throw new Error(message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// api to send otp sent to users email address
export const sendOTPToEmail = async (userId) => {
  try {
    const response = await api.get(
      `/api/users/${userId}/email-verification/request-otp/`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || "Error sending OTP";
      throw new Error(message);
    } else {
      throw new Error("Error sending OTP");
    }
  }
};

// api to verify otp sent to users
export const verifyEmailOTP = async (userId, otp) => {
  try {
    const response = await api.post(
      `/api/users/${userId}/email-verification/verify-otp/`,
      { otp }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || "Unknown error occurred";
      throw new Error(message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

// api to login users

// export const loginUser = async (loginData: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await api.post("/api/users/login/", loginData);
//     const userData = response.data;
//     localStorage.setItem("user", JSON.stringify(userData));
//     setAuthToken(userData.token); // Set the token after login
//     return userData;
//   } catch (error) {
//     handleError(error);
//   }
// };
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    // Clear any existing session or state
    logoutUser(); // Ensure any existing session is removed

    const response = await api.post("/api/users/login/", loginData);
    const userData = response.data;

    // Store the new user data
    localStorage.setItem("user", JSON.stringify(userData));
    setAuthToken(userData.token); // Set the token for the new user

    return userData;
  } catch (error) {
    handleError(error);
  }
};

// api to get user data from local storage
export const getUserData = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    console.log("Retrieved user data:", JSON.parse(userData)); // Log retrieved user data
    return JSON.parse(userData);
  }
  console.log("No user data found in local storage");
  return null;
};

export const getAuthToken = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return JSON.parse(userData).token;
  }
  return null;
};

// Set the token whenever making an authenticated request
const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

// api to get auth token from local storage

// export const getAuthToken = () => {
//   const userData = getUserData();
//   if (userData) {
//     return userData.token;
//   }
//   return null;
// };

export const logoutUser = () => {
  // Remove user data from localStorage
  localStorage.removeItem("user");

  // Remove the authorization header
  delete api.defaults.headers.common["Authorization"];

  // Call the centralized state reset function
  resetAllStores();
};

export const handleError = (error: unknown): void => {
  const message = getErrorMessage(error);
  throw new Error(message);
};
