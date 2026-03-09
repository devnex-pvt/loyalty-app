/**
 * api/rewardsApi.ts
 * Rewards catalogue and redemption endpoints.
 */

import { apiGet, apiPost } from "../services/apiService";

// ─── Shapes ───────────────────────────────────────────────────────────────────

export interface ApiRewardCategory {
  id: string;
  label: string;
}

export interface ApiReward {
  id: number;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  icon: string;
  popularity: number;
  available: boolean;
  expiresAt?: string; // ISO date string
}

export interface RedemptionResult {
  success: boolean;
  newBalance: number;
  transactionId: string;
  message: string;
  redemptionCode?: string;
}

export interface RewardsListParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "popularity" | "pointsCost" | "title";
  order?: "asc" | "desc";
}

// ─── API calls ────────────────────────────────────────────────────────────────

/** GET /rewards — paginated rewards catalogue with optional filters. */
export const getRewardsApi = (params?: RewardsListParams): Promise<{
  items: ApiReward[];
  total: number;
  page: number;
  limit: number;
}> => apiGet("/rewards", params as Record<string, unknown>);

/** GET /rewards/categories — list of all reward categories. */
export const getRewardCategoriesApi = (): Promise<ApiRewardCategory[]> =>
  apiGet<ApiRewardCategory[]>("/rewards/categories");

/** GET /rewards/:id — single reward detail. */
export const getRewardByIdApi = (id: number): Promise<ApiReward> =>
  apiGet<ApiReward>(`/rewards/${id}`);

/** GET /rewards/popular?limit=n — top-n most popular rewards. */
export const getPopularRewardsApi = (limit = 4): Promise<ApiReward[]> =>
  apiGet<ApiReward[]>("/rewards/popular", { limit });

/** POST /rewards/:id/redeem — redeem a reward for the authenticated user. */
export const redeemRewardApi = (rewardId: number): Promise<RedemptionResult> =>
  apiPost<RedemptionResult>(`/rewards/${rewardId}/redeem`);
