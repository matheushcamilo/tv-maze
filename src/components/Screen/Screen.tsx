import React, { type PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, ViewProps } from "react-native";

import { useSafeArea } from "@hooks";
import { palette } from "@themes";

import { ScrollViewContainer, ViewContainer } from "./components/ScreenContainer";

type ScreenProps = ViewProps &
  PropsWithChildren<{
    scrollable?: boolean;
  }>;

export function Screen({ children, scrollable = false, style, ...boxProps }: ScreenProps) {
  const { top, bottom } = useSafeArea();
  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Container>
        <View style={[{ paddingTop: top, paddingBottom: bottom }, styles.container, style]} {...boxProps}>
          {children}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: palette.grayExtraLight,
  },
});
