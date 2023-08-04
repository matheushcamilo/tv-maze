import React from "react";

import { render, screen } from "../../tests/test-utils";
import { EmptyListMessage } from "../EmptyListMessage/EmptyListMessage";

describe("EmptyListMessage", () => {
  it("renders correctly", () => {
    render(<EmptyListMessage />);

    const textElement = screen.getByRole("text", { name: /no data available/i });
    expect(textElement).toBeDefined();
  });
});
