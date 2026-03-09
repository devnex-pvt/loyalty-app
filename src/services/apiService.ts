/**
 * apiService.ts
 * Central Axios client for the Loyalty App.
 *
 * - Base URL is read from EXPO_PUBLIC_API_URL (set in .env / EAS secrets).
 * - Every request automatically attaches the Bearer token stored in
 *   expo-secure-store under the key "auth_token".
 * - 401 responses trigger an automatic token refresh; if that fails the
 *   stored credentials are cleared so the app can redirect to login.
 * - All non-2xx responses are mapped to a typed ApiError so callers never
 *   have to inspect raw Axios errors.
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://api.loyaltyapp.example.com/v1";

export const SECURE_STORE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

const TIMEOUT_MS = 15_000;

// ─── Typed API envelope ───────────────────────────────────────────────────────

/** Every successful API response is wrapped in this shape. */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/** Normalised error thrown by every failed API call. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly raw?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Token helpers ────────────────────────────────────────────────────────────

export const getAuthToken = (): Promise<string | null> =>
  SecureStore.getItemAsync(SECURE_STORE_KEYS.AUTH_TOKEN);

export const setAuthToken = (token: string): Promise<void> =>
  SecureStore.setItemAsync(SECURE_STORE_KEYS.AUTH_TOKEN, token);

export const getRefreshToken = (): Promise<string | null> =>
  SecureStore.getItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);

export const setRefreshToken = (token: string): Promise<void> =>
  SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, token);

export const clearTokens = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.AUTH_TOKEN);
  await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
};

// ─── Axios instance ───────────────────────────────────────────────────────────

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Request interceptor — attach Bearer token ────────────────────────────────

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ─── Response interceptor — unwrap envelope & handle 401 ─────────────────────

/** Tracks whether a token refresh is already in progress to avoid loops. */
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => response,
  async (error: AxiosError<{ message?: string; code?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request until the refresh completes.
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post<ApiResponse<{ token: string; refreshToken: string }>>(
          `${BASE_URL}/auth/refresh`,
          { refreshToken },
        );

        const newToken = data.data.token;
        await setAuthToken(newToken);
        await setRefreshToken(data.data.refreshToken);

        onTokenRefreshed(newToken);
        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        return api(originalRequest);
      } catch {
        await clearTokens();
        return Promise.reject(
          new ApiError(401, "AUTH_EXPIRED", "Session expired. Please log in again."),
        );
      } finally {
        isRefreshing = false;
      }
    }

    // Map all other errors to ApiError.
    const status = error.response?.status ?? 0;
    const code = error.response?.data?.code ?? error.code ?? "UNKNOWN";
    const message =
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred";

    return Promise.reject(new ApiError(status, code, message, error));
  },
);

// ─── Convenience wrappers ─────────────────────────────────────────────────────

/** Unwraps the ApiResponse envelope and returns only the typed payload. */
async function unwrap<T>(promise: Promise<AxiosResponse<ApiResponse<T>>>): Promise<T> {
  const { data } = await promise;
  return data.data;
}

export const apiGet = <T>(url: string, params?: Record<string, unknown>): Promise<T> =>
  unwrap(api.get<ApiResponse<T>>(url, { params }));

export const apiPost = <T>(url: string, body?: unknown): Promise<T> =>
  unwrap(api.post<ApiResponse<T>>(url, body));

export const apiPut = <T>(url: string, body?: unknown): Promise<T> =>
  unwrap(api.put<ApiResponse<T>>(url, body));

export const apiPatch = <T>(url: string, body?: unknown): Promise<T> =>
  unwrap(api.patch<ApiResponse<T>>(url, body));

export const apiDelete = <T>(url: string): Promise<T> =>
  unwrap(api.delete<ApiResponse<T>>(url));
