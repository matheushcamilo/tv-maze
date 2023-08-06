import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios";
import uuid from "react-native-uuid";

import { BASE_URL } from "@env";

import { Show, Season, Episode, SearchShowsResult } from "./services-types";

type GetProps = { url: string; config?: AxiosRequestConfig; requestId: string };
type ShowListProps = { page: number; requestId: string };
type EpisodeListProps = { seasonId: number; requestId: string };
type SearchShowListProps = { queryName: string; requestId: string };
type ShowByIdProps = { showId: number; requestId: string };
type EpisodeByIdProps = { episodeId: number; requestId: string };

class ApiService {
  private readonly axios: AxiosInstance;
  private readonly cancelTokenSources: Map<string, CancelTokenSource>;

  constructor(private readonly baseURL: string, private readonly timeout = 10000) {
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });
    this.cancelTokenSources = new Map();
  }

  private createCancelTokenSource(requestId: string): CancelTokenSource {
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);

    return source;
  }

  public cancelRequest(requestId: string): void {
    const source = this.cancelTokenSources.get(requestId);

    if (!source) {
      return;
    }

    source.cancel("Operation canceled by the user.");
    this.cancelTokenSources.delete(requestId);
  }

  public generateRequestId(): string {
    return uuid.v4().toString();
  }

  private async get<T>({ url, config = {}, requestId }: GetProps): Promise<T | null> {
    const source = this.createCancelTokenSource(requestId);

    try {
      const { data } = await this.axios.get<T>(url, { ...config, cancelToken: source.token });
      return data;
    } catch (error) {
      if (!__DEV__) {
        return null;
      }

      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
        return null;
      }

      console.error(error);
      return null;
    } finally {
      this.cancelTokenSources.delete(requestId);
    }
  }

  //  HomeScreen
  public async getShowListByPage({ page, requestId }: ShowListProps): Promise<Show[] | null> {
    return await this.get<Show[]>({ url: `/shows?page=${page}`, requestId });
  }

  //  HomeScreen
  public async getShowsListByQueryName({
    queryName,
    requestId,
  }: SearchShowListProps): Promise<SearchShowsResult[] | null> {
    return await this.get<SearchShowsResult[]>({ url: `/search/shows?q=${queryName}`, requestId });
  }

  // ShowDetailsScreen
  public async getShowById({ showId, requestId }: ShowByIdProps): Promise<Show | null> {
    return await this.get<Show>({ url: `/shows/${showId}`, requestId });
  }

  // SeasonListScreen
  public async getSeasonListByShowId({ showId, requestId }: ShowByIdProps): Promise<Season[] | null> {
    return await this.get<Season[]>({ url: `/shows/${showId}/seasons`, requestId });
  }

  // EpisodesBySeasonScreen
  public async getEpisodeListBySeasonId({ seasonId, requestId }: EpisodeListProps): Promise<Episode[] | null> {
    return await this.get<Episode[]>({ url: `/seasons/${seasonId}/episodes`, requestId });
  }

  // EpisodeDetailsScreen
  public async getEpisodeById({ episodeId, requestId }: EpisodeByIdProps): Promise<Episode | null> {
    return await this.get<Episode>({ url: `/episodes/${episodeId}`, requestId });
  }
}

export const api = new ApiService(BASE_URL);
