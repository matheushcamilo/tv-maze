import React from "react";
import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

import { Icon, Screen } from "@components";
import { useShowDetails } from "@features";
import { StackRootParamList } from "@routes";
import { palette, spacing } from "@themes";
import { formatDays } from "@utils";

type ShowDetailsScreenProps = NativeStackScreenProps<StackRootParamList, "ShowDetailsScreen">;

export function ShowDetailsScreen({ route }: ShowDetailsScreenProps) {
  const { navigate } = useNavigation();
  const { showDetails, loading } = useShowDetails(route.params?.id);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const windowWidth = useWindowDimensions().width;
  const contentWidth = React.useMemo(() => windowWidth - spacing.s16 * 2, [windowWidth]);
  const systemFonts = React.useMemo(() => [...defaultSystemFonts, "Satoshi-Medium"], []);

  const scheduleString = React.useMemo(() => {
    let _string = "";
    if (showDetails?.schedule?.time) {
      _string += `${showDetails.schedule.time}h`;
    }

    if (showDetails?.schedule?.time && showDetails?.schedule?.days?.length > 0) {
      _string += " | ";
    }

    if (showDetails?.schedule?.days && showDetails?.schedule?.days.length > 0) {
      _string += formatDays(showDetails?.schedule?.days);
    }

    if (showDetails?.schedule?.days?.length === 0 && !showDetails?.schedule?.time) {
      _string = "No content.";
    }

    return _string;
  }, [showDetails?.schedule]);

  const genresString = React.useMemo(() => {
    return showDetails?.genres?.length && showDetails?.genres?.length > 0
      ? showDetails?.genres.join(", ")
      : "No content.";
  }, [showDetails?.genres]);

  const htmlProps = React.useMemo(() => {
    return {
      source: { html: showDetails?.summary || "" },
      contentWidth: contentWidth,
      baseStyle: styles.html,
      tagsStyles: { p: { margin: 0, padding: 0 } },
      systemFonts: systemFonts,
    };
  }, [showDetails?.summary, contentWidth, systemFonts]);

  return (
    <Screen canGoBack scrollable>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.subtitle} accessibilityRole="text">
            Loading ...
          </Text>
        </View>
      ) : !showDetails ? null : (
        <>
          <View style={styles.imageContainer}>
            {!imageLoaded && (
              <View style={styles.iconContainer}>
                <Icon color={palette.grayLighter} name="image" size={350} />
              </View>
            )}
            <Image
              source={{ uri: showDetails.image.original }}
              style={styles.image}
              resizeMode="contain"
              onLoad={() => setImageLoaded(true)}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail" accessibilityRole="text">
              {showDetails.name}
            </Text>
          </View>

          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle} accessibilityRole="text">
              Schedule
            </Text>
            <Text style={styles.subtitleInfo} accessibilityRole="text">
              {scheduleString}
            </Text>
          </View>

          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle} accessibilityRole="text">
              Genres
            </Text>
            <Text style={styles.subtitleInfo} accessibilityRole="text">
              {genresString}
            </Text>
          </View>

          <Text style={styles.subtitle} accessibilityRole="text">
            Summary
          </Text>
          {showDetails.summary?.length > 0 ? (
            <RenderHTML {...htmlProps} />
          ) : (
            <Text style={styles.subtitleInfo} accessibilityRole="text">
              No content.
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              color={palette.greenDark}
              title="View Episodes by Season"
              onPress={() => navigate("EpisodesListScreen", { id: showDetails?.id })}
            />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    marginTop: spacing.s36,
    marginBottom: spacing.s4,
  },
  title: {
    fontFamily: "Satoshi-Bold",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.5,
    color: palette.green,
  },
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
  subtitleContainer: {
    width: "100%",
    marginBottom: spacing.s4,
  },
  subtitle: {
    fontFamily: "Satoshi-Medium",
    color: palette.green,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  subtitleInfo: {
    fontFamily: "Satoshi-Medium",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  html: {
    textAlign: "justify",
    color: palette.grayDark,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Satoshi-Medium",
  },
  iconContainer: {
    position: "absolute",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    marginTop: spacing.s36,
  },
});
