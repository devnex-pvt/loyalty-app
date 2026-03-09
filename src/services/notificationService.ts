import { Notification, notifications as initialNotifications } from "../data/loyaltyData";

let notificationsState: Notification[] = [...initialNotifications];

export const getAllNotifications = (): Notification[] =>
  [...notificationsState].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export const getUnreadCount = (): number =>
  notificationsState.filter((n) => !n.read).length;

export const markAsRead = (notificationId: number): Notification[] => {
  notificationsState = notificationsState.map((n) =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  return getAllNotifications();
};

export const markAllAsRead = (): Notification[] => {
  notificationsState = notificationsState.map((n) => ({ ...n, read: true }));
  return getAllNotifications();
};

export const getNotificationColor = (type: Notification["type"]): string => {
  const colors: Record<string, string> = {
    earn: "#10B981",
    redeem: "#2563EB",
    promo: "#F59E0B",
    referral: "#8B5CF6",
  };
  return colors[type] ?? "#6B7280";
};

export const formatNotificationTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};
