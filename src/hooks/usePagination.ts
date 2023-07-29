import React from "react";

import { useImmerReducer } from "use-immer";

import { Show, api } from "@services";
import { pageStorage, showsStorage } from "@storage";

interface State {
  shows: Show[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: Show[] }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  shows: [],
  loading: true,
  error: null,
};

function paginationReducer(draft: State, action: Action): void {
  switch (action.type) {
    case "FETCH/INIT":
      draft.loading = true;
      draft.error = null;
      break;
    case "FETCH/SUCCESS":
      draft.shows = action.payload;
      draft.loading = false;
      break;
    case "FETCH/FAILURE":
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      if (__DEV__) {
        console.log("useGetShows: No action type found");
      }
  }
}

export function usePagination(page: number) {
  const [state, dispatch] = useImmerReducer(paginationReducer, initialState);

  React.useEffect(() => {
    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });
      const idsByPage = pageStorage.getIdsByPage(page);

      try {
        let showsData;
        if (idsByPage === null) {
          // Fetch data from API
          showsData = await api.getShowsByPage({ page, requestId });

          if (showsData === null) {
            throw new Error("Fetching shows failed.");
          }
          // Save the fetched data to storage
          const ids = showsData.map(show => show.id);
          pageStorage.addPage(page, ids);
          showsData.forEach(show => showsStorage.addShow(show));
        } else {
          // Retrieve data from storage
          showsData = idsByPage.map(id => showsStorage.getShow(id)).filter(show => show !== null) as Show[];
        }

        dispatch({ type: "FETCH/SUCCESS", payload: showsData.slice(0, 10) });
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [dispatch, page]);

  return state;
}
