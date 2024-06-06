// src/service/api/auth.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://your-api-url.com", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
