import React from "react";
import { Text } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "@components";
import { StackRootParamList } from "@routes";

type EpisodeDetailsScreenProps = NativeStackScreenProps<StackRootParamList, "EpisodeDetailsScreen">;

export function EpisodeDetailsScreen({}: EpisodeDetailsScreenProps) {
  return (
    <Screen>
      <Text>Episode Details Screen</Text>
    </Screen>
  );
}
