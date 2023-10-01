import { MMKV } from "react-native-mmkv";

describe("MMKV storage", () => {
  let storage: MMKV;

  beforeAll(() => {
    storage = new MMKV();
  });

  it("should store string value correctly", () => {
    storage.set("testString", "value");

    expect(storage.getString("testString")).toStrictEqual("value");
    expect(storage.getNumber("testString")).toBeUndefined();
    expect(storage.getBoolean("testString")).toBeUndefined();
  });

  it("should store number value correctly", () => {
    storage.set("testNumber", 99);

    expect(storage.getString("testNumber")).toBeUndefined();
    expect(storage.getNumber("testNumber")).toStrictEqual(99);
    expect(storage.getBoolean("testNumber")).toBeUndefined();
  });

  it("should store boolean value correctly", () => {
    storage.set("testBoolean", false);

    expect(storage.getString("testBoolean")).toBeUndefined();
    expect(storage.getNumber("testBoolean")).toBeUndefined();
    expect(storage.getBoolean("testBoolean")).toStrictEqual(false);
  });

  it("should return all keys correctly", () => {
    expect(storage.getAllKeys()).toEqual(expect.arrayContaining(["testString", "testNumber", "testBoolean"]));
  });

  it("should delete a key correctly", () => {
    storage.delete("testBoolean");

    expect(storage.contains("testBoolean")).toBeFalsy();
    expect(storage.getAllKeys()).toEqual(expect.arrayContaining(["testString", "testNumber"]));
  });

  it("should clear all keys correctly", () => {
    storage.clearAll();
    expect(storage.toString()).toStrictEqual("MMKV (mmkv.default): []");
  });
});
