/**
 * api/referralApi.ts
 * Referral programme endpoints.
 */

import { apiGet, apiPost } from "../services/apiService";

// ─── Shapes ───────────────────────────────────────────────────────────────────

export type ReferralStatus = "pending" | "completed" | "expired";

export interface ApiReferral {
  id: string;
  name: string;
  date: string; // ISO date string
  status: ReferralStatus;
  pointsAwarded: number;
}

export interface ReferralStats {
  referralCode: string;
  total: number;
  completed: number;
  pending: number;
  pointsEarned: number;
  pointsPerReferral: number;
}

// ─── API calls ────────────────────────────────────────────────────────────────

/** GET /referrals/stats — code, totals and points summary. */
export const getReferralStatsApi = (): Promise<ReferralStats> =>
  apiGet<ReferralStats>("/referrals/stats");

/** GET /referrals/history — paginated list of individual referrals. */
export const getReferralHistoryApi = (params?: {
  page?: number;
  limit?: number;
  status?: ReferralStatus;
}): Promise<{ items: ApiReferral[]; total: number }> =>
  apiGet("/referrals/history", params as Record<string, unknown>);

/**
 * POST /referrals/validate — validate a referral code before the user signs up.
 * Returns whether the code is valid and how many bonus points it awards.
 */
export const validateReferralCodeApi = (code: string): Promise<{
  valid: boolean;
  bonusPoints: number;
  ownerName?: string;
}> => apiPost("/referrals/validate", { code });

/**
 * POST /referrals/apply — apply a referral code during or after registration.
 * Awards points to both the referrer and the new user.
 */
export const applyReferralCodeApi = (code: string): Promise<{
  success: boolean;
  pointsAwarded: number;
  message: string;
}> => apiPost("/referrals/apply", { code });
