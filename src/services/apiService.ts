import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from "axios";

import { BASE_URL } from "@env";
import { cacheStorage } from "@storage";

import {
  ApiResponseHeaders,
  EpisodeDetailsResponse,
  EpisodeResponse,
  SearchShowResponse,
  ShowDetails,
  ShowResponse,
} from "./services-types";

class ApiService {
  private readonly api: AxiosInstance;
  private source: CancelTokenSource | undefined;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    });
  }

  private createCancelToken() {
    this.source = axios.CancelToken.source();
    return this.source.token;
  }

  public cancelRequest() {
    if (this.source) {
      this.source.cancel("Request cancelled.");
    }
  }

  public async getShows(page: number): Promise<ShowResponse[]> {
    const cacheKey = `shows_page_${page}`;

    const cachedData = await cacheStorage.getFromCacheByKey<ShowResponse[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse<ShowResponse[], ApiResponseHeaders> = await this.api.get(`/shows?page=${page}`, {
        cancelToken: this.createCancelToken(),
      });

      if (__DEV__) {
        // This message will appear only if API call is made
        console.log("API request made for page: ", page);
      }

      await cacheStorage.setToCacheByKey({ key: cacheKey, data: response.data });

      return response.data;
    } catch (error) {
      if (error instanceof Error && __DEV__) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async searchShows(query: string): Promise<SearchShowResponse[]> {
    try {
      const response: AxiosResponse<SearchShowResponse[], ApiResponseHeaders> = await this.api.get(
        `/search/shows?q=${query}`,
        {
          cancelToken: this.createCancelToken(),
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error && __DEV__) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async getShowDetails(id: number): Promise<ShowDetails | null> {
    const cacheKey = `show_details_${id}`;

    const cachedData = await cacheStorage.getFromCacheByKey<ShowDetails>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse<ShowDetails, ApiResponseHeaders> = await this.api.get<ShowDetails>(`/shows/${id}`, {
        cancelToken: this.createCancelToken(),
      });

      if (__DEV__) {
        // This message will appear only if API call is made
        console.log("API request made for show id: ", id);
      }

      await cacheStorage.setToCacheByKey({ key: cacheKey, data: response.data });

      return response.data;
    } catch (error) {
      if (error instanceof Error && __DEV__) {
        console.log(error.message);
      }

      return null;
    }
  }

  public async getShowEpisodes(id: number): Promise<EpisodeResponse[]> {
    const cacheKey = `show_episodes_${id}`;

    const cachedData = await cacheStorage.getFromCacheByKey<EpisodeResponse[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse<EpisodeResponse[], ApiResponseHeaders> = await this.api.get<EpisodeResponse[]>(
        `/shows/${id}/episodes`,
        {
          cancelToken: this.createCancelToken(),
        },
      );

      if (__DEV__) {
        // This message will appear only if API call is made
        console.log("API request made for show id: ", id);
      }

      await cacheStorage.setToCacheByKey({ key: cacheKey, data: response.data });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async getEpisodeDetails(id: number): Promise<EpisodeDetailsResponse | null> {
    const cacheKey = `episode_details_${id}`;

    const cachedData = await cacheStorage.getFromCacheByKey<EpisodeDetailsResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response: AxiosResponse<EpisodeDetailsResponse, ApiResponseHeaders> =
        await this.api.get<EpisodeDetailsResponse>(`/episodes/${id}`, {
          cancelToken: this.createCancelToken(),
        });

      if (__DEV__) {
        // This message will appear only if API call is made
        console.log("API request made for episode id: ", id);
      }

      await cacheStorage.setToCacheByKey({ key: cacheKey, data: response.data });

      return response.data;
    } catch (error) {
      if (error instanceof Error && __DEV__) {
        console.log(error.message);
      }

      return null;
    }
  }
}

export const apiService = new ApiService(BASE_URL);
