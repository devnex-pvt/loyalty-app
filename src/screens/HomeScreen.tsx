import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { router } from "expo-router";
import Header from "../components/Header";
import { transactions } from "../data/loyaltyData";
import { canRedeemReward, getCurrentTier, getNextTier, getPointsToNextTier, getProgressToNextTier, getTransactionStats } from "../services/loyaltyService";
import { getPopularRewards } from "../services/rewardsService";
import { useStore } from "../store/useStore";

export default function HomeScreen() {
  const rewardPoints = useStore((s) => s.state.rewardPoints);
  const user = useStore((s) => s.state.user);
  const unreadCount = useStore((s) => s.state.unreadCount);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const currentTier = getCurrentTier(rewardPoints);
  const nextTier = getNextTier(rewardPoints);
  const progressToNext = getProgressToNextTier(rewardPoints);
  const pointsToNext = getPointsToNextTier(rewardPoints);
  const stats = getTransactionStats();
  const popularRewards = getPopularRewards(4);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const renderTransaction = ({ item }: { item: (typeof transactions)[0] }) => (
    <View style={styles.txCard}>
      <View style={styles.txIcon}>
        <Ionicons name={item.icon as any} size={20} color="#2563eb" />
      </View>
      <View style={styles.txInfo}>
        <Text style={styles.txStore}>{item.store}</Text>
        <Text style={styles.txDesc}>{item.description}</Text>
        <Text style={styles.txDate}>{item.date}</Text>
      </View>
      <View style={styles.txRight}>
        {item.amount > 0 && <Text style={styles.txAmount}>₹{item.amount}</Text>}
        <Text style={[styles.txPoints, item.pointsEarned > 0 ? styles.txPointsPositive : styles.txPointsNegative]}>
          {item.pointsEarned > 0 ? "+" : ""}{item.pointsEarned} pts
        </Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      {/* Points Card */}
      <View style={styles.pointsCard}>
        <View style={styles.pointsTop}>
          <View style={styles.pointsLeft}>
            <Text style={styles.helloText}>Hello, {user?.name ?? "User"}! 👋</Text>
            <Text style={styles.dashboardText}>Welcome to your loyalty dashboard</Text>
          </View>
          <View style={[styles.tierBadge, { backgroundColor: currentTier.color + "22" }]}>
            <Ionicons name={currentTier.icon as any} size={16} color={currentTier.color} />
            <Text style={[styles.tierName, { color: currentTier.color }]}>{currentTier.name}</Text>
          </View>
        </View>
        <View style={styles.pointsCenter}>
          <Text style={styles.totalPtsLabel}>TOTAL POINTS</Text>
          <Text style={styles.pointsValue}>{rewardPoints.toLocaleString()}</Text>
        </View>
        {nextTier && (
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.min(progressToNext, 100)}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{pointsToNext} pts to {nextTier.name}</Text>
          </View>
        )}
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[
          { icon: "trending-up" as const, color: "#10b981", value: stats.totalTransactions, label: "Transactions" },
          { icon: "cart" as const, color: "#2563eb", value: `₹${stats.totalSpent.toLocaleString()}`, label: "Total Spent" },
          { icon: "star" as const, color: "#f59e0b", value: stats.totalPointsEarned, label: "Pts Earned" },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Ionicons name={stat.icon} size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Popular Rewards */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎁 Popular Rewards</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/rewards")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={popularRewards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.rewardCard}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: "/reward-details", params: { rewardId: item.id } })}
          >
            <View style={styles.rewardIcon}>
              <Ionicons name={item.icon as any} size={24} color="#2563eb" />
            </View>
            <Text style={styles.rewardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.rewardDesc} numberOfLines={2}>{item.description}</Text>
            <View style={[styles.redeemBtn, !canRedeemReward(rewardPoints, item.pointsCost) && styles.redeemBtnDisabled]}>
              <Text style={[styles.redeemBtnText, !canRedeemReward(rewardPoints, item.pointsCost) && styles.redeemBtnTextDisabled]}>
                {item.pointsCost} pts
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 8 }}
      />

      {/* Recent Activity Header */}
      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={styles.sectionTitle}>📋 Recent Activity</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/wallet")}>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.screen}>
      <Header title="Loyalty Rewards" rightIcon="notifications-outline" rightBadge={unreadCount} onRightPress={() => router.push("/notifications")} />
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  listContent: { padding: theme.spacing.xl, paddingBottom: 40 },
  // Points card
  pointsCard: { backgroundColor: theme.colors.card, borderRadius: 24, padding: theme.spacing.xxl, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 5 },
  pointsTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  pointsLeft: { flex: 1 },
  helloText: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text },
  dashboardText: { fontSize: theme.fontSize.sm, color: theme.colors.muted, marginTop: 4 },
  tierBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: theme.radius.full, marginLeft: 8 },
  tierName: { fontSize: theme.fontSize.sm, fontWeight: "700", marginLeft: 4 },
  pointsCenter: { alignItems: "center", marginBottom: 16 },
  totalPtsLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, letterSpacing: 2, marginBottom: 4 },
  pointsValue: { fontSize: theme.fontSize.xxxl, fontWeight: "700", color: theme.colors.primary },
  progressSection: { marginTop: 4 },
  progressTrack: { height: 8, backgroundColor: theme.colors.gray200, borderRadius: 4, overflow: "hidden" },
  progressFill: { height: 8, backgroundColor: theme.colors.primary, borderRadius: 4 },
  progressLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 6, textAlign: "center" },
  // Stats
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 14, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statValue: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.text, marginTop: 6 },
  statLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 2 },
  // Section
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text },
  seeAll: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.primary },
  // Reward cards
  rewardCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, width: 160, marginRight: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  rewardIcon: { width: 44, height: 44, borderRadius: theme.radius.md, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  rewardTitle: { fontSize: theme.fontSize.sm, fontWeight: "700", color: theme.colors.text, marginBottom: 4 },
  rewardDesc: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginBottom: 12, lineHeight: 16 },
  redeemBtn: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.sm, paddingVertical: 8, alignItems: "center" },
  redeemBtnDisabled: { backgroundColor: theme.colors.gray200 },
  redeemBtnText: { fontSize: theme.fontSize.xs, fontWeight: "700", color: theme.colors.white },
  redeemBtnTextDisabled: { color: theme.colors.gray400 },
  // Transaction card
  txCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: 10, flexDirection: "row", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  txIcon: { width: 40, height: 40, borderRadius: theme.radius.md, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginRight: 12 },
  txInfo: { flex: 1 },
  txStore: { fontSize: theme.fontSize.base, fontWeight: "600", color: theme.colors.text },
  txDesc: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 2 },
  txDate: { fontSize: theme.fontSize.xs, color: theme.colors.gray400, marginTop: 2 },
  txRight: { alignItems: "flex-end" },
  txAmount: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.text },
  txPoints: { fontSize: theme.fontSize.xs, fontWeight: "600", marginTop: 2 },
  txPointsPositive: { color: "#10b981" },
  txPointsNegative: { color: theme.colors.red },
}));
