export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  // Add other user-related fields as needed
}

export interface RegisterUserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  is_clinician?: boolean;
  is_client?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface OTPResponse {
  detail: string;
}

// export const clientSetupFormSchema = z.object({
//   id: z.string().optional(),
//   preferred_name: z.string().optional(),
//   date_of_birth: z.string().optional(),
//   phone_number: z.string().optional(),
//   pronouns: z.string().optional(),
//   gender: z.string().optional(),
//   address: z
//     .object({
//       street_address: z.string().optional(),
//       city: z.string().optional(),
//       state: z.string().optional(),
//       postal_code: z.string().optional(),
//     })
//     .optional(),
//   emergency_contact: z
//     .object({
//       first_name: z.string().optional(),
//       last_name: z.string().optional(),
//       email: z.string().optional(),
//       phone_number: z.string().optional(),
//       gender: z.string().optional(),
//     })
//     .optional(),
//   medications: z
//     .array(
//       z.object({
//         name: z.string(), // required
//         dosage_quantity: z.string().optional(),
//         dosage_unit: z.string().optional(),
//         purpose: z.string().optional(),
//         frequency: z.string().optional(),
//         prescriber: z.string().optional(),
//         start_date: z.string().optional(),
//         end_date: z.string().optional(),
//         notes: z.string().optional(),
//       })
//     )
//     .optional(),
//   allergies: z
//     .array(
//       z.object({
//         name: z.string(), // required
//       })
//     )
//     .optional(),
//   medical_conditions: z
//     .array(
//       z.object({
//         name: z.string(), // required
//         diagnosis_date: z.string().optional(),
//         notes: z.string().optional(),
//       })
//     )
//     .optional(),
//   encounters: z
//     .array(
//       z.object({
//         clinician_profile: z.string(), // required
//         encounter_type: z.string(), // required
//         progress_note: z.string().optional(),
//         notes: z.string().optional(),
//       })
//     )
//     .optional(),
//   social_supports: z
//     .array(
//       z.object({
//         social_support_type: z.string(), // required
//         description: z.string().optional(),
//         strength: z.string().optional(),
//         notes: z.string().optional(),
//       })
//     )
//     .optional(),
//   protective_factors: z
//     .array(
//       z.object({
//         factor: z.string(), // required
//         description: z.string().optional(),
//         notes: z.string().optional(),
//       })
//     )
//     .optional(),
//   subtance_uses: z
//     .array(
//       z.object({
//         substance_type: z.string(), // required
//         frequency: z.string().optional(),
//       })
//     )
//     .optional(),
// });
