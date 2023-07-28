import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from "axios";
import uuid from "react-native-uuid";

import { BASE_URL } from "@env";

import { Show, Season, Episode, SearchShowsResult } from "./services-types";

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

  private async get<T>({
    url,
    config = {},
    requestId,
  }: {
    url: string;
    config?: AxiosRequestConfig;
    requestId: string;
  }): Promise<T | null> {
    const source = this.createCancelTokenSource(requestId);

    try {
      const { data } = await this.axios.get<T>(url, { cancelToken: source.token, ...config });
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

  public async getShowsByPage({ page, requestId }: { page: number; requestId: string }): Promise<Show[] | null> {
    return await this.get<Show[]>({ url: `/shows?page=${page}`, requestId });
  }

  public async getSeasonsByShow({
    showId,
    requestId,
  }: {
    showId: number;
    requestId: string;
  }): Promise<Season[] | null> {
    return await this.get<Season[]>({ url: `/shows/${showId}/seasons`, requestId });
  }

  public async getEpisodesBySeason({
    seasonId,
    requestId,
  }: {
    seasonId: number;
    requestId: string;
  }): Promise<Episode[] | null> {
    return await this.get<Episode[]>({ url: `/seasons/${seasonId}/episodes`, requestId });
  }

  public async searchShowsByName({
    name,
    requestId,
  }: {
    name: string;
    requestId: string;
  }): Promise<SearchShowsResult[] | null> {
    return await this.get<SearchShowsResult[]>({ url: `/search/shows?q=${name}`, requestId });
  }

  public async getShowById({ showId, requestId }: { showId: number; requestId: string }): Promise<Show | null> {
    return await this.get<Show>({ url: `/shows/${showId}`, requestId });
  }

  public async getEpisodeById({
    episodeId,
    requestId,
  }: {
    episodeId: number;
    requestId: string;
  }): Promise<Episode | null> {
    return await this.get<Episode>({ url: `/episodes/${episodeId}`, requestId });
  }
}

export const api = new ApiService(BASE_URL);
