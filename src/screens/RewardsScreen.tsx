import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Badge from "../components/Badge";
import Header from "../components/Header";
import { canRedeem, getRewardCategories, getRewardsByCategory } from "../services/rewardsService";
import { useStore } from "../store/useStore";
import { router } from "expo-router";
import { Reward } from "../data/loyaltyData";

export default function RewardsScreen() {
  const rewardPoints = useStore((s) => s.state.rewardPoints);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = getRewardCategories();
  const filteredRewards = getRewardsByCategory(activeCategory);

  const renderReward = ({ item }: { item: Reward }) => {
    const redeemable = canRedeem(rewardPoints, item.pointsCost);
    return (
      <TouchableOpacity
        style={styles.rewardRow}
        activeOpacity={0.7}
        onPress={() => router.push({ pathname: "/reward-details", params: { rewardId: item.id } })}
      >
        <View style={styles.rewardRowLeft}>
          <View style={styles.rewardIcon}>
            <Ionicons name={item.icon as any} size={24} color="#2563eb" />
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardTitle}>{item.title}</Text>
            <Text style={styles.rewardDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.rewardMeta}>
              <Badge label={item.category} variant="info" />
              <View style={styles.popularRow}>
                <Ionicons name="flame" size={12} color="#F59E0B" />
                <Text style={styles.popularText}>{item.popularity}%</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rewardRight}>
          <View style={[styles.ptsBox, !redeemable && styles.ptsBoxDisabled]}>
            <Text style={[styles.ptsValue, !redeemable && styles.ptsValueDisabled]}>{item.pointsCost}</Text>
            <Text style={[styles.ptsSuffix, !redeemable && styles.ptsValueDisabled]}>pts</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" style={{ marginTop: 8 }} />
        </View>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => (
    <View style={styles.filterWrap}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterBtn, activeCategory === item.id && styles.filterBtnActive]}
            onPress={() => setActiveCategory(item.id)}
          >
            <Text style={[styles.filterText, activeCategory === item.id && styles.filterTextActive]}>
              {item.icon} {item.label}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header title="Rewards" subtitle={`${rewardPoints.toLocaleString()} pts available`} />
      <FlatList
        data={filteredRewards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReward}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  list: { padding: theme.spacing.xl, paddingBottom: 40 },
  filterWrap: { marginBottom: theme.spacing.lg, marginHorizontal: -theme.spacing.xl },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: theme.radius.full, backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border },
  filterBtnActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  filterText: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.muted },
  filterTextActive: { color: theme.colors.white },
  rewardRow: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  rewardRowLeft: { flexDirection: "row", flex: 1, alignItems: "flex-start" },
  rewardIcon: { width: 48, height: 48, borderRadius: theme.radius.lg, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginRight: 12 },
  rewardInfo: { flex: 1 },
  rewardTitle: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.text, marginBottom: 4 },
  rewardDesc: { fontSize: theme.fontSize.xs, color: theme.colors.muted, lineHeight: 18, marginBottom: 8 },
  rewardMeta: { flexDirection: "row", alignItems: "center", gap: 10 },
  popularRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  popularText: { fontSize: theme.fontSize.xs, color: theme.colors.amber, fontWeight: "600" },
  rewardRight: { alignItems: "center", marginLeft: 12 },
  ptsBox: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: theme.radius.md, backgroundColor: theme.colors.primary, alignItems: "center" },
  ptsBoxDisabled: { backgroundColor: theme.colors.gray200 },
  ptsValue: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.white },
  ptsValueDisabled: { color: theme.colors.gray400 },
  ptsSuffix: { fontSize: 10, fontWeight: "600", color: theme.colors.white },
}));
