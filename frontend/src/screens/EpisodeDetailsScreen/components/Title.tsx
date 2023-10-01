import React from "react";
import type { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";

import { palette, spacing } from "@themes";

export function Title({ children }: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title} accessibilityRole="text">
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: spacing.s4,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.5,
    fontFamily: "Satoshi-Bold",
    color: palette.greenDark,
  },
});
