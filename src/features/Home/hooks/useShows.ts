import React from "react";

import { useImmerReducer } from "use-immer";

import { ShowResponse, apiService } from "@services";

interface State {
  shows: ShowResponse[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: ShowResponse[] }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  shows: [],
  loading: true,
  error: null,
};

function showsReducer(draft: State, action: Action): void {
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
      console.log("useGetShows: No action type found");
  }
}

export function useShows({ page }: { page: number }) {
  const [state, dispatch] = useImmerReducer(showsReducer, initialState);

  React.useEffect(() => {
    (async () => {
      dispatch({ type: "FETCH/INIT" });
      try {
        const showsData = await apiService.getShows(page);
        dispatch({ type: "FETCH/SUCCESS", payload: showsData });
      } catch (fetchError) {
        dispatch({ type: "FETCH/FAILURE", payload: fetchError as Error });
      }
    })();

    return () => {
      apiService.cancelRequest();
    };
  }, [dispatch, page]);

  return state;
}
