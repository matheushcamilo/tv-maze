import React from "react";
import { StyleSheet, Text } from "react-native";

import { palette, spacing } from "@themes";

type SubtitleProps = {
  season?: number;
  number?: number;
};

export function Subtitle({ season, number }: SubtitleProps) {
  return (
    <Text style={styles.subtitle}>
      {`Season ${season?.toString().padStart(2, "0")}, Episode ${number?.toString().padStart(2, "0")}`}
    </Text>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.25,
    color: palette.green,
    marginBottom: spacing.s8,
  },
});
