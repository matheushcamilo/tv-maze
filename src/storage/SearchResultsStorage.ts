import { MMKV_SEARCH_ENCRYPTION_KEY, MMKV_SEARCH_ID } from "@env";

import { Storage } from "./Storage";

interface SearchAllResults {
  [name: string]: number[];
}

class SearchResultsStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  private normalizeKey(key: string): string {
    return key.trim().toLowerCase();
  }

  public addSearch(name: string, ids: number[]): void {
    const key = this.normalizeKey(name);
    this.set(key, ids);
  }

  public getSearch(name: string): number[] | null {
    const key = this.normalizeKey(name);
    return this.get<number[]>(key);
  }

  public removeSearch(name: string): void {
    const key = this.normalizeKey(name);
    this.delete(key);
  }

  public getAllSearches(): SearchAllResults {
    let searches: SearchAllResults = {};
    this.getAllKeys().forEach(key => {
      const ids = this.get<number[]>(key);
      if (ids !== null) {
        searches[key] = ids;
      }
    });

    return searches;
  }
}

export const searchResultsStorage = new SearchResultsStorage(MMKV_SEARCH_ID, MMKV_SEARCH_ENCRYPTION_KEY);
