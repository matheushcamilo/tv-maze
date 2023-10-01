import React from "react";

import { useImmerReducer } from "use-immer";

import { Show, api } from "@services";
import { showStorage } from "@storage";

interface State {
  showDetails: Show | null;
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: Show }
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

    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });

      try {
        let show = showStorage.getShowById(id);

        if (show === null) {
          show = await api.getShowById({ showId: id, requestId });
          if (show === null) {
            throw new Error("Show not fetched.");
          }

          showStorage.addShow(show);
        }

        dispatch({ type: "FETCH/SUCCESS", payload: show });
      } catch (fetchError) {
        dispatch({ type: "FETCH/FAILURE", payload: fetchError as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [id, dispatch]);

  return state;
}
