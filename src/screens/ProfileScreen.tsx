import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Header from "../components/Header";
import { loyaltyTiers } from "../data/loyaltyData";
import { getCurrentTier, getTransactionStats } from "../services/loyaltyService";
import { useStore } from "../store/useStore";
import { clearStoredState } from "../services/storageService";

export default function ProfileScreen() {
  const rewardPoints = useStore((s) => s.state.rewardPoints);
  const user = useStore((s) => s.state.user);
  const logout = useStore((s) => s.logout);

  const currentTier = getCurrentTier(rewardPoints);
  const stats = getTransactionStats();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout", style: "destructive", onPress: async () => {
          await clearStoredState();
          logout();
        }
      },
    ]);
  };

  const menuItems = [
    { icon: "person-outline" as const, label: "Edit Profile", color: "#2563eb" },
    { icon: "shield-checkmark-outline" as const, label: "Privacy & Security", color: "#10b981" },
    { icon: "notifications-outline" as const, label: "Notifications", color: "#f59e0b" },
    { icon: "help-circle-outline" as const, label: "Help & Support", color: "#8b5cf6" },
    { icon: "document-text-outline" as const, label: "Terms & Conditions", color: "#6b7280" },
  ];

  return (
    <View style={styles.screen}>
      <Header title="My Profile" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar Card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name ?? "U").charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user?.name ?? "Guest"}</Text>
          <Text style={styles.username}>@{user?.username ?? "guest"}</Text>
          <View style={[styles.tierBadge, { backgroundColor: currentTier.color + "22" }]}>
            <Ionicons name={currentTier.icon as any} size={18} color={currentTier.color} />
            <Text style={[styles.tierText, { color: currentTier.color }]}>{currentTier.name} Member</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { icon: "star" as const, color: "#f59e0b", value: rewardPoints, label: "Points Balance" },
            { icon: "trending-up" as const, color: "#10b981", value: stats.totalPointsEarned, label: "Points Earned" },
            { icon: "receipt" as const, color: "#2563eb", value: stats.totalTransactions, label: "Orders" },
            { icon: "cash" as const, color: "#8b5cf6", value: `₹${stats.totalSpent.toLocaleString()}`, label: "Total Spent" },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Ionicons name={s.icon} size={22} color={s.color} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Loyalty Tiers */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Loyalty Tiers</Text>
          {loyaltyTiers.map((tier) => (
            <View key={tier.name} style={[styles.tierRow, tier.name === currentTier.name && { backgroundColor: tier.color + "11" }]}>
              <Ionicons name={tier.icon as any} size={22} color={tier.color} />
              <View style={styles.tierInfo}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierMin}>{tier.minPoints.toLocaleString()}+ pts</Text>
              </View>
              {tier.name === currentTier.name && (
                <View style={[styles.currentBadge, { backgroundColor: tier.color }]}>
                  <Text style={styles.currentBadgeText}>Current</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.sectionCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={item.label} style={[styles.menuRow, i < menuItems.length - 1 && styles.menuDivider]} activeOpacity={0.7}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + "15" }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: theme.spacing.xl, paddingBottom: 40 },
  avatarCard: { backgroundColor: theme.colors.card, borderRadius: 24, padding: 28, alignItems: "center", marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 4 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center", marginBottom: 14 },
  avatarText: { color: theme.colors.white, fontSize: theme.fontSize.xxl, fontWeight: "700" },
  name: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text },
  username: { fontSize: theme.fontSize.sm, color: theme.colors.muted, marginBottom: 14 },
  tierBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, borderRadius: theme.radius.full, gap: 6 },
  tierText: { fontSize: theme.fontSize.sm, fontWeight: "700" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  statCard: { width: "48%", flexGrow: 1, backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 16, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  statValue: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text, marginTop: 6 },
  statLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 2 },
  sectionCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.text, marginBottom: 16 },
  tierRow: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: theme.radius.md, marginBottom: 8 },
  tierInfo: { flex: 1, marginLeft: 12 },
  tierName: { fontSize: theme.fontSize.base, fontWeight: "600", color: theme.colors.text },
  tierMin: { fontSize: theme.fontSize.xs, color: theme.colors.muted },
  currentBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: theme.radius.full },
  currentBadgeText: { fontSize: theme.fontSize.xs, fontWeight: "700", color: theme.colors.white },
  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  menuDivider: { borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight },
  menuIcon: { width: 36, height: 36, borderRadius: theme.radius.sm, alignItems: "center", justifyContent: "center", marginRight: 12 },
  menuLabel: { flex: 1, fontSize: theme.fontSize.base, color: theme.colors.text },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: theme.colors.redBg, borderRadius: theme.radius.lg, padding: 16, marginTop: 4 },
  logoutText: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.red },
}));
