import { rewards, rewardCategories, Reward, RewardCategory } from "../data/loyaltyData";

export const getRewardCategories = (): RewardCategory[] => rewardCategories;

export const getRewardsByCategory = (categoryId = "all"): Reward[] => {
  if (categoryId === "all") return rewards;
  return rewards.filter((r) => r.category === categoryId);
};

export const getRewardById = (rewardId: number): Reward | null =>
  rewards.find((r) => r.id === rewardId) || null;

export const canRedeem = (userPoints: number, costPoints: number): boolean => userPoints >= costPoints;

export const processRedemption = (
  userPoints: number,
  reward: Reward,
): { success: boolean; newBalance?: number; message?: string; error?: string } => {
  if (!reward) return { success: false, error: "Reward not found" };
  if (!canRedeem(userPoints, reward.pointsCost)) {
    return { success: false, error: `You need ${reward.pointsCost - userPoints} more points` };
  }
  return { success: true, newBalance: userPoints - reward.pointsCost, message: `${reward.title} redeemed successfully!` };
};

export const getPopularRewards = (limit = 4): Reward[] =>
  [...rewards].sort((a, b) => b.popularity - a.popularity).slice(0, limit);

export const searchRewards = (query: string): Reward[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return rewards;
  return rewards.filter(
    (r) => r.title.toLowerCase().includes(lowerQuery) || r.description.toLowerCase().includes(lowerQuery),
  );
};
