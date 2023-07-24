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
import { useShowEpisodes } from "@features";
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

type Item = SectionListRenderItem<
  EpisodeResponse,
  {
    title: string;
    data: EpisodeResponse[];
  }
>;

export function EpisodesListScreen({ route }: EpisodesListScreenProps) {
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

  const renderItem: Item = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={[styles.item, styles.episode]} accessibilityRole="text">
          {`Episode ${item.number.toString().padStart(2, "0")}:`}
        </Text>
        <Text style={styles.item} accessibilityRole="text">
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
    flexDirection: "row",
    marginBottom: spacing.s12,
    paddingVertical: spacing.s12,
    paddingHorizontal: spacing.s4,
    backgroundColor: palette.greenLight,
    borderRadius: 4,
  },
  item: {
    fontFamily: "Satoshi-Bold",
    fontSize: 16,
    lineHeight: 22,
    color: palette.grayExtraLight,
  },
  episode: {
    marginRight: spacing.s8,
    fontFamily: "Satoshi-Medium",
    color: palette.greenDark,
  },
});
