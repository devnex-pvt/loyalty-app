/**
 * api/loyaltyApi.ts
 * Loyalty points, tiers, and transaction history endpoints.
 */

import { apiGet, apiPost } from "../services/apiService";

// ─── Shapes ───────────────────────────────────────────────────────────────────

export interface ApiLoyaltyTier {
  name: string;
  minPoints: number;
  color: string;
  icon: string;
  benefits: string[];
}

export interface ApiTransaction {
  id: number;
  store: string;
  description: string;
  amount: number;
  pointsEarned: number;
  date: string;
  type: "earn" | "redeem" | "referral";
  icon: string;
}

export interface LoyaltyProfile {
  rewardPoints: number;
  currentTier: ApiLoyaltyTier;
  nextTier: ApiLoyaltyTier | null;
  progressToNextTier: number; // 0–100
  pointsToNextTier: number;
  totalEarned: number;
  totalRedeemed: number;
}

export interface TransactionStats {
  totalTransactions: number;
  totalSpent: number;
  totalPointsEarned: number;
}

// ─── API calls ────────────────────────────────────────────────────────────────

/** GET /loyalty/profile — full loyalty profile for the authenticated user. */
export const getLoyaltyProfileApi = (): Promise<LoyaltyProfile> =>
  apiGet<LoyaltyProfile>("/loyalty/profile");

/** GET /loyalty/tiers — list of all available loyalty tiers. */
export const getLoyaltyTiersApi = (): Promise<ApiLoyaltyTier[]> =>
  apiGet<ApiLoyaltyTier[]>("/loyalty/tiers");

/** GET /loyalty/transactions — paginated transaction history. */
export const getTransactionsApi = (params?: {
  page?: number;
  limit?: number;
  type?: "earn" | "redeem" | "referral" | "all";
}): Promise<{ items: ApiTransaction[]; total: number; page: number; limit: number }> =>
  apiGet("/loyalty/transactions", params as Record<string, unknown>);

/** GET /loyalty/stats — aggregated stats for the authenticated user. */
export const getTransactionStatsApi = (): Promise<TransactionStats> =>
  apiGet<TransactionStats>("/loyalty/stats");

/** POST /loyalty/earn — manually award points (e.g. after a purchase). */
export const earnPointsApi = (payload: {
  amount: number;
  store: string;
  description: string;
}): Promise<{ pointsEarned: number; newBalance: number }> =>
  apiPost("/loyalty/earn", payload);
