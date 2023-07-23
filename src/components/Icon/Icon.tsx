import React from "react";
import { ColorValue, GestureResponderEvent, Pressable } from "react-native";

import { HomeIcon, ImageIcon, ArrowLeftIcon } from "@assets";

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
      <Pressable hitSlop={10} onPress={onPress} accessibilityRole="button">
        <SVGIcon color={color} size={size} />
      </Pressable>
    );
  }

  return <SVGIcon color={color} size={size} />;
}

const iconRegistry = {
  "arrow-left": ArrowLeftIcon,
  home: HomeIcon,
  image: ImageIcon,
};

type IconName = keyof typeof iconRegistry;
