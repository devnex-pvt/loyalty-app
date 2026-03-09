import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import EmptyState from "../components/EmptyState";
import {
  formatNotificationTime, getAllNotifications, getNotificationColor,
  getUnreadCount, markAllAsRead, markAsRead,
} from "../services/notificationService";
import { useStore } from "../store/useStore";
import { Notification } from "../data/loyaltyData";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const setUnreadCount = useStore((s) => s.setUnreadCount);
  const [notifications, setNotifications] = useState(getAllNotifications());

  const handleMarkAsRead = (id: number) => {
    const updated = markAsRead(id);
    setNotifications(updated);
    setUnreadCount(getUnreadCount());
  };

  const handleMarkAllRead = () => {
    const updated = markAllAsRead();
    setNotifications(updated);
    setUnreadCount(0);
  };

  const renderNotification = ({ item }: { item: Notification }) => {
    const color = getNotificationColor(item.type);
    return (
      <TouchableOpacity
        style={[styles.notifCard, !item.read && styles.notifUnread]}
        onPress={() => handleMarkAsRead(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.notifIcon, { backgroundColor: color + "15" }]}>
          <Ionicons name={item.icon as any} size={22} color={color} />
        </View>
        <View style={styles.notifContent}>
          <View style={styles.notifTitleRow}>
            <Text style={styles.notifTitle} numberOfLines={1}>{item.title}</Text>
            {!item.read && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notifMessage} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.notifTime}>{formatNotificationTime(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllRead}>
          <Text style={styles.markAll}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
        ListEmptyComponent={<EmptyState icon="notifications-off-outline" title="No Notifications" subtitle="You're all caught up!" />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: theme.spacing.lg, paddingBottom: 12, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight },
  backBtn: { width: 40, height: 40, borderRadius: theme.radius.md, backgroundColor: theme.colors.borderLight, alignItems: "center", justifyContent: "center" },
  topTitle: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text },
  markAll: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.primary },
  list: { padding: theme.spacing.xl, paddingBottom: 40 },
  notifCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: 10, flexDirection: "row", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  notifUnread: { borderLeftWidth: 4, borderLeftColor: theme.colors.primary },
  notifIcon: { width: 44, height: 44, borderRadius: theme.radius.md, alignItems: "center", justifyContent: "center", marginRight: 12 },
  notifContent: { flex: 1 },
  notifTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 },
  notifTitle: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.text, flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.primary, marginLeft: 8 },
  notifMessage: { fontSize: theme.fontSize.sm, color: theme.colors.muted, lineHeight: 20, marginBottom: 6 },
  notifTime: { fontSize: theme.fontSize.xs, color: theme.colors.gray400 },
}));
