import React from "react";
import { ActivityIndicator, Modal, View, StyleSheet, Text } from "react-native";

import { palette, spacing } from "@themes";

interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorContainer}>
          <Text style={styles.loadingText}>Loading</Text>
          <ActivityIndicator size="small" color={palette.greenDark} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  activityIndicatorContainer: {
    flexDirection: "row",
    backgroundColor: palette.grayExtraLight,
    borderRadius: 4,
    paddingHorizontal: spacing.s20,
    paddingVertical: spacing.s16,
  },
  loadingText: {
    fontFamily: "Satoshi-Medium",
    marginRight: spacing.s8,
    fontSize: 18,
    color: palette.greenDark,
  },
});
