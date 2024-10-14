import { api, handleError } from "@/services/api/authentication/auth";
import { BusinessPeriod } from "@/types/formSchema";

export const getAppointmentAddress = async () => {
  try {
    const response = await api.get("/api/appointment-addresses");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const setupclinicianBusinessPeriods = async (periods) => {
  try {
    const response = await api.post("/api/business-periods/", periods);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getclinicianBusinessPeriods = async () => {
  try {
    const response = await api.get(`/api/business-periods/`);

    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const deleteclinicianBusinessPeriod = async (
  businessPeriodId: string
) => {
  try {
    const response = await api.delete(
      `/api/business-periods/${businessPeriodId}`
    );

    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateclinicianBusinessPeriods = async (
  businessPeriodId: string,
  updatedPeriod: Partial<BusinessPeriod>
) => {
  try {
    const response = await api.patch(
      `/api/business-periods/${businessPeriodId}/`,
      updatedPeriod
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
