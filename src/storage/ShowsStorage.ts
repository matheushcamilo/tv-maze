import { MMKV_SHOW_ENCRYPTION_KEY, MMKV_SHOW_ID } from "@env";
import { Show } from "@services"; // Importe o tipo Show da API

import { Storage } from "./Storage";

class ShowStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addShow(show: Show): void {
    this.set(show.id.toString(), show);
  }

  public getShowById(id: number): Show | null {
    return this.get<Show>(id.toString());
  }

  public removeShowById(id: number): void {
    this.delete(id.toString());
  }
}

export const showStorage = new ShowStorage(MMKV_SHOW_ID, MMKV_SHOW_ENCRYPTION_KEY);
