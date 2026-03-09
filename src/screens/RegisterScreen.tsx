import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { router } from "expo-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { validateRegistration } from "../services/authService";
import { useStore } from "../store/useStore";

export default function RegisterScreen() {
  const login = useStore((s) => s.login);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

  const updateField = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      const result = validateRegistration(form);
      setLoading(false);
      if (result.success && result.user) {
        login(result.user);
      } else {
        Alert.alert("Registration Failed", result.error);
      }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View style={styles.iconWrap}>
            <Ionicons name="gift" size={36} color="#2563eb" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the XYZ Rewards program</Text>
        </View>

        <Input label="Full Name" placeholder="Enter your full name" iconName="person-outline" value={form.name} onChangeText={(v) => updateField("name", v)} autoCapitalize="words" />
        <Input label="Email" placeholder="Enter your email" iconName="mail-outline" value={form.email} onChangeText={(v) => updateField("email", v)} keyboardType="email-address" autoCapitalize="none" />
        <Input label="Phone Number" placeholder="Enter 10-digit phone number" iconName="call-outline" value={form.phone} onChangeText={(v) => updateField("phone", v)} keyboardType="phone-pad" />
        <Input label="Password" placeholder="Create a password" iconName="lock-closed-outline" value={form.password} onChangeText={(v) => updateField("password", v)} secureTextEntry />
        <Input label="Confirm Password" placeholder="Re-enter your password" iconName="lock-closed-outline" value={form.confirmPassword} onChangeText={(v) => updateField("confirmPassword", v)} secureTextEntry />

        <Button title="Create Account" onPress={handleRegister} loading={loading} style={{ marginTop: 8 }} />

        <View style={styles.loginRow}>
          <Text style={styles.mutedText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  flex: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: theme.spacing.xxl, paddingTop: 60, paddingBottom: 40 },
  header: { marginBottom: 32 },
  backBtn: { width: 40, height: 40, borderRadius: theme.radius.md, backgroundColor: theme.colors.card, alignItems: "center", justifyContent: "center", marginBottom: theme.spacing.xl },
  iconWrap: { width: 64, height: 64, borderRadius: theme.radius.lg, backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: theme.spacing.md },
  title: { fontSize: theme.fontSize.xxl, fontWeight: "700", color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: theme.fontSize.base, color: theme.colors.muted },
  loginRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  mutedText: { fontSize: theme.fontSize.sm, color: theme.colors.muted },
  linkText: { fontSize: theme.fontSize.sm, fontWeight: "700", color: theme.colors.primary },
}));
