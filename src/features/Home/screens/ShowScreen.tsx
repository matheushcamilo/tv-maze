import React from "react";

import { DrawerScreenProps } from "@react-navigation/drawer";

import { Screen, LoadingOverlay } from "@components";
import { DrawerRootParamList } from "@routes";

import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SeriesList } from "../components/SeriesList/SeriesList";
import { useGetShows } from "../hooks/useGetShows";
import { useSearchShows } from "../hooks/useSearchShows";

type ShowScreenProps = DrawerScreenProps<DrawerRootParamList, "ShowScreen">;

export function ShowScreen({}: ShowScreenProps) {
  const [page, setPage] = React.useState<number>(1);
  const { shows, loading, error } = useGetShows({ page });
  const { searchResults, searchBar, loading: searchLoading, error: searchError } = useSearchShows();

  const isSearching = searchBar.value.length > 0;

  if (error || searchError) {
    console.log(error || searchError);
  }

  return (
    <Screen>
      <SearchBar {...searchBar} />
      <SeriesList shows={isSearching ? searchResults : shows} />
      <Pagination page={page} onChangePage={setPage} disabled={isSearching} />
      {loading || searchLoading ? <LoadingOverlay visible={loading || searchLoading} /> : null}
    </Screen>
  );
}