import { AxiosAdapter } from './adapter/axios-adapter';
import { HttpClient } from './adapter/http-client.interface';

/**
 * Classe ApiClient que usa o adapter
 */
export class ApiClient {
  private static instance: ApiClient;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = new AxiosAdapter();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public getHttpClient(): HttpClient {
    return this.httpClient;
  }
}
