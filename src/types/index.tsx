import { z } from "zod";

// export const contactFormSchema = z.object({
//   firstName: z.string().min(3, {
//     message: "Provide a valid first name",
//   }),
//   lastName: z.string().min(3, {
//     message: "Provide a valid last name",
//   }),
//   email: z.string().email({
//     message: "Provide a valid email",
//   }),
//   message: z.string().min(10, {
//     message: "Provide a valid message",
//   }),
//   terms: z.boolean().refine((value) => value === true, {
//     message: "You must agree to the terms and conditions",
//   }),
// });

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export interface RegisterDataType {
  userType: "patient" | "therapist";
}

// export const jobProfileRegisterSchema = z.object({
//   discipline: z.string({
//     required_error: "Please select a discipline to continue",
//   }),
//   experience: z.enum(["junior", "mid", "senior"], {
//     required_error: "Select an experience level to continue",
//   }),
//   roleType: z.enum(["contractor", "full-time", "any"], {
//     required_error: "Select an option to continue",
//   }),
//   // skills: z.array(z.string()).nonempty(),
// });

export const userDetailsRegisterSchema = z.object({
  firstName: z.string({
    required_error: "Provide your full name to continue",
  }),

  email: z
    .string({
      invalid_type_error: "Email is required",
      required_error: "Please provide your email to continue",
    })
    .email({
      message: "Provide a valid mail to continue",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(6, {
      message: "Password does not meet requirements",
    }),
  password_confirmation: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(6, {
      message: "Password does not meet requirements",
    }),

  terms: z
    .boolean({
      required_error: "You must agree to the terms and conditions",
    })
    .refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
});

export const verifyEmailSchema = z.object({
  emailOtp: z
    .string({
      invalid_type_error: "Invalid code",
    })
    .min(4, {
      message: "Invalid code",
    })
    .max(4, {
      message: "Invalid code",
    }),
});

export const linkSocialAccountSchema = z.object({
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
  behance: z.string().optional(),
  others: z.string().optional(),
});

export const resetPasswordSchema = z.object({
  email: z.string({
    invalid_type_error: "Invalid email",
    required_error: "Please provide a valid email",
  }),
  otp: z.array(z.string()).nonempty(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export interface handleNextProps {
  handleNext: () => void;
  type?: RegisterDataType["userType"] | undefined;
}

export const OTPFormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
