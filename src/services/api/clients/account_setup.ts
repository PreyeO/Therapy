import { api, handleError } from "@/services/api/authentication/auth";

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
