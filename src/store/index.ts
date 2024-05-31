import { create } from "zustand";
import { UserState } from "@/types";

export const useUserState = create<UserState>()((set) => ({
  userType: "patient",
  setUserType: (userType) => set({ userType }),
}));
