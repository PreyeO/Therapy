import create from "zustand";
import {
  getclinicianBusinessPeriods,
  setupclinicianBusinessPeriods,
  getAppointmentAddress,
} from "@/services/api/clinicians/account_setup";
import {
  AppointmentAddress,
  BusinessPeriod,
  FetchedBusinessPeriod,
  Service,
  ClientSetup,
} from "@/types/formSchema";
import { getUserData } from "@/services/api/authentication/auth";
import { getServices } from "@/services/api/clinicians/appointment";
import { setupClientProfile } from "@/services/api/clients/account_setup";

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
  clientProfileData: ClientSetup; // State for client profile setup data
  loading: boolean;
  profileLoading: boolean; // Loading state for profile data
  error: string | null;
  isSetupComplete: boolean;
  profile: { firstName: string; lastName: string; email: string } | null; // Profile data

  // Fetching business periods
  fetchBusinessPeriods: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppointmentAddresses: () => Promise<void>;
  setupBusinessPeriods: () => Promise<void>;
  fetchProfileData: () => Promise<void>;

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
  completeClientSetup: (clientProfileId: string) => Promise<void>;
}

export const useBusinessPeriodsStore = create<BusinessPeriodsState>(
  (set, get) => ({
    businessPeriods: getLocalStorage("businessPeriods") || [
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
    ],
    fetchedBusinessPeriods: [],
    profile: null,
    loading: false,
    profileLoading: false,
    error: null,
    isSetupComplete: false,
    services: [],
    appointmentAddresses: [],
    clientProfileData: getLocalStorage("clientProfileData") || {},

    // Fetch business periods from the backend and sync with state
    fetchBusinessPeriods: async () => {
      set({ loading: true, error: null });
      try {
        const periods = await getclinicianBusinessPeriods();
        setLocalStorage("fetchedBusinessPeriods", periods);
        set({ fetchedBusinessPeriods: periods, loading: false });
      } catch (error) {
        set({ error: "Error fetching business periods", loading: false });
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
        const userData = getUserData(); // Fetch user data
        if (userData && userData.user) {
          const { first_name, last_name, email, client_profile } =
            userData.user;

          // Extract client profile ID if available
          const clientProfileId = client_profile?.id;

          // Set profile data and client profile ID in state
          set({
            profile: { firstName: first_name, lastName: last_name, email },
            clientProfileData: {
              ...get().clientProfileData,
              id: clientProfileId,
            },
            profileLoading: false,
          });
        } else {
          throw new Error("Profile data not found");
        }
      } catch (error) {
        set({
          error: "Error fetching profile data",
          profileLoading: false,
        });
      }
    },

    // Set business periods manually for setup and sync with localStorage
    setBusinessPeriods: (periods: BusinessPeriod[]) => {
      setLocalStorage("businessPeriods", periods); // Save to localStorage
      set({ businessPeriods: periods });
    },

    // Update a specific business period and sync with localStorage
    updateBusinessPeriod: (index: number, period: Partial<BusinessPeriod>) => {
      set((state) => {
        const updatedPeriods = [...state.businessPeriods];
        updatedPeriods[index] = { ...updatedPeriods[index], ...period };
        setLocalStorage("businessPeriods", updatedPeriods); // Update localStorage
        return { businessPeriods: updatedPeriods };
      });
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
        const { businessPeriods, appointmentAddresses } = get();
        const validBusinessPeriods = businessPeriods
          .filter((period) => period.opening_hour && period.closing_hour)
          .map((period) => ({
            ...period,
            appointment_location_ids: period.appointment_location_ids?.filter(
              (id) => appointmentAddresses.some((address) => address.id)
            ),
          }));
        await setupclinicianBusinessPeriods(validBusinessPeriods);
        set({ isSetupComplete: true, loading: false });
      } catch (error) {
        set({ error: "Error setting up business periods", loading: false });
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

    // Complete the client setup by sending data to backend
    completeClientSetup: async (clientProfileId: string) => {
      if (!clientProfileId) {
        throw new Error("Client Profile ID is missing.");
      }

      set({ loading: true, error: null });
      try {
        const { clientProfileData } = get();
        const payload = {
          preferred_name: clientProfileData.preferred_name,
          date_of_birth: clientProfileData.date_of_birth,
          gender: clientProfileData.gender,
          pronouns: clientProfileData.pronouns,
          phone_number: clientProfileData.phone_number,
          address: clientProfileData.address,
          emergency: clientProfileData.emergency,
        };
        await setupClientProfile(clientProfileId, payload);
        set({ isSetupComplete: true, loading: false });
      } catch (error) {
        set({ error: "Error completing client setup", loading: false });
      }
    },
  })
);
