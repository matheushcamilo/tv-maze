import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { Icon } from "@components";
import { palette } from "@themes";

type Props = {
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  uri: string | undefined;
};

export function ShowDetailsImage({ imageLoaded, setImageLoaded, uri }: Props) {
  function onLoad() {
    setImageLoaded(true);
  }

  return (
    <View style={styles.imageContainer}>
      {!imageLoaded && (
        <View style={styles.iconContainer}>
          <Icon color={palette.grayLighter} name="image" size={350} />
        </View>
      )}
      {uri ? <Image source={{ uri }} style={styles.image} resizeMode="contain" onLoad={onLoad} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    position: "absolute",
  },
});
