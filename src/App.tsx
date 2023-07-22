import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { HomeScreen } from "./HomeScreen";

export function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
