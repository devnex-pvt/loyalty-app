import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  rightBadge?: number;
  onRightPress?: () => void;
  rightComponent?: ReactNode;
}

export default function Header({ title, subtitle, rightIcon, rightBadge, onRightPress, rightComponent }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightComponent ? rightComponent : rightIcon ? (
        <TouchableOpacity style={styles.iconBtn} onPress={onRightPress}>
          <Ionicons name={rightIcon} size={24} color="#111827" />
          {rightBadge && rightBadge > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{rightBadge > 9 ? "9+" : rightBadge}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  left: { flex: 1 },
  title: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text },
  subtitle: { fontSize: theme.fontSize.sm, color: theme.colors.muted, marginTop: 2 },
  iconBtn: { position: "relative", padding: theme.spacing.xs },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 10, fontWeight: "700", color: theme.colors.white },
}));
