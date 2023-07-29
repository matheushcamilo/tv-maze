import stringify from "json-stringify-safe";
import { MMKV } from "react-native-mmkv";

export interface StorageConstructor {
  id: string;
  encryptionKey: string;
}

type Listener = (key: string) => void;

export abstract class Storage {
  protected readonly storage: MMKV;
  private listeners: Listener[] = [];

  constructor(id: string, encryptionKey: string) {
    this.storage = new MMKV({
      id,
      encryptionKey,
    });
  }

  protected set(key: string, data: unknown): void {
    let json: string;
    try {
      json = stringify(data);
    } catch (error) {
      if (__DEV__) {
        console.error("Invalid data:", data);
      }

      throw new Error("Invalid data. Could not convert to JSON string.");
    }

    this.storage.set(key, json);
    this.notifyListeners(key);
  }

  protected get<T>(key: string): T | null {
    const storedData = this.storage.getString(key);
    if (storedData === undefined) {
      return null;
    }

    return JSON.parse(storedData) as T;
  }

  protected getAllKeys(): string[] {
    return this.storage.getAllKeys();
  }

  protected delete(key: string): void {
    this.storage.delete(key);
    this.notifyListeners(key);
  }

  protected clearAll(): void {
    this.storage.clearAll();
    this.listeners = [];
  }

  protected addListener(listener: Listener): void {
    this.listeners.push(listener);
  }

  protected removeListener(listener: Listener): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(key: string): void {
    for (let listener of this.listeners) {
      listener(key);
    }
  }

  protected normalizeKey(key: string): string {
    return key.trim().toLowerCase();
  }
}
