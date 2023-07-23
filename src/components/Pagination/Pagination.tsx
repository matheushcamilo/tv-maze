import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface PaginationProps {
  page: number;
  onChangePage: (newPage: number) => void;
}

export function Pagination({ page, onChangePage }: PaginationProps) {
  const handlePreviousPage = () => {
    const newPage = Math.max(1, page - 1);
    onChangePage(newPage);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    onChangePage(newPage);
  };

  return (
    <View style={styles.container}>
      <Button title="Previous" onPress={handlePreviousPage} disabled={page === 1} />
      <Text style={styles.pageNumber}>{page}</Text>
      <Button title="Next" onPress={handleNextPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  pageNumber: {
    fontSize: 18,
  },
});
