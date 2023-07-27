import { MMKV_CACHE_ENCRYPTION_KEY, MMKV_CACHE_STORAGE_ID } from "@env";

import { Storage } from "./Storage";
import { CacheItem } from "./storage-types";

class CacheStorage extends Storage {
  private static readonly ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public getFromCacheByKey<T>(key: string): T | null {
    const data = this.getData<CacheItem>(key);

    if (data) {
      if (Date.now() - data.timestamp < CacheStorage.ONE_WEEK_IN_MILLISECONDS) {
        return data.value;
      }

      // If the data is older than a week, remove it from the cache
      this.deleteData(key);
    }

    return null;
  }

  public setToCacheByKey<T>({ key, data }: { key: string; data: T }): void {
    this.setData({ key, data: { value: data, timestamp: Date.now() } });
  }

  public getAllCacheKeys(): string[] {
    return this.getAllKeys();
  }

  public deleteAllCache(): void {
    this.clearAllData();
  }
}

export const cacheStorage = new CacheStorage(MMKV_CACHE_STORAGE_ID, MMKV_CACHE_ENCRYPTION_KEY);
