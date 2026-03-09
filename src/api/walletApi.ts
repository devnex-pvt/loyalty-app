/**
 * api/walletApi.ts
 * Wallet balance and transaction history endpoints.
 */

import { apiGet } from "../services/apiService";

// ─── Shapes ───────────────────────────────────────────────────────────────────

export interface WalletSummary {
  currentBalance: number;
  totalEarned: number;
  totalRedeemed: number;
  totalTransactions: number;
}

export interface ApiWalletTransaction {
  id: number;
  store: string;
  description: string;
  amount: number;
  pointsEarned: number;
  date: string;
  type: "earn" | "redeem" | "referral";
  icon: string;
}

export type TransactionFilterType = "all" | "earn" | "redeem" | "referral";

// ─── API calls ────────────────────────────────────────────────────────────────

/** GET /wallet/summary — current balance and aggregate stats. */
export const getWalletSummaryApi = (): Promise<WalletSummary> =>
  apiGet<WalletSummary>("/wallet/summary");

/** GET /wallet/transactions — paginated, filterable transaction list. */
export const getWalletTransactionsApi = (params?: {
  type?: TransactionFilterType;
  page?: number;
  limit?: number;
}): Promise<{ items: ApiWalletTransaction[]; total: number; page: number; limit: number }> =>
  apiGet("/wallet/transactions", params as Record<string, unknown>);
