import React from "react";

import { useImmerReducer } from "use-immer";

import { useDebounce } from "@hooks";
import { ShowResponse, apiService } from "@services";

import { useSearchBar } from "./useSearchBar";

interface State {
  searchResults: ShowResponse[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: ShowResponse[] }
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
    if (debouncedValue) {
      dispatch({ type: "FETCH/INIT" });

      (async () => {
        try {
          const results = await apiService.searchShows(debouncedValue);
          const shows = results.map(result => result.show);
          dispatch({ type: "FETCH/SUCCESS", payload: shows });
        } catch (err) {
          dispatch({ type: "FETCH/FAILURE", payload: err as Error });
        }
      })();
    } else {
      dispatch({ type: "FETCH/SUCCESS", payload: [] });
    }

    return () => {
      apiService.cancelRequest();
    };
  }, [debouncedValue, dispatch]);

  return { ...state, searchBar };
}
