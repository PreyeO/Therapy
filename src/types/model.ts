// types.ts

// Define the type for user registration data
export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  userType: "patient" | "therapist";
}

// Define the type for the response data from user registration
export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    // Add other properties as needed
  };
  token: string;
}

// Define the type for the response data from email verification
export interface VerifyEmailResponse {
  // Define the structure of the response data as per your backend response
}
