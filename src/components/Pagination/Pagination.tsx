import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { palette, spacing } from "@themes";

interface PaginationProps {
  page: number;
  onChangePage: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}

export function Pagination({ page, onChangePage, disabled = false }: PaginationProps) {
  const handlePreviousPage = () => {
    onChangePage(prevPage => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    onChangePage(prevPage => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <Button
        color={palette.greenDark}
        title="Previous"
        onPress={handlePreviousPage}
        disabled={page === 1 || disabled}
      />
      <Text style={styles.pageNumber} accessibilityRole="text">
        {page}
      </Text>
      <Button color={palette.greenDark} title="Next" onPress={handleNextPage} disabled={disabled} />
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
