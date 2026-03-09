import { loyaltyTiers, transactions, LoyaltyTier } from "../data/loyaltyData";

export const getCurrentTier = (rewardPoints: number): LoyaltyTier => {
  return [...loyaltyTiers].reverse().find((tier) => rewardPoints >= tier.minPoints) || loyaltyTiers[0];
};

export const getNextTier = (rewardPoints: number): LoyaltyTier | null => {
  const currentTier = getCurrentTier(rewardPoints);
  const currentTierIndex = loyaltyTiers.findIndex((t) => t.name === currentTier.name);
  return loyaltyTiers[currentTierIndex + 1] || null;
};

export const getProgressToNextTier = (rewardPoints: number): number => {
  const currentTier = getCurrentTier(rewardPoints);
  const nextTier = getNextTier(rewardPoints);
  if (!nextTier) return 100;
  return ((rewardPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
};

export const getPointsToNextTier = (rewardPoints: number): number => {
  const nextTier = getNextTier(rewardPoints);
  if (!nextTier) return 0;
  return nextTier.minPoints - rewardPoints;
};

export const getTransactionStats = () => ({
  totalTransactions: transactions.length,
  totalSpent: transactions.reduce((sum, t) => sum + t.amount, 0),
  totalPointsEarned: transactions.filter((t) => t.pointsEarned > 0).reduce((sum, t) => sum + t.pointsEarned, 0),
});

export const canRedeemReward = (userPoints: number, pointsCost: number): boolean => userPoints >= pointsCost;
