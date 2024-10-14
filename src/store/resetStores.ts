// src/utils/resetStores.ts
import { useBusinessPeriodsStore } from "@/store/useBusinessPeriodsStore";
import { useAppointmentsStore } from "@/store/useAppointment";
import { useAuthState } from "@/store";
import { useDialogState } from "@/store";
import { usePaginationStore } from "@/store";
import { useDropdownStore } from "@/store";
import { useSearchStore } from "@/store";
import { useSignupState } from "@/store";
import { usePasswordResetState } from "@/store";
import { useUserState } from "@/store";
import { useVerificationState } from "@/store";

// Reset function to clear all Zustand stores
export const resetAllStores = () => {
  // Reset each Zustand store to its initial state
  useBusinessPeriodsStore.setState({
    businessPeriods: [],
    fetchedBusinessPeriods: [],
    services: [],
    appointmentAddresses: [],
    clientProfileData: {},
    loading: false,
    profileLoading: false,
    error: null,
    isSetupComplete: false,
    profile: null,
  });

  useAppointmentsStore.setState({
    appointments: [],
    unavailableSlots: [],
    fullAppointments: [],
    appointmentRequests: [],
    waitlistedAppointments: [],
    upcomingAppointments: [],
    clinicians: [],
    selectedClinician: null,
    filteredAppointmentRequests: null,
    filteredUpcomingAppointments: null,
    filteredWaitlistedAppointments: null,
    filteredFullAppointments: null,
    loading: false,
  });

  useAuthState.setState({
    loading: false,
    passwordMatchError: "",
  });

  useDialogState.setState({
    isOpen: false,
    showReview: false,
    success: false,
    successMessage: null,
  });

  usePaginationStore.setState({
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
  });

  useDropdownStore.setState({
    openDropdownIndex: null,
  });

  useSearchStore.setState({
    searchQuery: "",
    dateRange: null,
    statusFilter: null,
  });

  useSignupState.setState({
    emailSent: false,
    userId: null,
    registrationSuccess: false,
    token: "",
    email: "",
  });

  usePasswordResetState.setState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  useUserState.setState({
    userType: "is_client",
  });

  useVerificationState.setState({
    verificationError: "",
    resendEnabled: false,
    resetTrigger: 0,
  });
};
