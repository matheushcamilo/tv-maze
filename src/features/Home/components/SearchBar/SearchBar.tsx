import React from "react";
import { TextInput, View, StyleSheet, TextInputProps, ViewStyle, StyleProp } from "react-native";

import { palette, spacing } from "@themes";

interface SearchBarProps extends TextInputProps {
  viewStyle?: StyleProp<ViewStyle>;
}

export function SearchBar({ value, onChangeText, style, viewStyle, ...rest }: SearchBarProps) {
  return (
    <View style={[styles.container, viewStyle]}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={palette.grayLight}
        placeholder="Search for a series..."
        {...rest}
        accessibilityRole="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.s12,
  },
  input: {
    height: spacing.s24 * 2,
    borderColor: palette.grayLight,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: spacing.s8,
    width: "100%",
    fontSize: 18,
    fontFamily: "Satoshi-Regular",
  },
});
