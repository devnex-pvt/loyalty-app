import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native-unistyles";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
}

export default function EmptyState({ icon = "file-tray-outline", title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={40} color="#9ca3af" />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: theme.spacing.xxl },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.lg,
  },
  title: { fontSize: theme.fontSize.lg, fontWeight: "700", color: theme.colors.text, textAlign: "center" },
  subtitle: { fontSize: theme.fontSize.sm, color: theme.colors.muted, textAlign: "center", marginTop: theme.spacing.sm },
}));
