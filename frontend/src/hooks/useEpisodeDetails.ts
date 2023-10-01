import React from "react";

import { useImmerReducer } from "use-immer";

import { Episode, api } from "@services";

interface State {
  episodeDetails: Episode | null;
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: Episode }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  episodeDetails: null,
  loading: false,
  error: null,
};

function episodeDetailsReducer(draft: State, action: Action): void {
  switch (action.type) {
    case "FETCH/INIT":
      draft.loading = true;
      draft.error = null;
      break;
    case "FETCH/SUCCESS":
      draft.episodeDetails = action.payload;
      draft.loading = false;
      break;
    case "FETCH/FAILURE":
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      if (__DEV__) {
        console.log("useEpisodeDetails: No action type found");
      }
  }
}

export function useEpisodeDetails(id: number | undefined) {
  const [state, dispatch] = useImmerReducer(episodeDetailsReducer, initialState);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });

      try {
        const episodeDetails = await api.getEpisodeById({ episodeId: id, requestId });
        if (episodeDetails === null) {
          throw new Error("Episode details not found.");
        }

        dispatch({ type: "FETCH/SUCCESS", payload: episodeDetails });
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [id, dispatch]);

  return state;
}
