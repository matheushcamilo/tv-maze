import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { palette, spacing } from "@themes";

export function EmptyListMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} accessibilityRole="text">
        🚨 No data available 🚨
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.s32,
  },
  text: {
    fontSize: 24,
    lineHeight: 30,
    color: palette.gray,
    fontFamily: "Satoshi-Medium",
  },
});
