import React from "react";
import { ActivityIndicator, Modal, View, StyleSheet } from "react-native";

import { palette } from "@themes";

interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalBackground}>
        <ActivityIndicator size="large" color={palette.green} />
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
});
