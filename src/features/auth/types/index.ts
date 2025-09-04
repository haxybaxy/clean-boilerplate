export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface UpdatePasswordData {
  password: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string | undefined;
  email_confirmed_at?: string;
  created_at?: string;
}