import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Badge from "../components/Badge";
import Button from "../components/Button";
import { canRedeem, getRewardById, processRedemption } from "../services/rewardsService";
import { useStore } from "../store/useStore";

export default function RewardDetailsScreen() {
  const { rewardId } = useLocalSearchParams<{ rewardId: string }>();
  const rewardPoints = useStore((s) => s.state.rewardPoints);
  const spendPoints = useStore((s) => s.spendPoints);
  const insets = useSafeAreaInsets();
  const [redeeming, setRedeeming] = useState(false);

  const reward = getRewardById(Number(rewardId));
  const redeemable = reward ? canRedeem(rewardPoints, reward.pointsCost) : false;

  if (!reward) {
    return (
      <View style={styles.screen}>
        <Text style={styles.notFound}>Reward not found</Text>
      </View>
    );
  }

  const handleRedeem = () => {
    Alert.alert(
      "Confirm Redemption",
      `Redeem "${reward.title}" for ${reward.pointsCost} points?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Redeem",
          onPress: () => {
            setRedeeming(true);
            setTimeout(() => {
              const result = processRedemption(rewardPoints, reward);
              setRedeeming(false);
              if (result.success) {
                spendPoints(reward.pointsCost);
                Alert.alert("Success! 🎉", result.message, [
                  { text: "OK", onPress: () => router.back() },
                ]);
              } else {
                Alert.alert("Error", result.error);
              }
            }, 1200);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Reward Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Reward hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name={reward.icon as any} size={40} color="#2563eb" />
          </View>
          <Text style={styles.heroTitle}>{reward.title}</Text>
          <Text style={styles.heroDesc}>{reward.description}</Text>
          <View style={styles.heroBadgeRow}>
            <Badge label={reward.category} variant="info" />
            <View style={styles.popularRow}>
              <Ionicons name="flame" size={14} color="#F59E0B" />
              <Text style={styles.popularText}>{reward.popularity}% popular</Text>
            </View>
          </View>
        </View>

        {/* Points comparison */}
        <View style={styles.ptsCard}>
          <View style={styles.ptsItem}>
            <Text style={styles.ptsItemLabel}>Points Required</Text>
            <Text style={styles.ptsRequired}>{reward.pointsCost.toLocaleString()} pts</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.ptsItem}>
            <Text style={styles.ptsItemLabel}>Your Balance</Text>
            <Text style={[styles.ptsBalance, { color: redeemable ? "#10b981" : "#ef4444" }]}>
              {rewardPoints.toLocaleString()} pts
            </Text>
          </View>
        </View>

        {!redeemable && (
          <View style={styles.alertBox}>
            <Ionicons name="alert-circle" size={18} color="#EF4444" />
            <Text style={styles.alertText}>You need {reward.pointsCost - rewardPoints} more points to redeem this reward</Text>
          </View>
        )}

        {/* Terms */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Terms & Conditions</Text>
          {reward.terms.map((term, i) => (
            <View key={i} style={styles.termRow}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" />
              <Text style={styles.termText}>{term}</Text>
            </View>
          ))}
        </View>

        {/* How it works */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How It Works</Text>
          {[
            "Tap 'Redeem Now' to claim this reward",
            "Points will be deducted from your balance",
            "Reward will be available in your wallet",
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 20 }]}>
        <Button
          title={redeemable ? "Redeem Now" : "Insufficient Points"}
          onPress={handleRedeem}
          disabled={!redeemable}
          loading={redeeming}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  notFound: { flex: 1, textAlign: "center", marginTop: 96, color: theme.colors.muted, fontSize: theme.fontSize.base },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: theme.spacing.lg, paddingBottom: 12, backgroundColor: theme.colors.card, borderBottomWidth: 1, borderBottomColor: theme.colors.borderLight },
  backBtn: { width: 40, height: 40, borderRadius: theme.radius.md, backgroundColor: theme.colors.borderLight, alignItems: "center", justifyContent: "center" },
  topTitle: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text },
  scroll: { padding: theme.spacing.xl, paddingBottom: 120 },
  heroCard: { backgroundColor: theme.colors.card, borderRadius: 24, padding: 28, alignItems: "center", marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 4 },
  heroIcon: { width: 80, height: 80, borderRadius: 24, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  heroTitle: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text, marginBottom: 8, textAlign: "center" },
  heroDesc: { fontSize: theme.fontSize.base, color: theme.colors.muted, textAlign: "center", lineHeight: 22, marginBottom: 16 },
  heroBadgeRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  popularRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  popularText: { fontSize: theme.fontSize.sm, color: theme.colors.amber, fontWeight: "600" },
  ptsCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 20, flexDirection: "row", alignItems: "center", marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  ptsItem: { flex: 1, alignItems: "center" },
  ptsItemLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginBottom: 4 },
  ptsRequired: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.primary },
  ptsBalance: { fontSize: theme.fontSize.xl, fontWeight: "700" },
  divider: { width: 1, height: 40, backgroundColor: theme.colors.gray200, marginHorizontal: 16 },
  alertBox: { flexDirection: "row", alignItems: "center", backgroundColor: theme.colors.redBg, borderRadius: theme.radius.md, padding: 14, gap: 10, marginBottom: 16 },
  alertText: { flex: 1, fontSize: theme.fontSize.sm, color: theme.colors.red, fontWeight: "500", lineHeight: 18 },
  infoCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 20, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  infoTitle: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text, marginBottom: 14 },
  termRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 12 },
  termText: { flex: 1, fontSize: theme.fontSize.sm, color: theme.colors.muted, lineHeight: 20 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  stepNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center" },
  stepNumText: { fontSize: theme.fontSize.sm, fontWeight: "700", color: theme.colors.primary },
  stepText: { flex: 1, fontSize: theme.fontSize.sm, color: theme.colors.text },
  cta: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: theme.colors.card, padding: 20, borderTopWidth: 1, borderTopColor: theme.colors.borderLight, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 8 },
}));
