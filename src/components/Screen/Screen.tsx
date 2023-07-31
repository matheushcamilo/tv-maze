import React, { type PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Icon } from "@components";
import { useSafeArea } from "@hooks";
import { palette, spacing } from "@themes";

import { ScrollViewContainer, ViewContainer } from "./components/ScreenContainer";

type ScreenProps = ViewProps &
  PropsWithChildren<{
    scrollable?: boolean;
    canGoBack?: boolean;
  }>;

export function Screen({ children, canGoBack = false, scrollable = false, style, ...boxProps }: ScreenProps) {
  const navigation = useNavigation();
  const { top, bottom } = useSafeArea();
  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Container>
        <View style={[{ paddingTop: top, paddingBottom: bottom }, styles.container, style]} {...boxProps}>
          {canGoBack ? (
            <TouchableOpacity style={styles.goBack} onPress={navigation.goBack}>
              <Icon size={22} name="arrow-left" color={palette.greenDark} />
              <Text style={styles.goBackText} accessibilityRole="text">
                Back
              </Text>
            </TouchableOpacity>
          ) : null}
          {children}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.s12,
    backgroundColor: palette.grayExtraLight,
  },
  goBack: {
    marginBottom: spacing.s12,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackText: {
    marginLeft: spacing.s8,
    fontFamily: "Satoshi-Medium",
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: palette.grayDarker,
  },
});
