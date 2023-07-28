import React from "react";

import { useImmerReducer } from "use-immer";

import { Show, api } from "@services";

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

function showsByPageReducer(draft: State, action: Action): void {
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

export function useShowsByPage({ page }: { page: number }) {
  const [state, dispatch] = useImmerReducer(showsByPageReducer, initialState);

  React.useEffect(() => {
    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });
      try {
        const showsData = await api.getShowsByPage({ page, requestId });
        if (showsData === null) {
          throw new Error("Fetching shows failed.");
        }

        dispatch({ type: "FETCH/SUCCESS", payload: showsData });
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
