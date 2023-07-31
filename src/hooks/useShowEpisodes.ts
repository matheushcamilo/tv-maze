import React from "react";

import { useImmerReducer } from "use-immer";

import { Episode, api } from "@services";
import { episodeStorage } from "@storage";

interface State {
  episodes: Episode[];
  loading: boolean;
  error: Error | null;
}

type Action =
  | { type: "FETCH/INIT" }
  | { type: "FETCH/SUCCESS"; payload: Episode[] }
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
      if (__DEV__) {
        console.log("useShowEpisodes: No action type found");
      }
  }
}

function getEpisodesSelectors(state: State) {
  function groupEpisodesBySeason(): { title: string; data: Episode[] }[] {
    const episodesBySeason: { [key: number]: Episode[] } = {};
    state.episodes.forEach(episode => {
      if (!episodesBySeason[episode.season]) {
        episodesBySeason[episode.season] = [];
      }

      episodesBySeason[episode.season].push(episode);
    });

    return Object.entries(episodesBySeason).map(([seasonNumber, episodes]) => ({
      title: `Season ${seasonNumber.padStart(2, "0")}`,
      data: episodes,
    }));
  }

  return { groupEpisodesBySeason };
}

export function useShowEpisodes(id: number | undefined) {
  const [state, dispatch] = useImmerReducer(episodesReducer, initialState);

  React.useEffect(() => {
    if (!id) {
      return;
    }

    const requestId = api.generateRequestId();

    (async () => {
      dispatch({ type: "FETCH/INIT" });

      try {
        // Tentar buscar episódios do EpisodeStorage
        let episodesData = episodeStorage.getEpisodesBySeasonId(id);

        // Se os episódios não estão no EpisodeStorage, buscar da API
        if (episodesData === null) {
          const episodesFromApi = await api.getEpisodesBySeason({ seasonId: id, requestId });
          if (episodesFromApi === null) {
            throw new Error("Fetching episodes failed.");
          }

          // Adicionar episódios ao EpisodeStorage
          episodeStorage.addEpisodes(id, episodesFromApi);

          // Atualizar episodesData
          episodesData = episodesFromApi;
        }

        dispatch({ type: "FETCH/SUCCESS", payload: episodesData });
      } catch (err) {
        dispatch({ type: "FETCH/FAILURE", payload: err as Error });
      }
    })();

    return () => {
      api.cancelRequest(requestId);
    };
  }, [id, dispatch]);

  const selectors = getEpisodesSelectors(state);

  return { ...state, selectors };
}
