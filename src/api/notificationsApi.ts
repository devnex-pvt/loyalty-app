/**
 * api/notificationsApi.ts
 * Push notification and in-app notification endpoints.
 */

import { apiGet, apiPatch, apiPost } from "../services/apiService";

// ─── Shapes ───────────────────────────────────────────────────────────────────

export type NotificationType = "earn" | "redeem" | "promo" | "referral";

export interface ApiNotification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  icon: string;
  read: boolean;
  timestamp: string; // ISO date-time
}

// ─── API calls ────────────────────────────────────────────────────────────────

/** GET /notifications — full list of notifications for the authenticated user. */
export const getNotificationsApi = (params?: {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
}): Promise<{ items: ApiNotification[]; unreadCount: number; total: number }> =>
  apiGet("/notifications", params as Record<string, unknown>);

/** PATCH /notifications/:id/read — mark a single notification as read. */
export const markNotificationReadApi = (id: number): Promise<ApiNotification> =>
  apiPatch<ApiNotification>(`/notifications/${id}/read`);

/** POST /notifications/read-all — mark all notifications as read. */
export const markAllNotificationsReadApi = (): Promise<{ updatedCount: number }> =>
  apiPost<{ updatedCount: number }>("/notifications/read-all");

/** POST /notifications/push-token — register an Expo push token. */
export const registerPushTokenApi = (expoPushToken: string): Promise<{ registered: boolean }> =>
  apiPost<{ registered: boolean }>("/notifications/push-token", { expoPushToken });
