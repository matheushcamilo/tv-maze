import React from "react";
import { StyleSheet } from "react-native";

import { DrawerScreenProps } from "@react-navigation/drawer";

import { Screen, LoadingOverlay, Pagination, SeriesList, SearchBar } from "@components";
import { useSearchShows, usePagination } from "@hooks";
import { DrawerRootParamList } from "@routes";
import { spacing } from "@themes";

type HomeScreenProps = DrawerScreenProps<DrawerRootParamList, "HomeScreen">;

export function HomeScreen({}: HomeScreenProps) {
  const [page, setPage] = React.useState<number>(1);
  const { shows, loading, error } = usePagination(page);
  const { searchResults, searchBar, loading: searchLoading, error: searchError } = useSearchShows();

  const isSearching = searchBar.value.length > 0;

  const onPreviousPage = () => {
    setPage(prevPage => Math.max(1, prevPage - 1));
  };

  const onNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  if ((error || searchError) && __DEV__) {
    console.log(error || searchError);
  }

  if (loading || searchLoading) {
    return <LoadingOverlay visible={loading || searchLoading} />;
  }

  return (
    <Screen style={styles.container}>
      <SearchBar {...searchBar} />
      <SeriesList shows={isSearching ? searchResults : shows} />
      <Pagination page={page} onNextPage={onNextPage} onPreviousPage={onPreviousPage} disabled={isSearching} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s12,
  },
});
