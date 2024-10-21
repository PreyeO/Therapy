import { api, handleError } from "@/services/api/authentication/auth";

export const getAppointmentHistory = async () => {
  try {
    const response = await api.get(
      "/api/appointments/appointment-history/?detail=true"
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
