import { MMKV_SEASON_ENCRYPTION_KEY, MMKV_SEASON_ID } from "@env";

import { Storage } from "./Storage";

type SeasonObject = { seasonId: number; number: number };

class SeasonStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addSeasons(showId: number, seasons: SeasonObject[]): void {
    this.set(showId, seasons);
  }

  public getSeasonsByShowId(showId: number): SeasonObject[] | null {
    return this.get<SeasonObject[]>(showId);
  }

  public removeSeasons(showId: number): void {
    this.delete(showId);
  }
}

export const seasonStorage = new SeasonStorage(MMKV_SEASON_ID, MMKV_SEASON_ENCRYPTION_KEY);
