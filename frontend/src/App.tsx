import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Router } from "@routes";

export function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Router />
    </SafeAreaProvider>
  );
}
