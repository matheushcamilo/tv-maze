import { MMKV_SEARCH_ENCRYPTION_KEY, MMKV_SEARCH_ID } from "@env";

import { Storage } from "./Storage";

class SearchResultsStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addSearch(name: string, ids: number[]): void {
    const key = this.normalizeKey(name);
    this.set(key, ids);
  }

  public getSearchByName(name: string): number[] | null {
    const key = this.normalizeKey(name);
    return this.get<number[]>(key);
  }

  public removeSearch(name: string): void {
    const key = this.normalizeKey(name);
    this.delete(key);
  }
}

export const searchResultsStorage = new SearchResultsStorage(MMKV_SEARCH_ID, MMKV_SEARCH_ENCRYPTION_KEY);
