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
  userType: "is_client" | "is_clinician";
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
  userType: z.enum(["is_client", "is_clinician"], {
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

export const therepistProfileFormSchema = z.object({
  full_name: z.string({
    message: "Please provide your full name",
  }),
  email: z.string({
    message: "Please provide your email address",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  zipcode: z.string().optional(),
});
export const clinicianProfileBusinessAddressSchema = z.object({
  street_address: z.string({
    required_error: "Provide your business street to continue",
  }),
  city: z.string({
    required_error: "Provide your business city to continue",
  }),
  state: z.string({
    required_error: "Provide your business state to continue",
  }),
  postal_code: z.string({
    required_error: "Provide your business postal code to continue",
  }),
});

export type Service = {
  id: string;
  name: string;
  code: string;
  duration: number;
  price: number;
};

export type Client = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  // Add any other relevant client fields here
};

export type Event = {
  title: string;
  start: Date;
  end: Date;
  client: string;
  service: Service; // Update this to reflect that service is an object, not a string
  serviceDuration: number;
};

export const businessPeriodSchema = z.object({
  day_of_week: z.string(),
  opening_hour: z.string(),
  closing_hour: z.string(),
  appointment_location_ids: z.array(z.string()).optional(), // Location IDs
});

// Infer the BusinessPeriod type from the schema
export type BusinessPeriod = z.infer<typeof businessPeriodSchema>;

export interface FetchedBusinessPeriod {
  id: string;
  day_of_week: string;
  opening_hour: string;
  closing_hour: string;
  business_locations: Array<{
    id: string;
    location: {
      id: number;
      street_address: string;
      city: string;
      state: string;
      postal_code: string;
    };
  }> | null;
}
export type AppointmentAddress = {
  id: number;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
};

export type AppointmentInfo = {
  id: string;
  client: {
    first_name: string;
    last_name: string;
    email: string;
  };
  service: Service;
  start_time: string;
  end_time: string;
};
export type DropdownItem = {
  label: string;
  color: string;
  onClick: () => void | Promise<void>;
  icons?: React.ReactNode;
};

export type Appointment = {
  id: string;
  client: string;
  appointmentTime: string;
  appointmentDate: string;
  location?: string;
};
export type AppointmentFilters = {
  status?: string | null;
  acceptance_status?: string | null;
  start_time?: string;
  end_time?: string;
  search?: string;
};
export type Services = {
  name: string;
  code: string;
  duration: number;
  price: number;
};

// CLIENTS

// Update the schema to include nested address and emergency objects
export const clientSetupFormSchema = z.object({
  id: z.string().optional(),
  preferred_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  phone_number: z.string().optional(),
  pronouns: z.string().optional(),
  gender: z.string().optional(),
  address: z
    .object({
      street_address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postal_code: z.string().optional(),
    })
    .optional(),
  emergency: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      email: z.string().optional(),
      phone_number: z.string().optional(),
      gender: z.string().optional(),
    })
    .optional(),
});

// Infer the ClientSetup type from the schema
export type ClientSetup = z.infer<typeof clientSetupFormSchema>;

export const ApointmentBookingFormSchema = z.object({
  date: z.string().optional(),
  time: z.string().optional(),
  location: z.string({
    message: "Please provide a valid password",
  }),
  service: z.string({
    message: "Please provide a valid password",
  }),
  duration: z.string().optional(),
  rate: z.string().optional(),
});
export type Clinician = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  clinician_profile: {
    id: string;
    bio: string | null;
    professional_license_number: string | null;
    specialty: string | null;
    practice_name: string | null;
  } | null;
};
export type BookAppointment = {
  clinician_profile: string;
  service: string;
  start_time: string;
  location: string;
};
// Define the structure of your booking data
export type BookingData = {
  date: string;
  time: string;
  location: string | null;
  service: string | null;
  duration: string | null;
  rate: string | null;
};
