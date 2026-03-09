import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type BadgeVariant = "success" | "warning" | "error" | "info" | "purple";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export default function Badge({ label, variant = "info" }: BadgeProps) {
  return (
    <View
      style={[
        styles.base,
        variant === "success" && styles.bgSuccess,
        variant === "warning" && styles.bgWarning,
        variant === "error" && styles.bgError,
        variant === "info" && styles.bgInfo,
        variant === "purple" && styles.bgPurple,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "success" && styles.textSuccess,
          variant === "warning" && styles.textWarning,
          variant === "error" && styles.textError,
          variant === "info" && styles.textInfo,
          variant === "purple" && styles.textPurple,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: {
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  // backgrounds
  bgSuccess: { backgroundColor: "#d1fae5" },
  bgWarning: { backgroundColor: theme.colors.amberBg },
  bgError: { backgroundColor: theme.colors.redBg },
  bgInfo: { backgroundColor: "#dbeafe" },
  bgPurple: { backgroundColor: "#ede9fe" },
  // text
  text: { fontSize: theme.fontSize.xs, fontWeight: "600" },
  textSuccess: { color: theme.colors.green },
  textWarning: { color: theme.colors.amber },
  textError: { color: theme.colors.red },
  textInfo: { color: theme.colors.primary },
  textPurple: { color: "#7c3aed" },
}));
