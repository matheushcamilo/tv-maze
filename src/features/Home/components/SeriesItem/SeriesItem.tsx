import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { Icon } from "@components";

export interface SeriesItemProps {
  name: string;
  image: string;
  rating: number | null;
  language: string;
  status: string;
}

function ComponentMemoized({ image, language, name, rating, status }: SeriesItemProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!imageLoaded && <Icon color="#D3D3D3" name="image" size={80} />}
        {image ? (
          <Image
            style={StyleSheet.absoluteFillObject}
            onLoad={() => setImageLoaded(true)}
            source={{ uri: image }} // Check if image exists before accessing medium
            resizeMode="cover"
          />
        ) : null}
      </View>
      <View style={styles.description}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.descriptionContent}>{`Rating: ${rating ? rating.toFixed(1) : "Under Review"}`}</Text>
        <Text style={styles.descriptionContent}>Status: {status}</Text>
        <Text style={styles.descriptionContent}>Language: {language}</Text>
      </View>
    </View>
  );
}

const Memoized = React.memo(ComponentMemoized);
export { Memoized as SeriesItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 4,
    borderColor: "#98D4CE",
    borderWidth: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 4,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
    fontFamily: "Satoshi-Bold",
    color: "#126B62",
    marginBottom: 4,
  },
  descriptionContent: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Satoshi-Medium",
    color: "#808080",
  },
  description: {
    flex: 1,
  },
});
