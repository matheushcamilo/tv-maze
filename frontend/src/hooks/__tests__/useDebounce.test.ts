import "react-native";
import { renderHook, act } from "@testing-library/react-hooks";

import { useDebounce } from "../useDebounce";

describe("useDebounce hook", () => {
  it("should return the same value after delay", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce({ value, delay }), {
      initialProps: { value: "test", delay: 500 },
    });

    // Assert that the initial value is as expected
    expect(result.current.debouncedValue).toBe("test");

    // Update the value and assert it does not change immediately
    rerender({ value: "updated", delay: 500 });
    expect(result.current.debouncedValue).toBe("test");

    // Advance timers and assert the value updates after the delay
    act(() => jest.advanceTimersByTime(500));
    expect(result.current.debouncedValue).toBe("updated");
  });
});
