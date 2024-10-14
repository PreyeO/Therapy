import { api, handleError } from "@/services/api/authentication/auth";
import { BookAppointment } from "@/types/formSchema";

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

export const getClinicianCalendar = async (
  clinician_profile_id: string,
  start_date: string,
  end_date: string
) => {
  try {
    const response = await api.get(
      `api/appointments/clinician-calendar/?start_date=${start_date}&end_date=${end_date}&clinician_id=${clinician_profile_id}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getIndividualClinicianBusinessPeriod = async (
  clinician_profile_id: string
) => {
  try {
    const response = await api.get(
      `/api/business-periods/?clinician_profile_id=${clinician_profile_id}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
