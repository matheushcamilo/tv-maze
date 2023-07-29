import { MMKV_PAGE_ENCRYPTION_KEY, MMKV_PAGE_ID } from "@env";

import { Storage } from "./Storage";

export interface PageData {
  ids: number[];
}

class PageStorage extends Storage {
  constructor(id: string, encryptionKey: string) {
    super(id, encryptionKey);
  }

  public addPage(page: number, ids: number[]): void {
    this.set(page.toString(), { ids });
  }

  public getPage(page: number): PageData | null {
    return this.get<PageData>(page.toString());
  }

  public removePage(page: number): void {
    this.delete(page.toString());
  }

  public getIdsByPage(page: number): number[] | null {
    const pageData = this.getPage(page);

    if (pageData === null) {
      return null;
    }

    return pageData.ids;
  }

  public getAllPages(): PageData[] {
    return this.getAllKeys()
      .map(key => this.get<PageData>(key))
      .filter(pageData => pageData !== null) as PageData[];
  }
}

export const pageStorage = new PageStorage(MMKV_PAGE_ID, MMKV_PAGE_ENCRYPTION_KEY);
