import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 3 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.card}>
          <View style={styles.circle} />
          <View style={styles.lines}>
            <View style={[styles.line, styles.lineShort]} />
            <View style={[styles.line, styles.lineLong]} />
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  circle: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.gray200, marginRight: theme.spacing.md },
  lines: { flex: 1, gap: 8 },
  line: { height: 12, borderRadius: theme.radius.sm, backgroundColor: theme.colors.gray200 },
  lineShort: { width: "40%" },
  lineLong: { width: "70%" },
}));
