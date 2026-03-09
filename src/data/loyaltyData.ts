export interface Transaction {
  id: number;
  store: string;
  description: string;
  amount: number;
  pointsEarned: number;
  date: string;
  icon: string;
  type: "earn" | "redeem" | "referral";
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
  category: string;
  terms: string[];
  popularity: number;
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  color: string;
  icon: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "earn" | "redeem" | "promo" | "referral";
  icon: string;
  timestamp: string;
  read: boolean;
}

export interface RewardCategory {
  id: string;
  label: string;
  icon: string;
}

export const transactions: Transaction[] = [
  { id: 1, store: "XYZ Store", description: "Electronics Purchase", amount: 4500, pointsEarned: 450, date: "2026-02-28", icon: "cart", type: "earn" },
  { id: 2, store: "XYZ Fashion", description: "Fashion & Apparel", amount: 2200, pointsEarned: 220, date: "2026-02-25", icon: "shirt", type: "earn" },
  { id: 3, store: "XYZ Store", description: "Shoes & Accessories", amount: 3800, pointsEarned: 380, date: "2026-02-20", icon: "footsteps", type: "earn" },
  { id: 4, store: "XYZ Grocery", description: "Grocery Shopping", amount: 1500, pointsEarned: 150, date: "2026-02-18", icon: "basket", type: "earn" },
  { id: 5, store: "XYZ Food", description: "Food Delivery", amount: 800, pointsEarned: 80, date: "2026-02-15", icon: "restaurant", type: "earn" },
  { id: 6, store: "XYZ Rewards", description: "Redeemed ₹50 Off Coupon", amount: 0, pointsEarned: -500, date: "2026-02-12", icon: "gift", type: "redeem" },
  { id: 7, store: "XYZ Home", description: "Home Decor Purchase", amount: 1200, pointsEarned: 120, date: "2026-02-10", icon: "home", type: "earn" },
  { id: 8, store: "XYZ Referral", description: "Friend joined via your code", amount: 0, pointsEarned: 200, date: "2026-02-08", icon: "people", type: "referral" },
  { id: 9, store: "XYZ Beauty", description: "Beauty & Personal Care", amount: 950, pointsEarned: 95, date: "2026-02-05", icon: "sparkles", type: "earn" },
  { id: 10, store: "XYZ Sports", description: "Sports Equipment", amount: 5200, pointsEarned: 520, date: "2026-02-02", icon: "fitness", type: "earn" },
  { id: 11, store: "XYZ Books", description: "Books & Stationery", amount: 600, pointsEarned: 60, date: "2026-01-30", icon: "book", type: "earn" },
  { id: 12, store: "XYZ Rewards", description: "Redeemed Free Delivery", amount: 0, pointsEarned: -300, date: "2026-01-28", icon: "bicycle", type: "redeem" },
  { id: 13, store: "XYZ Electronics", description: "Smart Watch Purchase", amount: 8500, pointsEarned: 850, date: "2026-01-25", icon: "watch", type: "earn" },
  { id: 14, store: "XYZ Referral", description: "Friend Priya joined via your code", amount: 0, pointsEarned: 200, date: "2026-01-22", icon: "people", type: "referral" },
  { id: 15, store: "XYZ Food", description: "Weekend Meal Deal", amount: 450, pointsEarned: 45, date: "2026-01-20", icon: "restaurant", type: "earn" },
  { id: 16, store: "XYZ Grocery", description: "Monthly Grocery Run", amount: 2800, pointsEarned: 280, date: "2026-01-18", icon: "basket", type: "earn" },
  { id: 17, store: "XYZ Rewards", description: "Redeemed 10% Discount", amount: 0, pointsEarned: -1000, date: "2026-01-15", icon: "gift", type: "redeem" },
  { id: 18, store: "XYZ Store", description: "Office Supplies", amount: 1100, pointsEarned: 110, date: "2026-01-12", icon: "briefcase", type: "earn" },
  { id: 19, store: "XYZ Fashion", description: "Winter Collection", amount: 3200, pointsEarned: 320, date: "2026-01-10", icon: "shirt", type: "earn" },
  { id: 20, store: "XYZ Referral", description: "Friend Amit joined via your code", amount: 0, pointsEarned: 200, date: "2026-01-08", icon: "people", type: "referral" },
];

export const loyaltyTiers: LoyaltyTier[] = [
  { name: "Bronze", minPoints: 0, color: "#CD7F32", icon: "shield-outline" },
  { name: "Silver", minPoints: 1000, color: "#94A3B8", icon: "shield-half-outline" },
  { name: "Gold", minPoints: 2500, color: "#F59E0B", icon: "shield" },
  { name: "Platinum", minPoints: 5000, color: "#8B5CF6", icon: "diamond" },
];

export const rewardCategories: RewardCategory[] = [
  { id: "all", label: "All", icon: "grid" },
  { id: "coupons", label: "Coupons", icon: "pricetag" },
  { id: "cashback", label: "Cashback", icon: "wallet" },
  { id: "delivery", label: "Delivery", icon: "bicycle" },
  { id: "exclusive", label: "Exclusive", icon: "diamond" },
];

