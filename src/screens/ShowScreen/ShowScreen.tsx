import React from "react";
import { StyleSheet } from "react-native";

import { DrawerScreenProps } from "@react-navigation/drawer";

import { Screen, LoadingOverlay, Pagination, SeriesList, SearchBar } from "@components";
import { useSearchShows, useShows } from "@hooks";
import { DrawerRootParamList } from "@routes";
import { spacing } from "@themes";

type ShowScreenProps = DrawerScreenProps<DrawerRootParamList, "ShowScreen">;

export function ShowScreen({}: ShowScreenProps) {
  const [page, setPage] = React.useState<number>(1);
  const { shows, loading, error } = useShows({ page });
  const { searchResults, searchBar, loading: searchLoading, error: searchError } = useSearchShows();

  const isSearching = searchBar.value.length > 0;

  if (error || searchError) {
    console.log(error || searchError);
  }

  return (
    <Screen style={styles.container}>
      <SearchBar {...searchBar} />
      <SeriesList shows={isSearching ? searchResults : shows} />
      <Pagination page={page} onChangePage={setPage} disabled={isSearching} />
      {loading || searchLoading ? <LoadingOverlay visible={loading || searchLoading} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s12,
  },
});
