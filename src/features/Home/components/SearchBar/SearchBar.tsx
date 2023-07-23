import React from "react";
import { TextInput, View, StyleSheet, TextInputProps, ViewStyle, StyleProp } from "react-native";

import { palette } from "@themes";

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
    paddingVertical: 10,
  },
  input: {
    height: 50,
    borderColor: palette.grayLight,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    width: "100%",
    fontSize: 16,
  },
});
