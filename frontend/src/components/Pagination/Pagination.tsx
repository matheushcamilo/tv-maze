import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { palette, spacing } from "@themes";

interface PaginationProps {
  page: number;
  disabled?: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function Pagination({ page, onNextPage, onPreviousPage, disabled = false }: PaginationProps) {
  return (
    <View style={styles.container}>
      <Button color={palette.greenDark} title="Previous" onPress={onPreviousPage} disabled={page === 1 || disabled} />
      <Text style={styles.pageNumber} accessibilityRole="text">
        {page}
      </Text>
      <Button color={palette.greenDark} title="Next" onPress={onNextPage} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.s12,
    backgroundColor: palette.grayExtraLight,
  },
  pageNumber: {
    fontSize: 20,
    lineHeight: 26,
    color: palette.greenDark,
    fontFamily: "Satoshi-Medium",
  },
});
