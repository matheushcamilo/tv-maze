import React from "react";
import { StyleSheet, Text } from "react-native";

import { DrawerScreenProps } from "@react-navigation/drawer";

import { Screen } from "@components";
import { DrawerRootParamList } from "@routes";
import { spacing } from "@themes";

type FavoriteScreenProps = DrawerScreenProps<DrawerRootParamList, "FavoriteScreen">;

export function FavoriteScreen({}: FavoriteScreenProps) {
  return (
    <Screen style={styles.container}>
      <Text>Favorite Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s12,
  },
});
