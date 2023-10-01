import React from "react";

import { Show } from "@services";

import { render, screen } from "../../tests/test-utils";
import { SeriesList } from "../SeriesList/SeriesList";

const mockShows: Show[] = [
  {
    id: 1,
    url: "http://testShow1.com",
    name: "Test Show 1",
    type: "Scripted",
    language: "English",
    genres: ["Drama"],
    status: "Running",
    runtime: 60,
    averageRuntime: 60,
    premiered: "2023-01-01",
    ended: "",
    officialSite: null,
    schedule: {
      time: "20:00",
      days: ["Monday"],
    },
    rating: {
      average: 7,
    },
    weight: 100,
    network: null,
    webChannel: null,
    dvdCountry: null,
    externals: {
      tvrage: null,
      thetvdb: null,
      imdb: null,
    },
    image: {
      medium: "testImage1",
      original: "testImage1_original",
    },
    summary: "This is a test show 1",
    updated: 12345,
    _links: {
      self: {
        href: "http://testShow1.com",
      },
    },
  },
];

describe("SeriesList", () => {
  it("renders a list of shows", () => {
    render(<SeriesList shows={mockShows} />);

    const item = screen.getByRole("text", { name: /test show 1/i });
    expect(item).toBeDefined();
  });

  it("displays empty message when no shows are passed", () => {
    render(<SeriesList shows={[]} />);

    const item = screen.getByRole("text", { name: /no data available/i });
    expect(item).toBeDefined();
  });
});
