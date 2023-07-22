import React from "react";
import { ColorValue, GestureResponderEvent, Pressable } from "react-native";

import { HomeIcon } from "@assets";

export interface IconBase {
  size: number;
  color: ColorValue;
}

export interface IconProps extends IconBase {
  name: IconName;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

export function Icon({ name, color, size, onPress }: IconProps) {
  const SVGIcon = iconRegistry[name];

  if (onPress) {
    return (
      <Pressable hitSlop={10} onPress={onPress}>
        <SVGIcon color={color} size={size} />
      </Pressable>
    );
  }

  return <SVGIcon color={color} size={size} />;
}

const iconRegistry = {
  home: HomeIcon,
};

type IconName = keyof typeof iconRegistry;
