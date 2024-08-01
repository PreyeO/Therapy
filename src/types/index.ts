import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please provide a valid email",
  }),
  password: z.string().min(6, {
    message: "Please provide a valid password",
  }),
});

export interface RegisterDataType {
  userType: "patient" | "therapist";
}

const passwordRegex = {
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};

export const userDetailsRegisterSchema = z.object({
  first_name: z.string({
    required_error: "Provide your full name to continue",
  }),
  last_name: z.string({
    required_error: "Provide your last name to continue",
  }),
  email: z
    .string({
      invalid_type_error: "Email is required",
      required_error: "provide your email to continue",
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
  confirm_password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(6, {
      message: "Password does not meet requirements",
    })
    .refine((value) => passwordRegex.hasUpperCase.test(value), {
      message: "Password must have at least one uppercase letter",
    })
    .refine((value) => passwordRegex.hasLowerCase.test(value), {
      message: "Password must have at least one lowercase letter",
    })
    .refine((value) => passwordRegex.hasNumber.test(value), {
      message: "Password must have at least one number",
    })
    .refine((value) => passwordRegex.hasSpecialChar.test(value), {
      message: "Password must have at least one special character",
    }),
  terms: z
    .boolean({
      required_error: "You must agree to the terms and conditions",
    })
    .refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  userType: z.enum(["patient", "therapist"], {
    required_error: "User type is required",
  }),
});
export const verifyEmailSchema = z.object({
  otp: z
    .string({
      invalid_type_error: "Invalid code",
    })
    .min(6, {
      message: "Invalid code",
    })
    .max(6, {
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
  newPassword: z
    .string({
      required_error: "New password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .refine((value) => passwordRegex.hasUpperCase.test(value), {
      message: "Password must have at least one uppercase letter",
    })
    .refine((value) => passwordRegex.hasLowerCase.test(value), {
      message: "Password must have at least one lowercase letter",
    })
    .refine((value) => passwordRegex.hasNumber.test(value), {
      message: "Password must have at least one number",
    })
    .refine((value) => passwordRegex.hasSpecialChar.test(value), {
      message: "Password must have at least one special character",
    }),
  confirmPassword: z.string({
    required_error: "Confirm password is required",
  }),
});

export const OTPFormSchema = z.object({
  pin: z
    .string({
      invalid_type_error: "Invalid code",
    })
    .min(6, {
      message: "Invalid code",
    })
    .max(6, {
      message: "Invalid code",
    }),
});

export interface handleNextProps {
  handleNext: (
    userId: string,
    token: string,
    email: string,
    onSuccess?: boolean
  ) => void;
  type?: RegisterDataType["userType"];
}

export interface handleNextPropsTwo {
  handleNext: (
    email?: string,
    newPassword?: string,
    confirmPassword?: string
  ) => void;
}

export interface UserState {
  userType: RegisterDataType["userType"];
  setUserType: (value: RegisterDataType["userType"]) => void;
}

export interface VerificationProps extends handleNextProps {
  handleSubmit: (otp: string) => void;
  userType: RegisterDataType["userType"];
}

export const therapistSetupFormSchema = z.object({
  practice_name: z.string({
    message: "Please provide your practice name",
  }),
  state: z.string({
    required_error: "Provide your business state to continue",
  }),
  city: z.string({
    required_error: "Provide your business city to continue",
  }),
  street: z.string({
    required_error: "Provide your business street to continue",
  }),
  zipcode: z.string({
    required_error: "Provide your business zipcode to continue",
  }),
  office_name: z.string({
    required_error: "Provide your business street to continue",
  }),
  service: z.string({
    required_error: "Provide your business street to continue",
  }),
  duration: z.string({
    required_error: "Provide your business street to continue",
  }),
  rate: z.string({
    required_error: "Provide your business street to continue",
  }),
});

export const therepistProfileFormSchema = z.object({
  full_name: z.string({
    message: "Please provide your full name",
  }),
  email: z.string({
    message: "Please provide your email address",
  }),
  state: z.string({
    required_error: "Provide your business state to continue",
  }),
  city: z.string({
    required_error: "Provide your business city to continue",
  }),
  street: z.string({
    required_error: "Provide your business street to continue",
  }),
  zipcode: z.string({
    required_error: "Provide your business zipcode to continue",
  }),
});

export type Event = {
  title: string;
  start: Date;
  end: Date;
};
