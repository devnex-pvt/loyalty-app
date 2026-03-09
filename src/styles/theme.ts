import { StyleSheet } from "react-native-unistyles";

export const lightTheme = {
  colors: {
    primary: "#2563eb",
    background: "#f3f4f6",
    card: "#ffffff",
    text: "#111827",
    muted: "#6b7280",
    white: "#ffffff",
    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    red: "#ef4444",
    redBg: "#fee2e2",
    amber: "#f59e0b",
    amberBg: "#fffbeb",
    green: "#10b981",
    gray200: "#e5e7eb",
    gray400: "#9ca3af",
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 },
  radius: { sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999 },
  fontSize: { xs: 11, sm: 13, base: 15, md: 16, lg: 18, xl: 22, xxl: 28, xxxl: 36 },
};

StyleSheet.configure({
  themes: { light: lightTheme },
  settings: { initialTheme: "light" as never },
});
