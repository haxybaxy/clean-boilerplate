import { createClient } from "@/src/shared/services/client";
import type { LoginCredentials, SignUpCredentials, ResetPasswordData, UpdatePasswordData, AuthUser } from "../types";

export class AuthService {
  private supabase = createClient();

  async login({ email, password }: LoginCredentials) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signUp({ email, password }: SignUpCredentials) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword({ email }: ResetPasswordData) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) throw error;
  }

  async updatePassword({ password }: UpdatePasswordData) {
    const { error } = await this.supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    
    if (error) throw error;
    
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at,
    };
  }

  async getCurrentSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }
}

export const authService = new AuthService();