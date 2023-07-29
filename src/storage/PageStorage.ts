import { MMKV_PAGE_ENCRYPTION_KEY, MMKV_PAGE_ID } from "@env";

import { Storage } from "./Storage";

class PageStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addPage(page: number, ids: number[]): void {
    this.set(page.toString(), ids);
  }

  public getIdsByPage(page: number): number[] | null {
    const data = this.get<{ ids: number[] }>(page.toString());
    return data ? data.ids : null;
  }

  public removePage(page: number): void {
    this.delete(page.toString());
  }
}

export const pageStorage = new PageStorage(MMKV_PAGE_ID, MMKV_PAGE_ENCRYPTION_KEY);
