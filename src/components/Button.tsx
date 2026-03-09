import { ActivityIndicator, Text, TouchableOpacity, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Variant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        variant === "primary" && styles.variantPrimary,
        variant === "secondary" && styles.variantSecondary,
        variant === "outline" && styles.variantOutline,
        variant === "danger" && styles.variantDanger,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            disabled ? "#9ca3af" : variant === "primary" ? "#ffffff" : "#2563eb"
          }
        />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "primary" && styles.textPrimary,
            variant === "secondary" && styles.textSecondary,
            variant === "outline" && styles.textOutline,
            variant === "danger" && styles.textDanger,
            disabled && styles.textDisabled,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create((theme) => ({
  base: {
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  // variant containers
  variantPrimary: { backgroundColor: theme.colors.primary },
  variantSecondary: { backgroundColor: theme.colors.card },
  variantOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  variantDanger: { backgroundColor: theme.colors.redBg },
  disabled: { backgroundColor: theme.colors.gray200 },
  // variant text
  text: { fontSize: theme.fontSize.md, fontWeight: "700" },
  textPrimary: { color: theme.colors.white },
  textSecondary: { color: theme.colors.text },
  textOutline: { color: theme.colors.primary },
  textDanger: { color: theme.colors.red },
  textDisabled: { color: theme.colors.gray400 },
}));
