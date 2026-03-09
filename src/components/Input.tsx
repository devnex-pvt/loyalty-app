import { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native-unistyles";

interface InputProps extends TextInputProps {
  label?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  error?: string;
  containerStyle?: object;
}

export default function Input({ label, iconName, error, containerStyle, secureTextEntry, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputRow, focused && styles.inputFocused, error ? styles.inputError : null]}>
        {iconName ? (
          <Ionicons name={iconName} size={18} style={styles.icon} />
        ) : null}
        <TextInput
          style={styles.input}
          placeholderTextColor="#9ca3af"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry && !showPassword}
          {...rest}
        />
        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} style={styles.icon} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: { marginBottom: theme.spacing.lg },
  label: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.text, marginBottom: theme.spacing.xs },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    minHeight: 52,
  },
  inputFocused: { borderColor: theme.colors.primary },
  inputError: { borderColor: theme.colors.red },
  icon: { color: theme.colors.muted, marginRight: theme.spacing.sm },
  input: { flex: 1, fontSize: theme.fontSize.base, color: theme.colors.text, paddingVertical: theme.spacing.md },
  errorText: { fontSize: theme.fontSize.xs, color: theme.colors.red, marginTop: theme.spacing.xs },
}));
