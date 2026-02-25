/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  HttpClient,
  HttpClientOptions,
} from '@/shared/lib/api-client/adapter/http-client.interface';
import { env } from '@/shared/config/env';

/**
 * Implementação do HttpClient usando Axios
 */
export class AxiosAdapter implements HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = env.NEXT_PUBLIC_API_URL, options?: HttpClientOptions) {
    this.instance = axios.create({
      baseURL,
      ...this.mapOptions(options),
    });

    // Configurar interceptors
    this.setupInterceptors();
  }

  get<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.instance
      .get<T, { data: T }>(url, this.mapOptions(options))
      .then((response) => response.data);
  }

  post<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T> {
    return this.instance
      .post<T, { data: T }>(url, data, this.mapOptions(options))
      .then((response) => response.data);
  }

  put<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T> {
    return this.instance
      .put<T, { data: T }>(url, data, this.mapOptions(options))
      .then((response) => response.data);
  }

  patch<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T> {
    return this.instance
      .patch<T, { data: T }>(url, data, this.mapOptions(options))
      .then((response) => response.data);
  }

  delete<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.instance
      .delete<T, { data: T }>(url, this.mapOptions(options))
      .then((response) => response.data);
  }

  create(config: HttpClientOptions): HttpClient {
    return new AxiosAdapter(this.instance.defaults.baseURL, config);
  }

  private mapOptions(options?: HttpClientOptions): AxiosRequestConfig {
    if (!options) return {};
    return {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      withCredentials: options.withCredentials,
    };
  }

  private setupInterceptors() {
    // Request interceptor para adicionar token de autenticação
    this.instance.interceptors.request.use((config) => {
      // Get token from cookie instead of localStorage
      const token = this.getAuthTokenFromCookie();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor para tratamento de erros
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Session expired - clear cookie
          document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        return Promise.reject(error);
      }
    );
  }

  // Helper method to get auth token from cookie
  private getAuthTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null; // SSR check

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'authToken') {
        return value;
      }
    }
    return null;
  }
}
