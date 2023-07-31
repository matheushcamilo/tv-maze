import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { EpisodeDetailsScreen, EpisodesListScreen, SeasonsScreen, ShowDetailsScreen } from "@screens";

import { DrawerNavigator } from "./DrawerNavigator";
import { StackRootParamList } from "./navigation-types";

const Stack = createNativeStackNavigator<StackRootParamList>();

export function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          fullScreenGestureEnabled: true,
          headerShown: false,
        }}
        initialRouteName="DrawerNavigator">
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="EpisodesListScreen" component={EpisodesListScreen} />
        <Stack.Screen name="EpisodeDetailsScreen" component={EpisodeDetailsScreen} />
        <Stack.Screen name="ShowDetailsScreen" component={ShowDetailsScreen} />
        <Stack.Screen name="SeasonsScreen" component={SeasonsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
