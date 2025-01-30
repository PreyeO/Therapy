import { api, handleError } from "@/services/api/authentication/auth";

export const getUnavailableSlots = async () => {
  try {
    const response = await api.get(`/api/clinician-unavailable-slots/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const getServices = async () => {
  try {
    const response = await api.get(`/api/clinical-services`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const BookAppointment = async () => {
  try {
    const response = await api.post(`/api/appointments/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAppointments = async () => {
  try {
    console.log("Fetching all appointments with details...");
    const response = await api.get(`/api/appointments?detail=true`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getFullAppointments = async () => {
  try {
    const queryParams = new URLSearchParams({
      detail: "true", // Only passing detail=true
    }).toString();

    const response = await api.get(`/api/appointments?${queryParams}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAppointmentRequests = async () => {
  try {
    const response = await api.get(
      `/api/appointments?detail=true&acceptance_status=null`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUpcomingAppointments = async () => {
  try {
    const response = await api.get(
      `/api/appointments?detail=true&status=null&acceptance_status=Accepted`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getWaitlistedAppointments = async () => {
  try {
    const response = await api.get(
      `/api/appointments?detail=true&acceptance_status=Waitlisted`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const updateAppointmentStatus = async (
  appointmentId: string,
  data: {
    service?: string;
    start_time?: string;
    status?: string;
    acceptance_status?: string;
  }
) => {
  if (!appointmentId) {
    throw new Error("Appointment ID is undefined");
  }

  try {
    const payload: Record<string, string | undefined> = {};
    if (data.service) payload.service = data.service;
    if (data.start_time) payload.start_time = data.start_time;
    if (data.status) payload.status = data.status;
    if (data.acceptance_status)
      payload.acceptance_status = data.acceptance_status;

    const response = await api.patch(
      `/api/appointments/${appointmentId}/`,
      payload
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getNameSearch = async (name: string) => {
  try {
    const response = await api.get(
      `/api/appointments/?detail=true&search=${name}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getDateSearch = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(
      `/api/appointments/?detail=true&start_time=${startDate},${endDate}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllClinicians = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(
      `/api/appointments/?detail=true&start_time=${startDate},${endDate}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllClients = async () => {
  try {
    const response = await api.get(`api/client-profiles/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllClinicianProfiles = async () => {
  try {
    const response = await api.get(`api/clinician-profiles/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllClientProfile = async () => {
  try {
    const response = await api.get(`api/client-profiles/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
