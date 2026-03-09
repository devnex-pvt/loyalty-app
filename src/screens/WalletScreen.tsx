import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Header from "../components/Header";
import EmptyState from "../components/EmptyState";
import { formatTransactionDate, getTransactionColor, getTransactionsByType, getWalletSummary } from "../services/walletService";
import { useStore } from "../store/useStore";
import { Transaction } from "../data/loyaltyData";

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "earn", label: "Earned" },
  { id: "redeem", label: "Redeemed" },
  { id: "referral", label: "Referral" },
];

export default function WalletScreen() {
  const rewardPoints = useStore((s) => s.state.rewardPoints);
  const [activeFilter, setActiveFilter] = useState("all");

  const summary = getWalletSummary(rewardPoints);
  const transactions = getTransactionsByType(activeFilter);

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const color = getTransactionColor(item.type);
    const isEarned = item.pointsEarned > 0;
    return (
      <View style={styles.txCard}>
        <View style={[styles.txIcon, { backgroundColor: color + "15" }]}>
          <Ionicons name={item.icon as any} size={20} color={color} />
        </View>
        <View style={styles.txInfo}>
          <Text style={styles.txStore}>{item.store}</Text>
          <Text style={styles.txDesc}>{item.description}</Text>
          <Text style={styles.txDate}>{formatTransactionDate(item.date)}</Text>
        </View>
        <View style={styles.txRight}>
          {item.amount > 0 && <Text style={styles.txAmount}>₹{item.amount.toLocaleString()}</Text>}
          <Text style={[styles.txPoints, isEarned ? styles.txPositive : styles.txNegative]}>
            {isEarned ? "+" : ""}{item.pointsEarned} pts
          </Text>
        </View>
      </View>
    );
  };

  const ListHeader = () => (
    <View>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>CURRENT BALANCE</Text>
        <Text style={styles.balanceValue}>{rewardPoints.toLocaleString()}</Text>
        <Text style={styles.balanceSuffix}>Reward Points</Text>
      </View>

      <View style={styles.summaryRow}>
        {[
          { icon: "trending-up" as const, color: "#10b981", value: summary.totalEarned, label: "Total Earned" },
          { icon: "gift" as const, color: "#8b5cf6", value: summary.totalRedeemed, label: "Redeemed" },
          { icon: "people" as const, color: "#2563eb", value: summary.totalTransactions, label: "Transactions" },
        ].map((s) => (
          <View key={s.label} style={styles.summaryCard}>
            <Ionicons name={s.icon} size={20} color={s.color} />
            <Text style={styles.summaryValue}>{s.value}</Text>
            <Text style={styles.summaryLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.filterRow}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.filterBtn, activeFilter === tab.id && styles.filterBtnActive]}
            onPress={() => setActiveFilter(tab.id)}
          >
            <Text style={[styles.filterText, activeFilter === tab.id && styles.filterTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header title="My Wallet" />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={<EmptyState icon="receipt-outline" title="No transactions" subtitle="No transactions match this filter" />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  list: { padding: theme.spacing.xl, paddingBottom: 40 },
  balanceCard: { backgroundColor: theme.colors.primary, borderRadius: 24, padding: 28, alignItems: "center", marginBottom: 16, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  balanceLabel: { fontSize: theme.fontSize.xs, color: "rgba(255,255,255,0.7)", letterSpacing: 2, marginBottom: 8 },
  balanceValue: { fontSize: 44, fontWeight: "700", color: theme.colors.white, marginBottom: 4 },
  balanceSuffix: { fontSize: theme.fontSize.sm, color: "rgba(255,255,255,0.8)" },
  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  summaryCard: { flex: 1, backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 14, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  summaryValue: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.text, marginTop: 6 },
  summaryLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 2, textAlign: "center" },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  filterBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: theme.radius.full, backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border },
  filterBtnActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  filterText: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.muted },
  filterTextActive: { color: theme.colors.white },
  txCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: 10, flexDirection: "row", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  txIcon: { width: 42, height: 42, borderRadius: theme.radius.md, alignItems: "center", justifyContent: "center", marginRight: 12 },
  txInfo: { flex: 1 },
  txStore: { fontSize: theme.fontSize.base, fontWeight: "600", color: theme.colors.text },
  txDesc: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 2 },
  txDate: { fontSize: theme.fontSize.xs, color: theme.colors.gray400, marginTop: 4 },
  txRight: { alignItems: "flex-end" },
  txAmount: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.text },
  txPoints: { fontSize: theme.fontSize.sm, fontWeight: "700", marginTop: 2 },
  txPositive: { color: "#10b981" },
  txNegative: { color: theme.colors.red },
}));
