import React from "react";

import { render, fireEvent, screen } from "../../tests/test-utils";
import { Icon, IconProps } from "../Icon/Icon";

const defaultProps: IconProps = {
  name: "home",
  color: "black",
  size: 20,
  onPress: jest.fn(),
};
const updatedDefaultProps = Object.assign({}, defaultProps, { onPress: undefined });

describe("Icon Component", () => {
  it("renders correctly", () => {
    render(<Icon {...defaultProps} />);

    const iconElement = screen.getByTestId("icon-home");
    expect(iconElement).toBeDefined();
  });

  it("handles onPress correctly", () => {
    render(<Icon {...defaultProps} />);

    const iconElement = screen.getByRole("button");
    fireEvent.press(iconElement);

    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it("renders without onPress correctly", () => {
    render(<Icon {...updatedDefaultProps} />);

    const iconElement = screen.getByTestId("icon-home");
    expect(iconElement).toBeDefined();
  });
});
