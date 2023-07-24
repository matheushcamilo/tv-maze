import React from "react";

import { useImmerReducer } from "use-immer";

import { EpisodeDetailsResponse, apiService } from "@services";

interface State {
  episodeDetails: EpisodeDetailsResponse | null;
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: EpisodeDetailsResponse }
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
      console.log("useEpisodeDetails: No action type found");
  }
}

export function useEpisodeDetails(id: number | undefined) {
  const [state, dispatch] = useImmerReducer(episodeDetailsReducer, initialState);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    dispatch({ type: "FETCH/INIT" });

    (async () => {
      try {
        const episodeDetails = await apiService.getEpisodeDetails(id);
        if (episodeDetails) {
          dispatch({ type: "FETCH/SUCCESS", payload: episodeDetails });
        } else {
          throw new Error("Episode details not found.");
        }
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      apiService.cancelRequest();
    };
  }, [id, dispatch]);

  return state;
}
