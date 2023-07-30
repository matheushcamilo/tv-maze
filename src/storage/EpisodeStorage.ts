import { MMKV_EPISODE_ENCRYPTION_KEY, MMKV_EPISODE_ID } from "@env";

import { Storage } from "./Storage";

class EpisodeStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addEpisodes(seasonId: number, episodes: number[]): void {
    this.set(seasonId.toString(), episodes);
  }

  public getEpisodesBySeasonId(seasonId: number): number[] | null {
    return this.get<number[]>(seasonId.toString());
  }

  public removeEpisodes(seasonId: number): void {
    this.delete(seasonId.toString());
  }
}

export const episodeStorage = new EpisodeStorage(MMKV_EPISODE_ID, MMKV_EPISODE_ENCRYPTION_KEY);
