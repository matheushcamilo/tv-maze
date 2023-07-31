import { MMKV_EPISODE_ENCRYPTION_KEY, MMKV_EPISODE_ID } from "@env";
import { Episode } from "@services";

import { Storage } from "./Storage";

class EpisodeStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addEpisodes(seasonId: number, episodes: Episode[]): void {
    this.set(seasonId, episodes);
  }

  public getEpisodesBySeasonId(seasonId: number): Episode[] | null {
    return this.get<Episode[]>(seasonId);
  }

  public removeEpisodes(seasonId: number): void {
    this.delete(seasonId);
  }
}

export const episodeStorage = new EpisodeStorage(MMKV_EPISODE_ID, MMKV_EPISODE_ENCRYPTION_KEY);
