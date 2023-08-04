import React from "react";

import { render, fireEvent, screen } from "@testing-library/react-native";

import { Pagination } from "../Pagination/Pagination";

describe("Pagination", () => {
  beforeEach(() => {
    function TestWrapper() {
      const [page, setPage] = React.useState(1);
      return <Pagination page={page} onChangePage={setPage} />;
    }
    render(<TestWrapper />);
  });

  it("should go to the next page when Next button is pressed", () => {
    const buttonNext = screen.getByRole("button", { name: /next/i, disabled: false });
    fireEvent.press(buttonNext);

    const page = screen.getByRole("text", { name: /2/ });
    expect(page).toBeDefined();
  });

  it("should not go to the previous page when Previous button is pressed on page 1", () => {
    const buttonPrevious = screen.getByRole("button", { name: /previous/i, disabled: true });
    expect(buttonPrevious).toBeDefined();

    const buttonNext = screen.getByRole("button", { name: /next/i, disabled: false });
    fireEvent.press(buttonNext);

    const page = screen.getByRole("text", { name: /2/ });
    expect(page).toBeDefined();

    fireEvent.press(buttonPrevious);

    const updatedPage = screen.getByRole("text", { name: /1/ });
    expect(updatedPage).toBeDefined();
  });

  it("should disable the Next and Previous button if disabled prop is passed", () => {
    function DisabledTestWrapper() {
      const [page, setPage] = React.useState(1);
      return <Pagination page={page} onChangePage={setPage} disabled />;
    }
    render(<DisabledTestWrapper />);

    const buttonPrevious = screen.getByRole("button", { name: /previous/i, disabled: true });
    expect(buttonPrevious).toBeDefined();

    const buttonNext = screen.getByRole("button", { name: /next/i, disabled: true });
    expect(buttonNext).toBeDefined();
  });
});
