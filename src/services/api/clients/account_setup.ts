import {
  getAuthToken,
  api,
  handleError,
} from "@/services/api/authentication/auth";

const token = getAuthToken();
if (token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export const getAppointmentAddress = async () => {
  try {
    const response = await api.get("/api/appointment-addresses");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const setupClientProfile = async (clientProfileId: string, data) => {
  const url = `/api/client-profiles/${clientProfileId}/`;
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
