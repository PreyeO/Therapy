import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("Base URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchUserEmail = async (email: string) => {
  try {
    const response = await api.post("/api/users/password-reset/request/", {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error("Unknown error occurred");
  }
};

export const changePassword = async (data: {
  email: string;
  otp: string;
  new_password: string;
  new_password_repeated: string;
}) => {
  try {
    const response = await api.post(
      "/api/users/password-reset/complete/",
      data
    );
    return response.data;
  } catch (error) {
    throw new Error("Unknown error occurred");
  }
};
