type Image = {
  medium: string;
  original: string;
};

type Self = {
  href: string;
};

type Links = {
  self: Self;
};

type Country = {
  name: string;
  code: string;
  timezone: string;
};

type Network = {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
};

export type Days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type Schedule = {
  time: string;
  days: Days[];
};

type Rating = {
  average: number | null;
};

type Externals = {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
};

export type Episode = {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: Image;
  summary: string;
  _links: Links;
};

export type ResponseHeaders = {
  "access-control-allow-origin": string;
  "cache-control": string;
  "content-encoding": string;
  "content-type": string;
  date: string;
  server: string;
  vary: string;
};

export type SearchShowsResult = {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string | null;
    schedule: Schedule;
    rating: Rating;
    weight: number;
    network: Network | null;
    webChannel: Network | null;
    dvdCountry: string | null;
    externals: Externals;
    image: Image | null;
    summary: string | null;
    updated: number;
    _links: Links;
  };
};

export type Season = {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  network: Network | null;
  webChannel: Network | null;
  image: Image | null;
  summary: string;
  _links: Links;
};

export type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: Network | null;
  dvdCountry: string | null;
  externals: Externals;
  image: Image | null;
  summary: string | null;
  updated: number;
  _links: Links;
};
