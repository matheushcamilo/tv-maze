import React from "react";

import { useImmerReducer } from "use-immer";

import { Show, Episode, api } from "@services";

export type ShowDetails = Show & {
  episodes: Episode[];
};

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

    const requestIdShow = api.generateRequestId();
    const requestIdSeasons = api.generateRequestId();

    dispatch({ type: "FETCH/INIT" });

    (async () => {
      try {
        const showPromise = api.getShowById({ showId: id, requestId: requestIdShow });
        const seasonsPromise = api.getSeasonsByShow({ showId: id, requestId: requestIdSeasons });
        const [show, seasons] = await Promise.all([showPromise, seasonsPromise]);

        if (!show || !seasons) {
          throw new Error("Show or seasons not fetched");
        }

        const episodePromises = seasons.map(season =>
          api.getEpisodesBySeason({ seasonId: season.id, requestId: api.generateRequestId() }),
        );
        const episodeResults = await Promise.all(episodePromises);

        const episodes = episodeResults.filter(Boolean).flat();

        const details: ShowDetails = { ...show, episodes };
        dispatch({ type: "FETCH/SUCCESS", payload: details });
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestIdShow);
      api.cancelRequest(requestIdSeasons);
    };
  }, [id, dispatch]);

  return state;
}
