import "react-native";
import { renderHook } from "@testing-library/react-hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSafeArea } from "../useSafeArea";

describe("useSafeArea hook", () => {
  it("returns the max value between the safe area insets and spacing.s20", () => {
    const mockInsets = { top: 10, bottom: 30 };

    // Mock the useSafeAreaInsets function
    (useSafeAreaInsets as jest.Mock).mockImplementation(() => mockInsets);

    const { result } = renderHook(() => useSafeArea());

    // Assuming spacing.s20 is 20
    expect(result.current.top).toBe(20); // Because 20 (spacing.s20) > 10 (mockInsets.top)
    expect(result.current.bottom).toBe(30); // Because 30 (mockInsets.bottom) > 20 (spacing.s20)
  });
});
