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

export const getClientProfile = async (clientProfileId: string) => {
  try {
    const response = await api.get(`/api/client-profiles/${clientProfileId}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteMedication = async (clientMedicationId: string) => {
  try {
    const response = await api.delete(
      `/api/medications/${clientMedicationId}/`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAllergy = async (clientAllergyId: string) => {
  try {
    const response = await api.delete(`/api/allergies/${clientAllergyId}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEncounter = async (clientEncounterId: string) => {
  try {
    const response = await api.delete(`/api/encounters/${clientEncounterId}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteMedicalCondition = async (clientConditionId: string) => {
  try {
    const response = await api.delete(
      `/api/medical-conditions/${clientConditionId}/`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProtectiveFactor = async (clientFactorId: string) => {
  try {
    const response = await api.delete(
      `/api/protective-factors/${clientFactorId}/`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const deleteSocialSupport = async (clientSupportId: string) => {
  try {
    const response = await api.delete(
      `/api/social-supports/${clientSupportId}/`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const deleteSubstanceUse = async (clientSubstanceId: string) => {
  try {
    const response = await api.delete(
      `/api/substance-uses/${clientSubstanceId}/`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
