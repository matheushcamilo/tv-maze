import React from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

import { Icon, LoadingOverlay, Screen } from "@components";
import { useEpisodeDetails } from "@features";
import { StackRootParamList } from "@routes";
import { palette, spacing } from "@themes";

type EpisodeDetailsScreenProps = NativeStackScreenProps<StackRootParamList, "EpisodeDetailsScreen">;

export function EpisodeDetailsScreen({ route }: EpisodeDetailsScreenProps) {
  const { episodeDetails, loading } = useEpisodeDetails(route.params?.id);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const systemFonts = React.useMemo(() => [...defaultSystemFonts, "Satoshi-Medium"], []);
  const windowWidth = useWindowDimensions().width;
  const contentWidth = React.useMemo(() => windowWidth - spacing.s16 * 2, [windowWidth]);

  const htmlProps = React.useMemo(() => {
    return {
      source: { html: episodeDetails?.summary || "" },
      contentWidth: contentWidth,
      baseStyle: styles.html,
      tagsStyles: { p: { margin: 0, padding: 0 } },
      systemFonts: systemFonts,
    };
  }, [episodeDetails?.summary, contentWidth, systemFonts]);

  return (
    <Screen canGoBack scrollable>
      <View style={styles.imageContainer}>
        {!imageLoaded && (
          <View style={styles.iconContainer}>
            <Icon color={palette.grayLighter} name="image" size={200} />
          </View>
        )}
        <Image
          source={{ uri: episodeDetails?.image.original }}
          style={styles.image}
          resizeMode="contain"
          onLoad={() => setImageLoaded(true)}
        />
      </View>

      <Text style={styles.title}>{episodeDetails?.name}</Text>
      <Text style={styles.subtitle}>
        {`Season ${episodeDetails?.season.toString().padStart(2, "0")}, Episode ${episodeDetails?.number
          .toString()
          .padStart(2, "0")}`}
      </Text>

      <Text style={styles.summary}>Summary</Text>
      {episodeDetails ? <RenderHTML {...htmlProps} /> : null}

      <LoadingOverlay visible={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.5,
    fontFamily: "Satoshi-Bold",
    color: palette.greenDark,
    marginBottom: spacing.s4,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.25,
    color: palette.green,
    marginBottom: spacing.s8,
  },
  imageContainer: {
    width: "100%",
    height: 200,
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
  html: {
    textAlign: "justify",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Satoshi-Medium",
  },
  summary: {
    fontFamily: "Satoshi-Medium",
    color: palette.green,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
});
