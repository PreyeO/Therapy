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
  is_therapist?: boolean;
  is_patient?: boolean;
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
