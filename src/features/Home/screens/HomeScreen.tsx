import React from "react";

import { Screen, LoadingOverlay } from "@components";

import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SeriesList } from "../components/SeriesList/SeriesList";
import { useGetShows } from "../hooks/useGetShows";
import { useSearchShows } from "../hooks/useSearchShows";

export function HomeScreen() {
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
