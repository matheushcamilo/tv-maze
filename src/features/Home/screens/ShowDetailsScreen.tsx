import React from "react";
import { Text } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "@components";
import { StackRootParamList } from "@routes";

type ShowDetailsScreenProps = NativeStackScreenProps<StackRootParamList, "ShowDetailsScreen">;

export function ShowDetailsScreen({}: ShowDetailsScreenProps) {
  return (
    <Screen>
      <Text>Show Details Screen</Text>
    </Screen>
  );
}
