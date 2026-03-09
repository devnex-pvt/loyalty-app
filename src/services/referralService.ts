import { referralData } from "../data/loyaltyData";

export const getReferralCode = (): string => referralData.referralCode;

export const getReferralStats = () => {
  const completed = referralData.referralHistory.filter((r) => r.status === "completed").length;
  const pending = referralData.referralHistory.filter((r) => r.status === "pending").length;
  return {
    total: referralData.totalReferrals,
    pending,
    completed,
    pointsEarned: referralData.totalPointsEarned,
    pointsPerReferral: referralData.pointsPerReferral,
  };
};

export const getReferralHistory = () =>
  [...referralData.referralHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const getShareMessage = (code: string): string =>
  `Hey! Join XYZ Rewards app using my referral code: ${code} and earn 200 bonus points! 🎁`;

export interface ShareChannel {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const getShareChannels = (): ShareChannel[] => [
  { id: "whatsapp", label: "WhatsApp", icon: "logo-whatsapp", color: "#25D366" },
  { id: "telegram", label: "Telegram", icon: "paper-plane", color: "#0088CC" },
  { id: "sms", label: "SMS", icon: "chatbubble", color: "#34C759" },
  { id: "copy", label: "Copy Link", icon: "copy", color: "#8B5CF6" },
];

export const formatReferralDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
};
