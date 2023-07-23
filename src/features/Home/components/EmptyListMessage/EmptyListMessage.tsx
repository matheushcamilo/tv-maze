import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function EmptyListMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No data available.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#808080",
  },
});
