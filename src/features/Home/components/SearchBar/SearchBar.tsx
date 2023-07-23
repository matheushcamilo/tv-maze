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
        placeholderTextColor="#D3D3D3"
        placeholder="Search for a series..."
        {...rest}
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
    borderColor: "#A9A9A9",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    width: "100%",
    fontSize: 16,
  },
});
