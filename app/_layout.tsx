import "../ignoreWarnings";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useStore } from "../src/store/useStore";

export default function RootLayout() {
  const initializeStore = useStore((s) => s.initializeStore);
  const isAuthenticated = useStore((s) => s.state.isAuthenticated);
  const isLoading = useStore((s) => s.state.isLoading);

  useEffect(() => {
    initializeStore();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace("/(tabs)" as any);
    } else {
      router.replace("/(auth)" as any);
    }
  }, [isAuthenticated, isLoading]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
