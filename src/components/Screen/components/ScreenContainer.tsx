import React, { type PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface Props extends PropsWithChildren {
  backgroundColor?: string;
}

export function ScrollViewContainer({ children, backgroundColor }: Props) {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={[styles.container, { backgroundColor }]}>
      {children}
    </ScrollView>
  );
}

export function ViewContainer({ children, backgroundColor }: Props) {
  return <View style={[styles.container, { backgroundColor }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
