import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { FavoriteScreen, ShowScreen } from "@features";
import { palette } from "@themes";

import { DrawerRootParamList } from "./navigation-types";

const Drawer = createDrawerNavigator<DrawerRootParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="ShowScreen"
      screenOptions={{
        headerTintColor: palette.grayExtraLight,
        headerTitleStyle: { fontSize: 20, fontFamily: "Satoshi-Bold" },
        headerStyle: { backgroundColor: palette.greenDark },
        headerTitle: "TVmaze",
        drawerStyle: { backgroundColor: palette.grayExtraLight },
        drawerActiveBackgroundColor: palette.greenLight,
        drawerActiveTintColor: palette.greenDark,
        drawerInactiveTintColor: palette.green,
      }}>
      <Drawer.Screen name="ShowScreen" component={ShowScreen} />
      <Drawer.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
}
