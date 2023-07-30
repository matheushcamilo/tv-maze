import { MMKV_SEARCH_ENCRYPTION_KEY, MMKV_SEARCH_ID } from "@env";

import { Storage } from "./Storage";

class SearchResultsStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addSearch(name: string, ids: number[]): void {
    this.set(name, ids);
  }

  public getSearchByName(name: string): number[] | null {
    return this.get<number[]>(name);
  }

  public removeSearch(name: string): void {
    this.delete(name);
  }
}

export const searchResultsStorage = new SearchResultsStorage(MMKV_SEARCH_ID, MMKV_SEARCH_ENCRYPTION_KEY);
