import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Icon } from "@components";
import { palette, spacing } from "@themes";

export interface SeriesItemProps {
  showId: number;
  name: string;
  image: string;
  rating: number | null;
  language: string;
  status: string;
}

function ComponentMemoized({ showId, image, language, name, rating, status }: SeriesItemProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const navigation = useNavigation();

  function handlePress() {
    navigation.navigate("ShowDetailsScreen", { showId });
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {!imageLoaded && <Icon color={palette.grayLighter} name="image" size={80} />}
          {image ? (
            <Image
              style={StyleSheet.absoluteFillObject}
              onLoad={() => setImageLoaded(true)}
              source={{ uri: image }}
              resizeMode="cover"
              accessibilityRole="image"
            />
          ) : null}
        </View>
        <View style={styles.description}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail" accessibilityRole="text">
            {name}
          </Text>
          <Text style={styles.descriptionContent} accessibilityRole="text">{`Rating: ${
            rating ? rating.toFixed(1) : "Under Review"
          }`}</Text>
          <Text style={styles.descriptionContent} accessibilityRole="text">
            Status: {status}
          </Text>
          <Text style={styles.descriptionContent} accessibilityRole="text">
            Language: {language}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const Memoized = React.memo(ComponentMemoized);
export { Memoized as SeriesItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.s12,
    borderRadius: 4,
    borderColor: palette.greenLight,
    borderWidth: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: spacing.s4,
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
    color: palette.greenDark,
    marginBottom: spacing.s4,
  },
  descriptionContent: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Satoshi-Medium",
    color: palette.gray,
  },
  description: {
    flex: 1,
  },
});
