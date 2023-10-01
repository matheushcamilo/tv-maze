import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { EmptyListMessage, LoadingOverlay, Screen } from "@components";
import { useSeasons } from "@hooks";
import { StackRootParamList } from "@routes";
import { palette, spacing } from "@themes";

type SeasonListScreenProps = NativeStackScreenProps<StackRootParamList, "SeasonListScreen">;
type Season = { seasonId: number; number: number };

export function SeasonListScreen({ route, navigation }: SeasonListScreenProps) {
  const flatListRef = React.useRef<FlatList>(null);
  const { seasons, loading } = useSeasons(route.params?.seasonId);

  const renderItem: ListRenderItem<Season> = ({ item }) => {
    function navigateToEpisodeListScreen() {
      navigation.navigate("EpisodesListScreen", { seasonId: item.seasonId });
    }

    return (
      <TouchableOpacity style={styles.titleContainer} onPress={navigateToEpisodeListScreen}>
        <Text style={styles.title} accessibilityRole="text">
          {`Season ${item.number.toString().padStart(2, "0")}`}
        </Text>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [seasons]);

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  return (
    <Screen canGoBack>
      <FlatList
        ref={flatListRef}
        data={seasons}
        keyExtractor={item => item?.seasonId?.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyListMessage />}
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
});
