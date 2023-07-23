import React from "react";
import { Text } from "react-native";

import { DrawerScreenProps } from "@react-navigation/drawer";

import { Screen } from "@components";
import { DrawerRootParamList } from "@routes";

type FavoriteScreenProps = DrawerScreenProps<DrawerRootParamList, "FavoriteScreen">;

export function FavoriteScreen({}: FavoriteScreenProps) {
  return (
    <Screen>
      <Text>FavoriteScreen</Text>
    </Screen>
  );
}
