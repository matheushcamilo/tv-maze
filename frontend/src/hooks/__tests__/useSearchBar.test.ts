import "react-native";
import { renderHook, act } from "@testing-library/react-hooks";

import { useSearchBar } from "../useSearchBar";

describe("useSearchBar hook", () => {
  it("should initialize with the initial value", () => {
    const { result } = renderHook(() => useSearchBar({ initialValue: "test" }));

    expect(result.current.value).toBe("test");
  });

  it("should update the value when onChangeText is called", () => {
    const { result } = renderHook(() => useSearchBar({ initialValue: "test" }));

    act(() => result.current.onChangeText("updated"));

    expect(result.current.value).toBe("updated");
  });
});
