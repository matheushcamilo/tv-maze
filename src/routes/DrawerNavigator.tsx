import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { FavoriteScreen, ShowScreen } from "@features";

import { DrawerRootParamList } from "./navigation-types";

const Drawer = createDrawerNavigator<DrawerRootParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="ShowScreen">
      <Drawer.Screen name="ShowScreen" component={ShowScreen} />
      <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
}
