import React from "react";
import { Text } from "react-native";

import { Icon, Screen } from "@components";

export function HomeScreen() {
  return (
    <Screen style={{ backgroundColor: "pink" }}>
      <Icon name="home" size={30} color="gray" />
      <Text>HomeScreen</Text>
    </Screen>
  );
}
