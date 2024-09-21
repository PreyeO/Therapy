import { create } from "zustand";
import { UserState } from "@/types/formSchema";

export const useUserState = create<UserState>()((set) => ({
  userType: "is_client",
  setUserType: (userType) => set({ userType }),
}));

interface AuthState {
  loading: boolean;
  passwordMatchError: string;
  setLoading: (loading: boolean) => void;
  setPasswordMatchError: (error: string) => void;
}

export const useAuthState = create<AuthState>((set) => ({
  loading: false,
  passwordMatchError: "",
  setLoading: (loading) => set({ loading }),
  setPasswordMatchError: (error) => set({ passwordMatchError: error }),
}));

interface VerificationState {
  verificationError: string;
  resendEnabled: boolean;
  resetTrigger: number;
  setVerificationError: (error: string) => void;
  setResendEnabled: (enabled: boolean) => void;
  incrementResetTrigger: () => void;
}

export const useVerificationState = create<VerificationState>((set) => ({
  verificationError: "",
  resendEnabled: false,
  resetTrigger: 0,
  setVerificationError: (error) => set({ verificationError: error }),
  setResendEnabled: (enabled) => set({ resendEnabled: enabled }),
  incrementResetTrigger: () =>
    set((state) => ({ resetTrigger: state.resetTrigger + 1 })),
}));

interface SignupState {
  emailSent: boolean;
  userId: string | null;
  registrationSuccess: boolean;
  token: string;
  email: string;
  setEmailSent: (sent: boolean) => void;
  setUserId: (id: string | null) => void;
  setRegistrationSuccess: (success: boolean) => void;
  setToken: (token: string) => void;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useSignupState = create<SignupState>((set) => ({
  emailSent: false,
  userId: null,
  registrationSuccess: false,
  token: "",
  email: "",

  setEmailSent: (sent) => set({ emailSent: sent }),
  setUserId: (id) => set({ userId: id }),
  setRegistrationSuccess: (success) => set({ registrationSuccess: success }),
  setToken: (token) => set({ token }),
  setEmail: (email) => set({ email }),
  reset: () =>
    set({
      emailSent: false,
      userId: null,
      registrationSuccess: false,
      token: "",
      email: "",
    }),
}));

interface PasswordResetState {
  email: string;
  newPassword: string;
  confirmPassword: string;
  setEmail: (email: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  reset: () => void;
}

export const usePasswordResetState = create<PasswordResetState>((set) => ({
  email: "",
  newPassword: "",
  confirmPassword: "",
  setEmail: (email) => set({ email }),
  setNewPassword: (password) => set({ newPassword: password }),
  setConfirmPassword: (password) => set({ confirmPassword: password }),
  reset: () =>
    set({
      email: "",
      newPassword: "",
      confirmPassword: "",
    }),
}));

interface DialogState {
  isOpen: boolean;
  success: boolean;
  successMessage?: { title: string; subtitle: string } | null;
  openSuccess: (message: { title: string; subtitle: string }) => void;
  closeDialog: () => void;
}

export const useDialogState = create<DialogState>((set) => ({
  isOpen: false,
  success: false,
  successMessage: null,
  openSuccess: (message) =>
    set({ isOpen: true, success: true, successMessage: message }),
  closeDialog: () =>
    set({ isOpen: false, success: false, successMessage: null }),
}));

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setTotalItems: (total: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  resetPagination: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  itemsPerPage: 8,
  totalItems: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalItems: (total) => set({ totalItems: total }),
  goToNextPage: () =>
    set((state) => {
      const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      return { currentPage: Math.min(state.currentPage + 1, totalPages) };
    }),
  goToPreviousPage: () =>
    set((state) => ({ currentPage: Math.max(state.currentPage - 1, 1) })),
  resetPagination: () => set({ currentPage: 1, totalItems: 0 }),
}));

interface DropdownState {
  openDropdownIndex: number | null;
  toggleDropdown: (index: number) => void;
  closeDropdown: () => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  openDropdownIndex: null,
  toggleDropdown: (index: number) =>
    set((state) => ({
      openDropdownIndex: state.openDropdownIndex === index ? null : index,
    })),
  closeDropdown: () => set({ openDropdownIndex: null }),
}));

interface SearchState {
  searchQuery: string;
  dateRange: { start: string; end: string } | null;
  statusFilter: string | null;
  setSearchQuery: (query: string) => void;
  setDateRange: (range: { start: string; end: string }) => void;
  setStatusFilter: (status: string | null) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  dateRange: null,
  statusFilter: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setDateRange: (range) => set({ dateRange: range }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  resetFilters: () =>
    set({ searchQuery: "", dateRange: null, statusFilter: null }),
}));
