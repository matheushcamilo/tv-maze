import { MMKV_SEASON_ENCRYPTION_KEY, MMKV_SEASON_ID } from "@env";

import { Storage } from "./Storage";

class SeasonStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addSeasons(showId: number, seasons: number[]): void {
    this.set(showId, seasons);
  }

  public getSeasonsByShowId(showId: number): number[] | null {
    return this.get<number[]>(showId);
  }

  public removeSeasons(showId: number): void {
    this.delete(showId);
  }
}

export const seasonStorage = new SeasonStorage(MMKV_SEASON_ID, MMKV_SEASON_ENCRYPTION_KEY);
