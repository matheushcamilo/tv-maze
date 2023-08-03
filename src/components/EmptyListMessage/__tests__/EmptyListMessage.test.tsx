import React from "react";

import { render } from "@testing-library/react-native";

import { EmptyListMessage } from "../EmptyListMessage";

describe("EmptyListMessage", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<EmptyListMessage />);

    const textElement = getByRole("text", { name: /no data available/i });
    expect(textElement).toBeTruthy();
  });
});
