import React, { type PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { palette } from "@themes";

interface Props extends PropsWithChildren {
  backgroundColor?: string;
}

export function ScrollViewContainer({ children, backgroundColor = palette.grayExtraLight }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { backgroundColor }]}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({ children, backgroundColor = palette.grayExtraLight }: Props) {
  return <View style={[styles.container, { backgroundColor }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
