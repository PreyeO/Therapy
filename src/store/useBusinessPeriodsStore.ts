import create from "zustand";
import {
  getclinicianBusinessPeriods,
  setupclinicianBusinessPeriods,
} from "@/services/api/clinicians/account_setup";
import {
  BusinessPeriod,
  FetchedBusinessPeriod,
  Service,
} from "@/types/formSchema"; // For setting up
import { getUserData } from "@/services/api/authentication/auth";
import { getServices } from "@/services/api/clinicians/appointment";

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

// Zustand store for managing both setup and fetched business periods
interface BusinessPeriodsState {
  businessPeriods: BusinessPeriod[]; // For setting up periods
  fetchedBusinessPeriods: FetchedBusinessPeriod[]; // For fetched periods from backend
  services: Service[];
  loading: boolean;
  profileLoading: boolean; // Loading state for profile data
  error: string | null;
  isSetupComplete: boolean;
  profile: { firstName: string; lastName: string; email: string } | null; // Profile data
  fetchBusinessPeriods: () => Promise<void>; // Fetching business periods
  fetchServices: () => Promise<void>; // Fetching services
  setupBusinessPeriods: () => Promise<void>; // Setup method
  fetchProfileData: () => Promise<void>; // Fetching profile data
  setBusinessPeriods: (periods: BusinessPeriod[]) => void; // Setting up business periods
  updateBusinessPeriod: (
    index: number,
    period: Partial<BusinessPeriod>
  ) => void;
  clearBusinessPeriods: () => void;
  setIsSetupComplete: (isComplete: boolean) => void;
}

export const useBusinessPeriodsStore = create<BusinessPeriodsState>((set) => ({
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
  fetchedBusinessPeriods: [], // Fetched from backend
  profile: null, // Profile data
  loading: false,
  profileLoading: false, // Profile loading state
  error: null,
  isSetupComplete: false,
  services: [],

  // Fetch business periods from the backend and sync with state
  fetchBusinessPeriods: async () => {
    set({ loading: true, error: null });
    try {
      const periods = await getclinicianBusinessPeriods(); // Fetch from API
      setLocalStorage("fetchedBusinessPeriods", periods); // Save fetched periods to localStorage
      set({ fetchedBusinessPeriods: periods, loading: false });
    } catch (error) {
      set({ error: "Error fetching business periods", loading: false });
    }
  },
  // Fetch services from the backend and sync with state
  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const fetchedServices = await getServices(); // Fetch services from API
      set({ services: fetchedServices, loading: false }); // Update state with services
    } catch (error) {
      set({ error: "Error fetching services", loading: false });
    }
  },
  fetchProfileData: async () => {
    set({ profileLoading: true });
    try {
      const userData = getUserData(); // Fetch user data
      if (userData) {
        const { first_name, last_name, email } = userData.user;
        set({
          profile: { firstName: first_name, lastName: last_name, email },
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
      const { businessPeriods } = useBusinessPeriodsStore.getState();
      const validBusinessPeriods = businessPeriods.filter(
        (period: BusinessPeriod) => period.opening_hour && period.closing_hour
      );
      await setupclinicianBusinessPeriods(validBusinessPeriods); // Set up valid periods
      set({ isSetupComplete: true, loading: false });
    } catch (error) {
      set({ error: "Error setting up business periods", loading: false });
    }
  },

  // Set isSetupComplete state manually
  setIsSetupComplete: (isComplete: boolean) => {
    set({ isSetupComplete: isComplete });
  },
}));
