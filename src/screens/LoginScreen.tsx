import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { router } from "expo-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { validateLogin } from "../services/authService";
import { useStore } from "../store/useStore";

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useStore((s) => s.login);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const result = validateLogin(identifier, password);
      setLoading(false);
      if (result.success && result.user) {
        login(result.user);
      } else {
        Alert.alert("Login Failed", result.error);
      }
    }, 800);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Ionicons name="gift" size={40} color="#2563eb" />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your XYZ Rewards account</Text>
        </View>

        <Input
          label="Email or Username"
          placeholder="Enter email or username"
          iconName="person-outline"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          iconName="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotBtn} onPress={() => router.push("/(auth)/forgot-password")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button title="Sign In" onPress={handleLogin} loading={loading} />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          {[
            { icon: "logo-google" as const, color: "#DB4437" },
            { icon: "logo-apple" as const, color: "#000000" },
            { icon: "logo-facebook" as const, color: "#1877F2" },
          ].map((s) => (
            <TouchableOpacity key={s.icon} style={styles.socialBtn}>
              <Ionicons name={s.icon} size={22} color={s.color} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.mutedText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hintBox}>
          <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
          <Text style={styles.hintText}>Test: testuser / password123</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create((theme) => ({
  flex: { flex: 1, backgroundColor: theme.colors.background },
  scroll: { padding: theme.spacing.xxl, paddingTop: 80, paddingBottom: 40 },
  header: { marginBottom: 36 },
  iconWrap: {
    width: 72, height: 72, borderRadius: theme.radius.lg,
    backgroundColor: "#dbeafe", alignItems: "center", justifyContent: "center", marginBottom: theme.spacing.xl,
  },
  title: { fontSize: theme.fontSize.xxl, fontWeight: "700", color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: theme.fontSize.base, color: theme.colors.muted },
  forgotBtn: { alignSelf: "flex-end", marginBottom: theme.spacing.xl, marginTop: -8 },
  forgotText: { fontSize: theme.fontSize.sm, fontWeight: "600", color: theme.colors.primary },
  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 28 },
  dividerLine: { flex: 1, height: 1, backgroundColor: theme.colors.gray200 },
  dividerText: { marginHorizontal: 16, fontSize: theme.fontSize.sm, color: theme.colors.muted },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 16 },
  socialBtn: {
    width: 56, height: 56, borderRadius: theme.radius.md,
    backgroundColor: theme.colors.card, alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: theme.colors.gray200,
  },
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 32 },
  mutedText: { fontSize: theme.fontSize.sm, color: theme.colors.muted },
  linkText: { fontSize: theme.fontSize.sm, fontWeight: "700", color: theme.colors.primary },
  hintBox: {
    flexDirection: "row", alignItems: "center", gap: 6, marginTop: 20,
    padding: theme.spacing.md, backgroundColor: theme.colors.borderLight, borderRadius: theme.radius.sm,
  },
  hintText: { fontSize: theme.fontSize.sm, color: theme.colors.muted },
}));
