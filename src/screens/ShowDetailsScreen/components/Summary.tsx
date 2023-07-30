import React from "react";
import { Text, StyleSheet, useWindowDimensions } from "react-native";

import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

import { palette, spacing } from "@themes";

type Props = {
  summary: string;
};

export function Summary({ summary }: Props) {
  const { width } = useWindowDimensions();
  const contentWidth = React.useMemo(() => width - spacing.s16 * 2, [width]);
  const systemFonts = React.useMemo(() => [...defaultSystemFonts, "Satoshi-Medium"], []);

  const htmlProps = React.useMemo(() => {
    return {
      source: { html: summary || "" },
      contentWidth: contentWidth,
      baseStyle: styles.html,
      tagsStyles: { p: { margin: 0, padding: 0 } },
      systemFonts: systemFonts,
    };
  }, [summary, contentWidth, systemFonts]);
  return (
    <>
      <Text style={styles.summary} accessibilityRole="text">
        Summary
      </Text>
      {summary && summary?.length > 0 ? (
        <RenderHTML {...htmlProps} />
      ) : (
        <Text style={styles.summaryInfo} accessibilityRole="text">
          No content.
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  summary: {
    fontFamily: "Satoshi-Medium",
    color: palette.green,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  summaryInfo: {
    fontFamily: "Satoshi-Medium",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  html: {
    textAlign: "justify",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Satoshi-Medium",
  },
});
