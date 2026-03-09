import { transactions, Transaction } from "../data/loyaltyData";

export const getAllTransactions = (): Transaction[] =>
  [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getTransactionsByType = (type = "all"): Transaction[] => {
  const sorted = getAllTransactions();
  if (type === "all") return sorted;
  return sorted.filter((t) => t.type === type);
};

export const getWalletSummary = (currentBalance: number) => ({
  currentBalance,
  totalEarned: transactions.filter((t) => t.pointsEarned > 0).reduce((sum, t) => sum + t.pointsEarned, 0),
  totalRedeemed: transactions.filter((t) => t.pointsEarned < 0).reduce((sum, t) => sum + Math.abs(t.pointsEarned), 0),
  totalTransactions: transactions.length,
});

export const formatTransactionDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
};

export const getTransactionColor = (type: string): string => {
  const colors: Record<string, string> = { earn: "#10B981", redeem: "#EF4444", referral: "#8B5CF6" };
  return colors[type] || "#6B7280";
};
