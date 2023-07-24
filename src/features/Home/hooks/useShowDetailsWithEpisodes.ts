import { EpisodeResponse } from "@services";

import { useShowDetails } from "./useShowDetails";
import { useShowEpisodes } from "./useShowEpisodes";

export function useShowDetailsWithEpisodes(showId: number | undefined) {
  const { showDetails, loading: showLoading, error: showError } = useShowDetails(showId);
  const { episodes, loading: episodesLoading, error: episodesError } = useShowEpisodes(showId);

  const loading = showLoading || episodesLoading;
  const error = showError || episodesError;

  // Group episodes by season
  const episodesBySeason: { [key: number]: EpisodeResponse[] } = {};
  episodes.forEach(episode => {
    if (!episodesBySeason[episode.season]) {
      episodesBySeason[episode.season] = [];
    }

    episodesBySeason[episode.season].push(episode);
  });

  return {
    showDetails,
    episodesBySeason,
    loading,
    error,
  };
}
