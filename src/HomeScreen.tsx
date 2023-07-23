import React from "react";

import { Screen, SeriesList, Pagination, LoadingOverlay } from "@components";
import { useGetShows } from "@hooks";

export function HomeScreen() {
  const [page, setPage] = React.useState<number>(1);
  const { shows, loading, error } = useGetShows({ page });

  if (error) {
    console.log(error);
  }

  return (
    <Screen>
      <SeriesList shows={shows} />
      <Pagination page={page} onChangePage={setPage} />
      {loading && <LoadingOverlay visible={loading} />}
    </Screen>
  );
}
