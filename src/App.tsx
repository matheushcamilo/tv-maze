import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Router } from "@routes";

import { FavoriteProvider } from "./contexts/FavoritesContext";

export function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <FavoriteProvider>
        <Router />
      </FavoriteProvider>
    </SafeAreaProvider>
  );
}
