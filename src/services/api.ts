import axios from "axios";

const BASE_URL = "https://rr-therapy-development.up.railway.app";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/", userData);
    return response;
  } catch (error) {
    throw new Error("Unknown error occurred");
  }
};

// In the verifyEmailOTP function
export const verifyEmailOTP = async (userId, otp) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log the token
    if (!token) {
      throw new Error("Token not found");
    }
    console.log("Request headers:", { Authorization: `Bearer ${token}` }); // Log the request headers
    const response = await api.post(
      `/api/users/${userId}/email-verification/verify-otp/`,
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error verifying OTP");
  }
};

export const sendOTPToEmail = async (userId) => {
  try {
    const response = await api.get(
      `/api/users/${userId}/email-verification/request-otp/`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error sending OTP");
  }
};
