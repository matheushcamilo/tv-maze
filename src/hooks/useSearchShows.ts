import React from "react";

import { useImmerReducer } from "use-immer";

import { useDebounce } from "@hooks";
import { Show, api } from "@services";

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
    dispatch({ type: "FETCH/INIT" });

    (async () => {
      try {
        const results = await api.searchShowsByName({ name: debouncedValue, requestId });
        const shows = results ? results.map(result => result.show) : [];
        dispatch({ type: "FETCH/SUCCESS", payload: shows });
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [debouncedValue, dispatch]);

  return { ...state, searchBar };
}
