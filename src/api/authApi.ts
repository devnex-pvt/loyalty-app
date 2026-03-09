/**
 * api/authApi.ts
 * All authentication endpoints.
 * Services (authService.ts) call these instead of hard-coded mock logic
 * when a real backend is available.
 */

import { apiPost, setAuthToken, setRefreshToken, clearTokens } from "../services/apiService";

// ─── Request / Response shapes ────────────────────────────────────────────────

export interface LoginRequest {
  identifier: string; // email or username
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  joinDate?: string;
  avatar?: string | null;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
  expiresIn: number; // seconds
}

export interface AuthPayload {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ─── API calls ────────────────────────────────────────────────────────────────

/**
 * POST /auth/login
 * Stores tokens in SecureStore on success.
 */
export const loginApi = async (payload: LoginRequest): Promise<AuthPayload> => {
  const result = await apiPost<AuthPayload>("/auth/login", payload);
  await setAuthToken(result.tokens.token);
  await setRefreshToken(result.tokens.refreshToken);
  return result;
};

/**
 * POST /auth/register
 * Stores tokens in SecureStore on success.
 */
export const registerApi = async (payload: RegisterRequest): Promise<AuthPayload> => {
  const result = await apiPost<AuthPayload>("/auth/register", payload);
  await setAuthToken(result.tokens.token);
  await setRefreshToken(result.tokens.refreshToken);
  return result;
};

/**
 * POST /auth/forgot-password
 * Triggers a password-reset email.
 */
export const forgotPasswordApi = (payload: ForgotPasswordRequest): Promise<{ message: string }> =>
  apiPost<{ message: string }>("/auth/forgot-password", payload);

/**
 * POST /auth/reset-password
 * Completes the password reset flow.
 */
export const resetPasswordApi = (payload: ResetPasswordRequest): Promise<{ message: string }> =>
  apiPost<{ message: string }>("/auth/reset-password", payload);

/**
 * POST /auth/logout
 * Invalidates the server-side session and clears local tokens.
 */
export const logoutApi = async (): Promise<void> => {
  try {
    await apiPost<void>("/auth/logout");
  } finally {
    await clearTokens();
  }
};
