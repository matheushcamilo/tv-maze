import React from "react";
import { Text } from "react-native";

import { Screen } from "@components";

export function EpisodesListScreen() {
  return (
    <Screen canGoBack>
      <Text>EpisodesListScreen</Text>
    </Screen>
  );
}

{
  /* <SectionList
        sections={Object.keys(episodesBySeason).map((season: string) => ({
          title: `Season ${season}`,
          data: episodesBySeason[Number(season)],
        }))}
        keyExtractor={(item: EpisodeResponse, index: number) => `${item.season}-${item.number}-${index}`}
        renderItem={({ item }) => <Text>{`Episode ${item.number}: ${item.name}`}</Text>}
        renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: "bold" }}>{title}</Text>}
      /> */
}
