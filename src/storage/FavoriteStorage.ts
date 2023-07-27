import { MMKV_FAVORITES_ENCRYPTION_KEY, MMKV_FAVORITES_STORAGE_ID } from "@env";

import { Storage } from "./Storage";

class FavoriteStorage extends Storage {
  private static readonly FAVORITES_KEY = "favorites";

  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addToFavorites(showId: number): void {
    const favorites = this.getData<number[]>(FavoriteStorage.FAVORITES_KEY);

    if (!favorites) {
      return this.setData({ key: FavoriteStorage.FAVORITES_KEY, data: [showId] });
    }

    favorites.push(showId);
    this.setData({ key: FavoriteStorage.FAVORITES_KEY, data: favorites });
  }

  public removeFromFavoritesById(id: number): void {
    const favorites = this.getData<number[]>(FavoriteStorage.FAVORITES_KEY);

    if (favorites) {
      const updatedFavorites = favorites.filter(showId => showId !== id);
      this.setData({ key: FavoriteStorage.FAVORITES_KEY, data: updatedFavorites });
    }
  }

  public getAllFavorites(): number[] | null {
    return this.getData<number[]>(FavoriteStorage.FAVORITES_KEY);
  }

  public deleteAllFavorites(): void {
    this.deleteData(FavoriteStorage.FAVORITES_KEY);
  }
}

export const favoriteStorage = new FavoriteStorage(MMKV_FAVORITES_STORAGE_ID, MMKV_FAVORITES_ENCRYPTION_KEY);
