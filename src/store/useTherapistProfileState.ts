// src/store/therapistProfileStore.ts
import { create } from "zustand";
import { getUserData, getAuthToken, setAuthToken } from "@/services/api/auth";
import { getTherapistProfile } from "@/services/api/therapist/account_setup";
import { FormState } from "@/types";

// Define the type for the therapist profile state
interface TherapistProfileState {
  profile: FormState | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => void;
}

export const useTherapistProfileState = create<TherapistProfileState>(
  (set) => ({
    profile: null,
    loading: true,
    error: null,
    fetchProfile: async () => {
      set({ loading: true, error: null });
      try {
        const userData = getUserData();
        if (userData && userData.user && userData.user.therapist_profile) {
          const profileId = userData.user.therapist_profile.id;

          // Set the token from local storage
          const token = getAuthToken();
          if (token) {
            setAuthToken(token);
          }

          const profileData = await getTherapistProfile(profileId);
          set({ profile: profileData, loading: false });
        } else {
          throw new Error("Therapist profile not found in user data");
        }
      } catch (error) {
        set({ error: "Error fetching profile data", loading: false });
        console.error("Error fetching profile data:", error);
      }
    },
  })
);
