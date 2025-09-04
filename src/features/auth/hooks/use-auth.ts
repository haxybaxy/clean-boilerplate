"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import type { LoginCredentials, SignUpCredentials, ResetPasswordData, UpdatePasswordData } from "../types";
import { QUERY_KEYS } from "../../../shared/constants/query-keys";

export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.auth.user,
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCurrentSession() {
  return useQuery({
    queryKey: QUERY_KEYS.auth.session,
    queryFn: () => authService.getCurrentSession(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.user });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.session });
      router.push("/protected");
    },
  });
}

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: SignUpCredentials) => authService.signUp(credentials),
    onSuccess: () => {
      router.push("/auth/sign-up-success");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth queries
      queryClient.removeQueries({ queryKey: QUERY_KEYS.auth.user });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.auth.session });
      router.push("/");
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => authService.resetPassword(data),
  });
}

export function useUpdatePassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdatePasswordData) => authService.updatePassword(data),
    onSuccess: () => {
      router.push("/protected");
    },
  });
}