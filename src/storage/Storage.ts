import { MMKV } from "react-native-mmkv";

export abstract class Storage {
  protected readonly storage: MMKV;

  constructor(id: string, encryptionKey: string) {
    this.storage = new MMKV({
      id,
      encryptionKey,
    });
  }

  protected setData({ key, data }: { key: string; data: object }): void {
    this.storage.set(key, JSON.stringify(data));
  }

  protected getData<T>(key: string): T | undefined {
    const storedData = this.storage.getString(key);

    if (storedData === undefined) {
      return undefined;
    }

    return JSON.parse(storedData) as T;
  }

  protected deleteData(key: string): void {
    this.storage.delete(key);
  }

  protected clearAllData(): void {
    this.storage.clearAll();
  }
}
