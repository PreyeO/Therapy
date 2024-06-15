import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
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
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/api/users/login/", loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.non_field_errors?.[0] || "Error logging in user";
      throw new Error(message);
    } else {
      throw new Error("Error logging in user");
    }
  }
};
