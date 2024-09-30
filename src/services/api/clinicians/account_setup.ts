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
    console.log("Fetching business periods...");
    const response = await api.get(`/api/business-periods/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// export const updateclinicianBusinessPeriods = async (periodDayId) => {
//   try {
//     const response = await api.patch(`/api/business-periods/${periodDayId}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };
