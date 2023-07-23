import axios, { AxiosInstance, CancelTokenSource } from "axios";
import { MMKV } from "react-native-mmkv";

import { BASE_URL } from "@env";

import { CacheItem, SearchShowResponse, ShowResponse } from "./services-types";

// 7 days in milliseconds
const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;

class ApiService {
  private api: AxiosInstance;
  private source: CancelTokenSource | undefined;
  private storage: MMKV;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
    });
    this.storage = new MMKV();
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

  private async getFromCache(key: string) {
    const data = this.storage.getString(key);

    if (data) {
      const parsedData = JSON.parse(data) as CacheItem;

      if (Date.now() - parsedData.timestamp < ONE_WEEK_IN_MILLISECONDS) {
        return parsedData.value;
      }

      // If the data is older than a week, remove it from the cache
      this.storage.delete(key);
    }

    return null;
  }

  private async setToCache(key: string, data: any) {
    const timestamp = Date.now();
    this.storage.set(key, JSON.stringify({ value: data, timestamp }));
  }

  public async getShows(page: number): Promise<ShowResponse[]> {
    const cacheKey = `shows_page_${page}`;

    const cachedData = await this.getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await this.api.get(`/shows?page=${page}`, {
        cancelToken: this.createCancelToken(),
      });

      // This message will appear only if API call is made
      console.log("API request made for page: ", page);

      await this.setToCache(cacheKey, response.data);

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async searchShows(query: string): Promise<SearchShowResponse[]> {
    try {
      const response = await this.api.get(`/search/shows?q=${query}`, {
        cancelToken: this.createCancelToken(),
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async getShowDetails(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/shows/${id}`, {
        cancelToken: this.createCancelToken(),
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async getShowEpisodes(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/shows/${id}/episodes`, {
        cancelToken: this.createCancelToken(),
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return [];
    }
  }

  public async getEpisodeDetails(id: number): Promise<any> {
    try {
      const response = await this.api.get(`/episodes/${id}`, {
        cancelToken: this.createCancelToken(),
      });

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }

      return [];
    }
  }
}

export const apiService = new ApiService();