export const rewards: Reward[] = [
  { id: 1, title: "₹50 Off Coupon", description: "Get ₹50 off on your next XYZ purchase above ₹500", pointsCost: 500, icon: "pricetag", category: "coupons", terms: ["Valid on XYZ orders above ₹500", "Cannot be combined with other offers", "Expires 30 days after redemption", "One use per customer"], popularity: 85 },
  { id: 2, title: "Free Delivery", description: "Free delivery on any XYZ order, no minimum value required", pointsCost: 300, icon: "bicycle", category: "delivery", terms: ["Valid on all XYZ delivery orders", "No minimum order value", "Expires 15 days after redemption", "Standard delivery only"], popularity: 92 },
  { id: 3, title: "₹200 Cashback", description: "Instant ₹200 cashback credited to your XYZ wallet", pointsCost: 2000, icon: "wallet", category: "cashback", terms: ["Cashback credited within 24 hours", "No minimum order value", "Valid for XYZ wallet balance only", "Non-transferable"], popularity: 78 },
  { id: 4, title: "10% Discount", description: "10% off on your next XYZ order (max ₹500 discount)", pointsCost: 1000, icon: "gift", category: "coupons", terms: ["Maximum discount of ₹500", "Valid on all XYZ categories", "Expires 30 days after redemption", "One use per customer"], popularity: 88 },
  { id: 5, title: "₹100 Cashback", description: "₹100 cashback on XYZ orders above ₹300", pointsCost: 800, icon: "cash", category: "cashback", terms: ["Valid on XYZ orders above ₹300", "Cashback credited within 48 hours", "Expires 20 days after redemption"], popularity: 80 },
  { id: 6, title: "Priority Delivery", description: "Get your XYZ order delivered within 2 hours", pointsCost: 600, icon: "flash", category: "delivery", terms: ["Subject to availability in your area", "Valid for orders placed by 6 PM", "Expires 7 days after redemption"], popularity: 70 },
  { id: 7, title: "Exclusive Bundle Deal", description: "Access to exclusive XYZ bundle pricing on premium products", pointsCost: 3000, icon: "diamond", category: "exclusive", terms: ["Gold tier and above only", "Limited stock available", "Expires 14 days after redemption", "Cannot be combined with other offers"], popularity: 65 },
  { id: 8, title: "₹500 Shopping Voucher", description: "₹500 voucher usable across all XYZ product categories", pointsCost: 4500, icon: "card", category: "exclusive", terms: ["Valid across all XYZ categories", "Non-refundable", "Expires 60 days after redemption", "Platinum tier exclusive"], popularity: 95 },
  { id: 9, title: "Double Points Weekend", description: "Earn 2x points on all XYZ purchases this weekend", pointsCost: 400, icon: "star", category: "coupons", terms: ["Valid on weekends only", "Maximum 1000 bonus points", "Cannot be combined"], popularity: 90 },
  { id: 10, title: "₹300 Grocery Voucher", description: "₹300 off on your next XYZ Grocery order above ₹800", pointsCost: 2500, icon: "basket", category: "cashback", terms: ["Valid on XYZ Grocery only", "Minimum order ₹800", "Expires 30 days after redemption"], popularity: 75 },
  { id: 11, title: "Express Delivery Pass", description: "30-day express delivery on all XYZ orders", pointsCost: 1500, icon: "flash", category: "delivery", terms: ["Valid for 30 days", "Express delivery only", "Subject to pin code availability"], popularity: 82 },
  { id: 12, title: "VIP Customer Badge", description: "Get exclusive VIP status and early access to XYZ sales", pointsCost: 5000, icon: "ribbon", category: "exclusive", terms: ["Platinum tier exclusive", "Valid for 90 days", "Includes early sale access"], popularity: 60 },
];

export const notifications: Notification[] = [
  { id: 1, title: "Points Earned! 🎉", message: "You earned 450 points from your XYZ Store purchase", type: "earn", icon: "star", timestamp: "2026-02-28T14:30:00", read: false },
  { id: 2, title: "Reward Redeemed ✅", message: "₹50 Off Coupon has been activated. Use it within 30 days!", type: "redeem", icon: "checkmark-circle", timestamp: "2026-02-27T10:15:00", read: false },
  { id: 3, title: "Tier Upgrade! 🏆", message: "Congratulations! You've reached Silver tier on XYZ", type: "promo", icon: "trophy", timestamp: "2026-02-25T09:00:00", read: true },
  { id: 4, title: "Weekend Bonus! 🔥", message: "Earn 2x points on all XYZ purchases this weekend", type: "promo", icon: "flame", timestamp: "2026-02-22T08:00:00", read: true },
  { id: 5, title: "Referral Success! 🤝", message: "Your friend Rahul joined XYZ! You earned 200 bonus points", type: "referral", icon: "people", timestamp: "2026-02-20T16:45:00", read: true },
  { id: 6, title: "New Rewards Available! 🎁", message: "Check out 3 new exclusive XYZ rewards added to the catalog", type: "promo", icon: "gift", timestamp: "2026-02-18T11:30:00", read: true },
  { id: 7, title: "Points Expiry Reminder ⏰", message: "150 points will expire in 7 days. Redeem them now!", type: "earn", icon: "time", timestamp: "2026-02-15T09:00:00", read: true },
  { id: 8, title: "Flash Sale Alert! ⚡", message: "Earn 3x points on Electronics at XYZ Store for next 2 hours!", type: "promo", icon: "flash", timestamp: "2026-02-10T12:00:00", read: true },
];

export const referralData = {
  referralCode: "XYZ2026",
  totalReferrals: 5,
  pendingReferrals: 2,
  pointsPerReferral: 200,
  totalPointsEarned: 1000,
  referralHistory: [
    { id: 1, name: "Rahul S.", date: "2026-02-08", status: "completed", pointsEarned: 200 },
    { id: 2, name: "Priya M.", date: "2026-02-10", status: "completed", pointsEarned: 200 },
    { id: 3, name: "Amit K.", date: "2026-02-14", status: "completed", pointsEarned: 200 },
    { id: 4, name: "Sneha R.", date: "2026-02-20", status: "pending", pointsEarned: 0 },
    { id: 5, name: "Vikram J.", date: "2026-02-25", status: "pending", pointsEarned: 0 },
  ],
};
