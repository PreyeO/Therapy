import { create } from "zustand";
import { UserState } from "@/types";

export const useUserState = create<UserState>()((set) => ({
  userType: "patient",
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
  title: string;
  description?: string;
  children: React.ReactNode | null;
  successMessage?: { title: string; subtitle: string } | null;
  openDialog: (
    title: string,
    description: string,
    children: React.ReactNode
  ) => void;
  closeDialog: () => void;
  openSuccess: () => void;
}

export const useDialogState = create<DialogState>((set) => ({
  isOpen: false,
  success: false,
  title: "",
  description: "",
  children: null,
  successMessage: null,
  openDialog: (title, description, children) =>
    set({ isOpen: true, title, description, children, success: false }),
  closeDialog: () => set({ isOpen: false, success: false }),
  openSuccess: () => set({ success: true }),
}));
