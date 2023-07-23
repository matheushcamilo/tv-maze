import React from "react";
import { TextInput, View, StyleSheet, TextInputProps, ViewStyle, StyleProp } from "react-native";

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
        placeholder="Search for a series..."
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
  },
});
