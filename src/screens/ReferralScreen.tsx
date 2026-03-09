import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Header from "../components/Header";
import Badge from "../components/Badge";
import { formatReferralDate, getReferralCode, getReferralHistory, getReferralStats, getShareChannels, getShareMessage } from "../services/referralService";

export default function ReferralScreen() {
  const [copied, setCopied] = useState(false);

  const referralCode = getReferralCode();
  const stats = getReferralStats();
  const history = getReferralHistory();
  const shareChannels = getShareChannels();

  const handleCopyCode = () => {
    setCopied(true);
    Alert.alert("Copied!", `Referral code: ${referralCode}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (channel: { label: string }) => {
    const message = getShareMessage(referralCode);
    Alert.alert(`Share via ${channel.label}`, message);
  };

  return (
    <View style={styles.screen}>
      <Header title="Refer & Earn" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="gift" size={40} color="#2563eb" />
          </View>
          <Text style={styles.heroTitle}>Refer Friends & Earn</Text>
          <Text style={styles.heroSubtitle}>
            Share your referral code with friends.{"\n"}
            Earn {stats.pointsPerReferral} points for each successful referral!
          </Text>
        </View>

        {/* Referral Code */}
        <View style={styles.codeCard}>
          <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
          <View style={styles.codeRow}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity
              style={[styles.copyBtn, copied && styles.copyBtnSuccess]}
              onPress={handleCopyCode}
            >
              <Ionicons name={copied ? "checkmark" : "copy"} size={18} color="#fff" />
              <Text style={styles.copyBtnText}>{copied ? "Copied!" : "Copy"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share channels */}
        <Text style={styles.sectionTitle}>Share Via</Text>
        <View style={styles.shareRow}>
          {shareChannels.map((channel) => (
            <TouchableOpacity key={channel.id} style={styles.shareBtn} onPress={() => handleShare(channel)} activeOpacity={0.7}>
              <View style={[styles.shareIcon, { backgroundColor: channel.color + "15" }]}>
                <Ionicons name={channel.icon as any} size={24} color={channel.color} />
              </View>
              <Text style={styles.shareLabel}>{channel.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Referral Stats</Text>
        <View style={styles.statsRow}>
          {[
            { icon: "people" as const, color: "#2563eb", value: stats.total, label: "Total" },
            { icon: "checkmark-circle" as const, color: "#10B981", value: stats.completed, label: "Completed" },
            { icon: "time" as const, color: "#F59E0B", value: stats.pending, label: "Pending" },
            { icon: "star" as const, color: "#8B5CF6", value: stats.pointsEarned, label: "Pts Earned" },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Ionicons name={s.icon} size={22} color={s.color} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* History */}
        <Text style={styles.sectionTitle}>Referral History</Text>
        {history.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.historyAvatar}>
              <Text style={styles.historyAvatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyName}>{item.name}</Text>
              <Text style={styles.historyDate}>{formatReferralDate(item.date)}</Text>
            </View>
            <View style={styles.historyRight}>
              <Badge label={item.status} variant={item.status === "completed" ? "success" : "warning"} />
              {item.pointsEarned > 0 && <Text style={styles.historyPts}>+{item.pointsEarned} pts</Text>}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: theme.spacing.xl, paddingBottom: 40 },
  hero: { backgroundColor: "#dbeafe", borderRadius: 24, padding: 28, alignItems: "center", marginBottom: 20, borderWidth: 1, borderColor: "#bfdbfe" },
  heroIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#bfdbfe", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  heroTitle: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text, marginBottom: 8 },
  heroSubtitle: { fontSize: theme.fontSize.sm, color: theme.colors.muted, textAlign: "center", lineHeight: 22 },
  codeCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 20, marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  codeLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, letterSpacing: 2, marginBottom: 12 },
  codeRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  codeText: { fontSize: theme.fontSize.xxl, fontWeight: "700", color: theme.colors.primary, letterSpacing: 3 },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: theme.colors.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: theme.radius.md },
  copyBtnSuccess: { backgroundColor: "#10b981" },
  copyBtnText: { color: theme.colors.white, fontWeight: "700", fontSize: theme.fontSize.sm },
  sectionTitle: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text, marginBottom: 14 },
  shareRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  shareBtn: { flex: 1, alignItems: "center" },
  shareIcon: { width: 52, height: 52, borderRadius: theme.radius.lg, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  shareLabel: { fontSize: theme.fontSize.xs, color: theme.colors.muted, fontWeight: "600" },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: 14, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  statValue: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text, marginTop: 6 },
  statLabel: { fontSize: 10, color: theme.colors.muted, marginTop: 2 },
  historyCard: { backgroundColor: theme.colors.card, borderRadius: theme.radius.lg, padding: theme.spacing.lg, marginBottom: 10, flexDirection: "row", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  historyAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginRight: 12 },
  historyAvatarText: { fontSize: theme.fontSize.base, fontWeight: "700", color: theme.colors.primary },
  historyInfo: { flex: 1 },
  historyName: { fontSize: theme.fontSize.base, fontWeight: "600", color: theme.colors.text },
  historyDate: { fontSize: theme.fontSize.xs, color: theme.colors.muted, marginTop: 2 },
  historyRight: { alignItems: "flex-end", gap: 4 },
  historyPts: { fontSize: theme.fontSize.xs, fontWeight: "700", color: "#10b981" },
}));
