import React from "react";

import { useImmerReducer } from "use-immer";

import { EpisodeResponse, apiService } from "@services";

interface State {
  episodes: EpisodeResponse[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: EpisodeResponse[] }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  episodes: [],
  loading: false,
  error: null,
};

function episodesReducer(draft: State, action: Action): void {
  switch (action.type) {
    case "FETCH/INIT":
      draft.loading = true;
      draft.error = null;
      break;
    case "FETCH/SUCCESS":
      draft.episodes = action.payload;
      draft.loading = false;
      break;
    case "FETCH/FAILURE":
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      console.log("useShowEpisodes: No action type found");
  }
}

export function useShowEpisodes(id: number | undefined) {
  const [state, dispatch] = useImmerReducer(episodesReducer, initialState);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    dispatch({ type: "FETCH/INIT" });

    (async () => {
      try {
        const episodes = await apiService.getShowEpisodes(id);
        dispatch({ type: "FETCH/SUCCESS", payload: episodes });
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
