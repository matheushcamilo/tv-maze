import { VALID_DAYS, formatDays } from "../formatDays";

describe("formatDays", () => {
  it("should return an empty string for an empty array", () => {
    expect(formatDays([])).toBe("");
  });

  it("should return the full day name for a single day", () => {
    expect(formatDays(["Monday"])).toBe("Monday");
  });

  it("should return 'Mon to Sun' for all days", () => {
    expect(formatDays(VALID_DAYS)).toBe("Mon to Sun");
  });

  it("should return 'Mon to Fri' for weekdays", () => {
    expect(formatDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])).toBe("Mon to Fri");
  });

  it("should return abbreviated days joined by ' - ' for a random selection of days", () => {
    expect(formatDays(["Monday", "Wednesday", "Friday"])).toBe("Mon - Wed - Fri");
  });

  // This test will fail at compile-time due to TypeScript's type-checking.
  // But for the sake of demonstration, we'll include it.
  it("should throw an error for an invalid day", () => {
    // @ts-ignore
    expect(() => formatDays(["InvalidDay"])).toThrow();
  });
});
