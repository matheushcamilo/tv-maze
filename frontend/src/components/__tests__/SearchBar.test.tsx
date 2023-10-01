import React from "react";

import { render, fireEvent, screen } from "../../tests/test-utils";
import { SearchBar } from "../SearchBar/SearchBar";

const onChangeTextMock = jest.fn();

describe("SearchBar", () => {
  it("should render the search bar correctly", () => {
    render(<SearchBar value="" onChangeText={onChangeTextMock} />);

    const searchBar = screen.getByRole("search");
    expect(searchBar).toBeDefined();
  });

  it("should display placeholder text correctly", () => {
    render(<SearchBar value="" onChangeText={onChangeTextMock} />);

    const placeholderText = screen.getByPlaceholderText(/search for a series.../i);
    expect(placeholderText).toBeDefined();
  });

  it("should call onChangeText when text is entered", () => {
    render(<SearchBar value="" onChangeText={onChangeTextMock} />);

    const searchBar = screen.getByRole("search");
    fireEvent.changeText(searchBar, "new text");

    expect(onChangeTextMock).toHaveBeenCalledWith("new text");
  });

  it("should display correct text when 'value' prop changes", () => {
    render(<SearchBar value="Search Some Show" onChangeText={onChangeTextMock} />);

    const searchBar = screen.getByRole("search");
    expect(searchBar.props.value).toMatch(/search some show/i);

    fireEvent.changeText(searchBar, "new text");

    expect(onChangeTextMock).toHaveBeenCalledWith("new text");
  });
});
