import React from "react";

import { useImmerReducer } from "use-immer";

import { api } from "@services";
import { seasonStorage } from "@storage";

type Season = { seasonId: number; number: number };

interface State {
  seasons: Season[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: Season[] }
  | { type: "FETCH/FAILURE"; payload: Error };

const initialState: State = {
  seasons: [],
  loading: true,
  error: null,
};

function seasonsReducer(draft: State, action: Action): void {
  switch (action.type) {
    case "FETCH/INIT":
      draft.loading = true;
      draft.error = null;
      break;
    case "FETCH/SUCCESS":
      draft.seasons = action.payload;
      draft.loading = false;
      break;
    case "FETCH/FAILURE":
      draft.error = action.payload;
      draft.loading = false;
      break;
    default:
      if (__DEV__) {
        console.log("useSeasons: No action type found");
      }
  }
}

export function useSeasons(showId: number | undefined) {
  const [state, dispatch] = useImmerReducer(seasonsReducer, initialState);

  React.useEffect(() => {
    if (showId === undefined) {
      return;
    }

    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });

      try {
        let seasonsData = seasonStorage.getSeasonListByShowId(showId);

        if (seasonsData === null) {
          const seasonsFromApi = await api.getSeasonListByShowId({ showId, requestId });

          if (seasonsFromApi === null) {
            throw new Error("Fetching seasons failed.");
          }

          const seasonsObjects = seasonsFromApi.map(season => ({ seasonId: season.id, number: season.number })); // Mudar o campo id para seasonId
          seasonStorage.addSeasonList({ showId, seasons: seasonsObjects });
          seasonsData = seasonsObjects;
        }

        dispatch({ type: "FETCH/SUCCESS", payload: seasonsData });
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [dispatch, showId]);

  return state;
}
