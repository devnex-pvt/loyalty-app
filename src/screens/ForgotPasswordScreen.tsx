import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { router } from "expo-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { validatePasswordRecovery } from "../services/authService";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const result = validatePasswordRecovery(email);
      setLoading(false);
      if (result.success) {
        setSent(true);
      } else {
        Alert.alert("Error", result.error);
      }
    }, 1000);
  };

  if (sent) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Ionicons name="mail-open" size={48} color="#2563eb" />
        </View>
        <Text style={styles.successTitle}>Check Your Email</Text>
        <Text style={styles.successSubtitle}>
          We've sent a password reset link to{"\n"}
          <Text style={styles.boldText}>{email}</Text>
        </Text>
        <Button title="Back to Login" onPress={() => router.back()} style={{ marginTop: 32, width: "100%" }} />
        <TouchableOpacity style={styles.retryBtn} onPress={() => { setSent(false); setEmail(""); }}>
          <Text style={styles.retryText}>Didn't receive it? Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.iconWrap}>
          <Ionicons name="lock-closed" size={36} color="#2563eb" />
        </View>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter your email and we'll send you a reset link</Text>
        <Input
          label="Email Address"
          placeholder="Enter your email"
          iconName="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Send Reset Link" onPress={handleSubmit} loading={loading} style={{ marginTop: 8 }} />
        <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={16} color="#2563eb" />
          <Text style={styles.backLinkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  flex: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1, padding: theme.spacing.xxl, paddingTop: 70 },
  backBtn: { width: 40, height: 40, borderRadius: theme.radius.md, backgroundColor: theme.colors.card, alignItems: "center", justifyContent: "center", marginBottom: 32 },
  iconWrap: { width: 64, height: 64, borderRadius: theme.radius.lg, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: theme.spacing.lg },
  title: { fontSize: theme.fontSize.xxl, fontWeight: "700", color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: theme.fontSize.base, color: theme.colors.muted, marginBottom: 32 },
  backLink: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 24 },
  backLinkText: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.primary },
  successContainer: { flex: 1, backgroundColor: theme.colors.background, justifyContent: "center", alignItems: "center", padding: theme.spacing.xxl },
  successIcon: { width: 96, height: 96, borderRadius: 48, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: 24 },
  successTitle: { fontSize: theme.fontSize.xl, fontWeight: "700", color: theme.colors.text, marginBottom: 12 },
  successSubtitle: { fontSize: theme.fontSize.base, color: theme.colors.muted, textAlign: "center", lineHeight: 24 },
  boldText: { fontWeight: "700", color: theme.colors.text },
  retryBtn: { marginTop: 20, padding: theme.spacing.md },
  retryText: { fontSize: theme.fontSize.sm, color: theme.colors.primary, fontWeight: "600" },
}));
