import React from "react";
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "@components";
import { useShowEpisodes } from "@hooks";
import { StackRootParamList } from "@routes";
import { EpisodeResponse } from "@services";
import { palette, spacing } from "@themes";

type EpisodesListScreenProps = NativeStackScreenProps<StackRootParamList, "EpisodesListScreen">;

type SectionHeader = (info: {
  section: SectionListData<
    EpisodeResponse,
    {
      title: string;
      data: EpisodeResponse[];
    }
  >;
}) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;

type RenderItem = SectionListRenderItem<
  EpisodeResponse,
  {
    title: string;
    data: EpisodeResponse[];
  }
>;

export function EpisodesListScreen({ route, navigation }: EpisodesListScreenProps) {
  const { selectors } = useShowEpisodes(route.params?.id);

  const sections = selectors.groupEpisodesBySeason();

  const renderSectionHeader: SectionHeader = ({ section: { title } }) => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title} accessibilityRole="text">
          {title}
        </Text>
      </View>
    );
  };

  const renderItem: RenderItem = ({ item }) => {
    function navigateToEpisodeDetailsScreen() {
      navigation.navigate("EpisodeDetailsScreen", { id: item.id });
    }

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={navigateToEpisodeDetailsScreen}>
        <Text style={[styles.item, styles.episode]} accessibilityRole="text">
          {`Episode ${item.number.toString().padStart(2, "0")}`}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail" accessibilityRole="text">
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Screen canGoBack>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id.toString()}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: palette.greenDark,
    padding: spacing.s8,
    borderRadius: 4,
    marginBottom: spacing.s12,
    alignItems: "center",
  },
  title: {
    fontFamily: "Satoshi-Bold",
    color: palette.white,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.25,
  },
  itemContainer: {
    marginBottom: spacing.s12,
    paddingVertical: spacing.s8,
    paddingHorizontal: spacing.s4,
    backgroundColor: palette.greenLight,
    borderRadius: 4,
  },
  item: {
    fontFamily: "Satoshi-Bold",
    fontSize: 18,
    lineHeight: 24,
    color: palette.grayExtraLight,
  },
  episode: {
    fontFamily: "Satoshi-Medium",
    color: palette.greenDark,
  },
});
