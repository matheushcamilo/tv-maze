import React from "react";

import { useImmerReducer } from "use-immer";

import { ShowDetails, apiService } from "@services";

interface State {
  showDetails: ShowDetails | null;
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: ShowDetails }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  showDetails: null,
  loading: false,
  error: null,
};

function detailsReducer(draft: State, action: Action): void {
  switch (action.type) {
    case "FETCH/INIT":
      draft.loading = true;
      draft.error = null;
      break;
    case "FETCH/SUCCESS":
      draft.showDetails = action.payload;
      draft.loading = false;
      break;
    case "FETCH/FAILURE":
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      if (__DEV__) {
        console.log("useShowDetails: No action type found");
      }
  }
}

export function useShowDetails(id: number | undefined) {
  const [state, dispatch] = useImmerReducer(detailsReducer, initialState);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    dispatch({ type: "FETCH/INIT" });

    (async () => {
      try {
        const details = await apiService.getShowDetails(id);
        if (details) {
          dispatch({ type: "FETCH/SUCCESS", payload: details });
        }
      } catch (fetchError) {
        dispatch({ type: "FETCH/FAILURE", payload: fetchError as Error });
      }
    })();

    return () => {
      apiService.cancelRequest();
    };
  }, [id, dispatch]);

  return state;
}
