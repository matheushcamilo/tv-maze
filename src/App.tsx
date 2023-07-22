/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, View } from "react-native";

import { Icon } from "@components";

export function App(): JSX.Element {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View>
        <Icon name="home" size={30} color="gray" />
      </View>
    </SafeAreaView>
  );
}
