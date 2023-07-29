import { MMKV_SHOW_ENCRYPTION_KEY, MMKV_SHOW_ID } from "@env";
import { Show } from "@services"; // Importe o tipo Show da API

import { Storage } from "./Storage";

class ShowsStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addShow(show: Show): void {
    this.set(show.id.toString(), show);
  }

  public getShow(id: number): Show | null {
    return this.get<Show>(id.toString());
  }

  public removeShow(id: number): void {
    this.delete(id.toString());
  }

  public getAllShows(): Show[] {
    return this.getAllKeys()
      .map(key => this.get<Show>(key))
      .filter(show => show !== null) as Show[];
  }
}

export const showsStorage = new ShowsStorage(MMKV_SHOW_ID, MMKV_SHOW_ENCRYPTION_KEY);
