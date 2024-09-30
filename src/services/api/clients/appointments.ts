import {
  getAuthToken,
  api,
  handleError,
} from "@/services/api/authentication/auth";
import { BookAppointment } from "@/types/formSchema";

const token = getAuthToken();
if (token) {
  api.defaults.headers.common["Authorization"] = `Token ${token}`;
}

export const bookAppointment = async (appointmentData: BookAppointment) => {
  try {
    // Use the provided payload as the request body
    const response = await api.post(`/api/appointments/`, appointmentData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getCliniciansList = async () => {
  try {
    const response = await api.get(`/api/clinician-profiles/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getIndividualClinician = async (clinician_profile_id: string) => {
  try {
    const response = await api.get(
      `api/clinician-profiles/${clinician_profile_id}/`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
