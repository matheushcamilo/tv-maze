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

  protected getData<T>(key: string): T | null {
    const storedData = this.storage.getString(key);

    if (storedData === undefined) {
      return null;
    }

    return JSON.parse(storedData) as T;
  }

  protected getAllKeys(): string[] {
    return this.storage.getAllKeys();
  }

  protected deleteData(key: string): void {
    this.storage.delete(key);
  }

  protected clearAllData(): void {
    this.storage.clearAll();
  }
}
