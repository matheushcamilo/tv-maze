import React from "react";
import { StatusBar } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Router } from "@routes";

export function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <Router />
    </SafeAreaProvider>
  );
}
