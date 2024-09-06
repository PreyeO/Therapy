// // src/store/therapistProfileStore.ts
// import { create } from "zustand";
// import {
//   getUserData,
//   getAuthToken,
//   setAuthToken,
// } from "@/services/api/authentication/auth";
// import { getAppointmentAddress } from "@/services/api/therapist/account_setup";

// // Define the type for the therapist profile state
// interface TherapistProfileState {
//   profile: FormState | null;
//   appointmentAddresses: AppointmentAddress[] | null;
//   loading: boolean;
//   error: string | null;
//   fetchProfile: () => void;
//   fetchAppointmentAddresses: () => void;
// }

// export const useTherapistProfileState = create<TherapistProfileState>(
//   (set) => ({
//     profile: null,
//     appointmentAddresses: null,
//     loading: true,
//     error: null,

//     fetchProfile: async () => {
//       set({ loading: true, error: null });
//       try {
//         const userData = getUserData();
//         if (userData && userData.user && userData.user.therapist_profile) {
//           const profileId = userData.user.therapist_profile.id;

//           const token = getAuthToken();
//           if (token) {
//             setAuthToken(token);
//           }

//           const profileData = await getTherapistProfile(profileId);
//           set({ profile: profileData, loading: false });
//         } else {
//           throw new Error("Therapist profile not found in user data");
//         }
//       } catch (error) {
//         set({ error: "Error fetching profile data", loading: false });
//         console.error("Error fetching profile data:", error);
//       }
//     },

//     fetchAppointmentAddresses: async () => {
//       try {
//         const addresses = await getAppointmentAddress();
//         set({ appointmentAddresses: addresses, loading: false });
//       } catch (error) {
//         set({ error: "Error fetching appointment addresses", loading: false });
//         console.error("Error fetching appointment addresses:", error);
//       }
//     },
//   })
// );
