import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { palette, spacing } from "@themes";

type Props = {
  genres: string[] | undefined;
};

export function Genres({ genres }: Props) {
  const genresString = React.useMemo(() => {
    return genres && genres.length > 0 ? genres.join(", ") : "No content.";
  }, [genres]);

  return (
    <View style={styles.genresContainer}>
      <Text style={styles.genres} accessibilityRole="text">
        Genres
      </Text>
      <Text style={styles.genresInfo} accessibilityRole="text">
        {genresString}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  genresContainer: {
    width: "100%",
    marginBottom: spacing.s4,
  },
  genres: {
    fontFamily: "Satoshi-Medium",
    color: palette.green,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  genresInfo: {
    fontFamily: "Satoshi-Medium",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
});
