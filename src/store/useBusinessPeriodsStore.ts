import create from "zustand";
import {
  getclinicianBusinessPeriods,
  setupclinicianBusinessPeriods,
  getAppointmentAddress,
  deleteclinicianBusinessPeriod,
  updateclinicianBusinessPeriods,
} from "@/services/api/clinicians/account_setup";
import {
  AppointmentAddress,
  BusinessPeriod,
  FetchedBusinessPeriod,
  Service,
  ClientSetup,
  ClientProfileSetup,
  Medication,
  Allergy,
  MedicalCondition,
  Encounter,
  SocialSupport,
  ProtectiveFactor,
  SubstanceUse,
} from "@/types/formSchema";
import { getUserData } from "@/services/api/authentication/auth";
import { getServices } from "@/services/api/clinicians/appointment";
import {
  getClientProfile,
  setupClientProfile,
} from "@/services/api/clients/account_setup";
import { getIndividualClinicianBusinessPeriod } from "@/services/api/clients/appointments";

// Utility functions to manage localStorage
const getLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

const setLocalStorage = (key: string, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Zustand store for managing both setup and fetched business periods and client setup data
interface BusinessPeriodsState {
  businessPeriods: BusinessPeriod[]; // For setting up periods
  fetchedBusinessPeriods: FetchedBusinessPeriod[]; // For fetched periods from backend
  services: Service[];
  appointmentAddresses: AppointmentAddress[];
  clientProfileData: ClientSetup;
  clientProfileDetails: ClientProfileSetup;
  clientProfileId: string | null;
  loading: boolean;
  profileLoading: boolean; // Loading state for profile data
  error: string | null;
  isSetupComplete: boolean;
  profile: { firstName: string; lastName: string; email: string } | null;
  medications: Medication[];
  allergies: Allergy[];
  medicalConditions: MedicalCondition[];
  encounters: Encounter[];
  socialSupports: SocialSupport[];
  protectiveFactors: ProtectiveFactor[];
  substanceUses: SubstanceUse[];
  updateState: <K extends keyof BusinessPeriodsState>(
    key: K,
    value: BusinessPeriodsState[K]
  ) => void;

  fetchBusinessPeriodsByClinicianId: (
    clinician_profile_id: string
  ) => Promise<BusinessPeriod[]>;
  updateclinicianBusinessPeriods: (
    periodId: string,
    updatedPeriod: Partial<BusinessPeriod>
  ) => Promise<void>;

  deleteBusinessPeriod: (periodId: string) => Promise<void>;

  // Fetching business periods
  fetchBusinessPeriods: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppointmentAddresses: () => Promise<void>;
  setupBusinessPeriods: () => Promise<void>;

  setupCustomBusinessPeriods: (periods: BusinessPeriod[]) => Promise<void>;
  fetchProfileData: () => Promise<void>;
  fetchProfileMedicals: (clientProfileId: string) => Promise<void>;
  updateMedications: (medications: Medication[]) => Promise<void>;
  updateAllergies: (allergies: Allergy[]) => Promise<void>;
  updateMedicalConditions: (
    medicalConditions: MedicalCondition[]
  ) => Promise<void>;
  updateEncounters: (encounters: Encounter[]) => Promise<void>;
  updateSocialSupports: (socialSupports: SocialSupport[]) => Promise<void>;
  updateSubtanceUses: (substanceUses: SubstanceUse[]) => Promise<void>;
  updateProtectiveFactors: (
    protectiveFactors: ProtectiveFactor[]
  ) => Promise<void>;

  // Setting business periods and profile data
  setBusinessPeriods: (periods: BusinessPeriod[]) => void;
  updateBusinessPeriod: (
    index: number,
    period: Partial<BusinessPeriod>
  ) => void;
  clearBusinessPeriods: () => void;
  setIsSetupComplete: (isComplete: boolean) => void;

  // Methods for managing client profile setup
  setClientProfileData: (data: Partial<ClientSetup>) => void;
  setClientProfileDetails: (data: Partial<ClientProfileSetup>) => void;
  completeClientSetup: (clientProfileId: string) => Promise<void>;
}

const initialBusinessPeriods = [
  {
    day_of_week: "Monday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
  {
    day_of_week: "Tuesday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
  {
    day_of_week: "Wednesday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
  {
    day_of_week: "Thursday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
  {
    day_of_week: "Friday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
  {
    day_of_week: "Saturday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
  {
    day_of_week: "Sunday",
    opening_hour: "",
    closing_hour: "",
    appointment_location_ids: [],
  },
];

export const useBusinessPeriodsStore = create<BusinessPeriodsState>(
  (set, get) => ({
    businessPeriods:
      getLocalStorage("businessPeriods") || initialBusinessPeriods,
    clientProfileId: null,

    fetchedBusinessPeriods: [],

    profile: null,
    loading: false,
    profileLoading: false,
    error: null,
    isSetupComplete: false,
    services: [],
    appointmentAddresses: [],
    clientProfileData: getLocalStorage("clientProfileData") || {},
    clientProfileDetails: getLocalStorage("clientProfileDetails") || {},

    medications: [],
    allergies: [],
    medicalConditions: [],
    encounters: [],
    socialSupports: [],
    protectiveFactors: [],
    substanceUses: [],

    setFetchedBusinessPeriods: (periods: FetchedBusinessPeriod[]) => {
      set({ fetchedBusinessPeriods: periods });
    },
    updateState: (key, value) => {
      set((state) => ({
        ...state,
        [key]: value,
      }));
    },

    // Fetch business periods from the backend and sync with state

    fetchBusinessPeriods: async () => {
      set({ loading: true, error: null });
      try {
        const periods = await getclinicianBusinessPeriods();

        // Filter out duplicates based on day_of_week
        const uniquePeriods = Array.from(
          new Set(periods.map((period) => period.day_of_week))
        ).map((uniqueDay) =>
          periods.find((period) => period.day_of_week === uniqueDay)
        );

        console.log("Fetched Unique Business Periods:", uniquePeriods); // Log the response
        setLocalStorage("fetchedBusinessPeriods", uniquePeriods);
        set({ fetchedBusinessPeriods: uniquePeriods, loading: false });
      } catch (error) {
        set({ error: "Error fetching business periods", loading: false });
      }
    },

    // useBusinessPeriodsStore.ts
    deleteBusinessPeriod: async (periodId: string) => {
      set({ loading: true, error: null });
      try {
        console.log("Deleting business period with ID:", periodId); // Log the ID being deleted
        await deleteclinicianBusinessPeriod(periodId); // Call the API to delete

        // Remove the deleted period from the local state
        const updatedPeriods = get().fetchedBusinessPeriods.filter(
          (period) => period.id !== periodId
        );
        set({ fetchedBusinessPeriods: updatedPeriods, loading: false }); // Update the state
        console.log(
          "Business period deleted successfully from state:",
          updatedPeriods
        );

        // Optional: Refetch business periods from the backend to ensure sync
        await get().fetchBusinessPeriods();
      } catch (error) {
        console.error("Failed to delete business period:", error);
        set({ error: "Error deleting business period", loading: false });
      }
    },
    fetchBusinessPeriodsByClinicianId: async (
      clinician_profile_id: string
    ): Promise<BusinessPeriod[]> => {
      set({ fetchedBusinessPeriods: [] });
      set({ loading: true, error: null });

      try {
        const periods = await getIndividualClinicianBusinessPeriod(
          clinician_profile_id
        );
        set({ fetchedBusinessPeriods: periods, loading: false });
        return periods; // Ensure the function returns the periods array
      } catch (error) {
        set({ error: "Failed to fetch business periods", loading: false });
        return []; // Return an empty array if an error occurs
      }
    },

    // Fetch appointment addresses from backend
    fetchAppointmentAddresses: async () => {
      set({ loading: true, error: null });
      try {
        const addresses = await getAppointmentAddress();
        set({ appointmentAddresses: addresses, loading: false });
      } catch (error) {
        set({ error: "Error fetching appointment addresses", loading: false });
      }
    },

    // Fetch services from backend
    fetchServices: async () => {
      set({ loading: true, error: null });
      try {
        const fetchedServices = await getServices();
        set({ services: fetchedServices, loading: false });
      } catch (error) {
        set({ error: "Error fetching services", loading: false });
      }
    },

    // Fetch profile data
    fetchProfileData: async () => {
      set({ profileLoading: true });
      try {
        const userData = getUserData();
        if (userData && userData.user) {
          const { first_name, last_name, email, client_profile } =
            userData.user;
          const clientProfileId = client_profile?.id || null;

          // Set profile data and client profile ID in separate properties
          set({
            profile: { firstName: first_name, lastName: last_name, email },
            clientProfileData: { ...get().clientProfileData },
            clientProfileId, // Store client profile ID separately
            profileLoading: false,
          });
        } else {
          throw new Error("Profile data not found");
        }
      } catch (error) {
        set({ error: "Error fetching profile data", profileLoading: false });
      }
    },

    // Set business periods manually for setup and sync with localStorage
    setBusinessPeriods: (periods: BusinessPeriod[]) => {
      setLocalStorage("businessPeriods", periods); // Save to localStorage
      set({ businessPeriods: periods });
    },

    // Update a specific business period and sync with localStorage
    updateBusinessPeriod: (index: number, period: Partial<BusinessPeriod>) => {
      const { businessPeriods } = get();
      const updatedPeriods = [...businessPeriods];
      updatedPeriods[index] = { ...updatedPeriods[index], ...period };
      setLocalStorage("businessPeriods", updatedPeriods);
      set({ businessPeriods: updatedPeriods });
    },

    // Clear business periods from state and localStorage
    clearBusinessPeriods: () => {
      clearLocalStorage("businessPeriods"); // Clear from localStorage
      set({ businessPeriods: [] });
    },

    // Setup business periods (save to backend)
    setupBusinessPeriods: async () => {
      set({ loading: true, error: null });
      try {
        const { businessPeriods } = get();

        // Filter and format the payload as expected by the backend
        const payload = businessPeriods
          .filter((period) => period.opening_hour && period.closing_hour)
          .map((period) => ({
            day_of_week: period.day_of_week,
            opening_hour: period.opening_hour,
            closing_hour: period.closing_hour,
            appointment_location_ids:
              period.appointment_location_ids?.map(String), // Ensure IDs are passed as strings
          }));

        await setupclinicianBusinessPeriods(payload);
        set({ isSetupComplete: true, loading: false });
      } catch (error) {
        set({ error: "Error setting up business periods", loading: false });
      }
    },

    setupCustomBusinessPeriods: async (periods: BusinessPeriod[]) => {
      set({ loading: true, error: null });
      try {
        await setupclinicianBusinessPeriods(periods); // Use the provided periods as payload
        set({ isSetupComplete: true, loading: false });
      } catch (error) {
        set({
          error: "Error setting up custom business periods",
          loading: false,
        });
      }
    },

    // Set isSetupComplete state manually
    setIsSetupComplete: (isComplete: boolean) => {
      set({ isSetupComplete: isComplete });
    },

    // Set client profile data and sync with localStorage
    setClientProfileData: (data: Partial<ClientSetup>) => {
      set((state) => {
        const updatedProfileData = { ...state.clientProfileData, ...data };
        setLocalStorage("clientProfileData", updatedProfileData); // Save to localStorage
        return { clientProfileData: updatedProfileData };
      });
    },
    setClientProfileDetails: (data: Partial<ClientProfileSetup>) => {
      set((state) => {
        const updatedProfileDetails = {
          ...state.clientProfileDetails,
          ...data,
        };
        setLocalStorage("clientProfileDetails", updatedProfileDetails);
        return { clientProfileDetails: updatedProfileDetails };
      });
    },

    // Complete the client setup by sending data to backend
    completeClientSetup: async (clientProfileId: string) => {
      if (!clientProfileId) {
        throw new Error("Client Profile ID is missing.");
      }

      set({ loading: true, error: null });
      try {
        const { clientProfileData, clientProfileDetails } = get();
        const payload = {
          ...clientProfileData,
          ...clientProfileDetails,
        };

        await setupClientProfile(clientProfileId, payload);
        set({ isSetupComplete: true, loading: false });
      } catch (error) {
        set({ error: "Error completing client setup", loading: false });
      }
    },
    fetchProfileMedicals: async (clientProfileId: string) => {
      set({ loading: true, error: null });
      try {
        const response = await getClientProfile(clientProfileId);

        set({
          medications: response.medications || [],
          allergies: response.allergies || [],
          medicalConditions: response.medical_conditions || [],
          encounters: response.encounters || [],
          socialSupports: response.social_supports || [],
          protectiveFactors: response.protective_factors || [],
          substanceUses: response.substance_uses || [],
          loading: false,
        });
      } catch (error) {
        set({ error: "Failed to fetch profile data", loading: false });
      }
    },

    updateMedications: async (medications: Medication[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) return;

      set({ loading: true, error: null });
      try {
        await setupClientProfile(clientProfileId, { medications });
        set({ medications, loading: false });
      } catch (error) {
        set({ error: "Failed to update medications", loading: false });
      }
    },

    updateAllergies: async (allergies: Allergy[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) {
        return;
      }

      set({ loading: true });
      try {
        await setupClientProfile(clientProfileId, { allergies });

        set({ allergies });
      } catch (error) {
        set({ error: "Failed to update allergies" });
      } finally {
        set({ loading: false });
      }
    },

    updateMedicalConditions: async (medicalConditions: MedicalCondition[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) return;

      set({ loading: true, error: null });
      try {
        await setupClientProfile(clientProfileId, {
          medical_conditions: medicalConditions,
        });
        set({ medicalConditions, loading: false });
      } catch (error) {
        set({ error: "Failed to update medical conditions", loading: false });
      }
    },
    updateSocialSupports: async (socialSupports: SocialSupport[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) return;

      set({ loading: true, error: null });
      try {
        await setupClientProfile(clientProfileId, {
          social_supports: socialSupports,
        });
        set({ socialSupports, loading: false });
      } catch (error) {
        set({ error: "Failed to update medical conditions", loading: false });
      }
    },
    updateEncounters: async (encounters: Encounter[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) return;

      set({ loading: true, error: null });
      try {
        await setupClientProfile(clientProfileId, {
          encounters: encounters,
        });
        set({ encounters, loading: false });
      } catch (error) {
        set({ error: "Failed to update medical conditions", loading: false });
      }
    },
    updateSubtanceUses: async (substanceUses: SubstanceUse[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) return;

      set({ loading: true, error: null });
      try {
        await setupClientProfile(clientProfileId, {
          substance_uses: substanceUses,
        });
        set({ substanceUses, loading: false });
      } catch (error) {
        set({ error: "Failed to update medical conditions", loading: false });
      }
    },
    updateProtectiveFactors: async (protectiveFactors: ProtectiveFactor[]) => {
      const { clientProfileId } = get();
      if (!clientProfileId) return;

      set({ loading: true, error: null });
      try {
        await setupClientProfile(clientProfileId, {
          protective_factors: protectiveFactors,
        });
        set({ protectiveFactors, loading: false });
      } catch (error) {
        set({ error: "Failed to update medical conditions", loading: false });
      }
    },

    updateclinicianBusinessPeriods: async (
      periodId: string,
      updatedPeriod: Partial<BusinessPeriod>
    ) => {
      set({ loading: true, error: null });
      try {
        // Call the API function with separate arguments (periodId and updatedPeriod)
        await updateclinicianBusinessPeriods(periodId, updatedPeriod);
        await get().fetchBusinessPeriods(); // Refresh the business periods list
        set({ loading: false });
      } catch (error) {
        set({ error: "Error updating business period", loading: false });
      }
    },
  })
);
