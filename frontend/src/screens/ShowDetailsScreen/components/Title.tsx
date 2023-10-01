import React from "react";
import type { PropsWithChildren } from "react";
import { View, Text, StyleSheet } from "react-native";

import { palette, spacing } from "@themes";

export function Title({ children }: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail" accessibilityRole="text">
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    marginTop: spacing.s36,
    marginBottom: spacing.s4,
  },
  title: {
    fontFamily: "Satoshi-Bold",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.5,
    color: palette.green,
  },
});
