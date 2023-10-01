import React from "react";

import { render, fireEvent, screen } from "../../tests/test-utils";
import { Pagination } from "../Pagination/Pagination";

describe("Pagination", () => {
  let onNextPage: jest.Mock;
  let onPreviousPage: jest.Mock;

  beforeEach(() => {
    onNextPage = jest.fn();
    onPreviousPage = jest.fn();

    render(<Pagination page={1} onNextPage={onNextPage} onPreviousPage={onPreviousPage} />);
  });

  it("should call the correct function when Next button is pressed", () => {
    const buttonNext = screen.getByRole("button", { name: /next/i });
    fireEvent.press(buttonNext);

    expect(onNextPage).toHaveBeenCalled();
  });

  it("should not call the function when Previous button is pressed on page 1", () => {
    const buttonPrevious = screen.getByRole("button", { name: /previous/i });
    fireEvent.press(buttonPrevious);

    expect(onPreviousPage).not.toHaveBeenCalled();
  });

  it("should disable the Next and Previous button if disabled prop is passed", () => {
    render(<Pagination page={1} onNextPage={onNextPage} onPreviousPage={onPreviousPage} disabled />);

    const buttonPrevious = screen.getByRole("button", { name: /previous/i });
    expect(buttonPrevious).toBeDisabled();

    const buttonNext = screen.getByRole("button", { name: /next/i });
    expect(buttonNext).toBeDisabled();
  });
});
