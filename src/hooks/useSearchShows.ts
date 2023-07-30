import React from "react";

import { useImmerReducer } from "use-immer";

import { useDebounce } from "@hooks";
import { Show, api } from "@services";
import { searchResultsStorage, showStorage } from "@storage";

import { useSearchBar } from "./useSearchBar";

interface State {
  searchResults: Show[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: Show[] }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  searchResults: [],
  loading: false,
  error: null,
};

function searchReducer(draft: State, action: Action): void {
  switch (action.type) {
    case "FETCH/INIT":
      draft.loading = true;
      draft.error = null;
      break;
    case "FETCH/SUCCESS":
      draft.searchResults = action.payload;
      draft.loading = false;
      break;
    case "FETCH/FAILURE":
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      if (__DEV__) {
        console.log("useSearchShows: No action type found");
      }
  }
}

export function useSearchShows() {
  const searchBar = useSearchBar({ initialValue: "" });
  const { debouncedValue } = useDebounce(searchBar);
  const [state, dispatch] = useImmerReducer(searchReducer, initialState);

  React.useEffect(() => {
    if (!debouncedValue) {
      return dispatch({ type: "FETCH/SUCCESS", payload: [] });
    }

    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });

      let shows: Show[] = [];
      const idsFromStorage = searchResultsStorage.getSearchByName(debouncedValue);
      if (idsFromStorage !== null) {
        shows = idsFromStorage.map(id => showStorage.getShowById(id)).filter(show => show !== null) as Show[];
      } else {
        try {
          const results = await api.searchShowsByName({ name: debouncedValue, requestId });
          shows = results ? results.map(result => result.show) : [];

          const ids = shows.map(show => show.id);
          searchResultsStorage.addSearch(debouncedValue, ids);
          shows.forEach(show => showStorage.addShow(show));
        } catch (err) {
          return dispatch({ type: "FETCH/FAILURE", payload: err as Error });
        }
      }

      dispatch({ type: "FETCH/SUCCESS", payload: shows });
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [debouncedValue, dispatch]);

  return { ...state, searchBar };
}
