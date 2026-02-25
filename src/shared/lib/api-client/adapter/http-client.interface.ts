/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Interface genérica para cliente HTTP
 * Permite trocar a implementação sem alterar o código consumidor
 */
export interface HttpClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  withCredentials?: boolean;
}

export interface HttpClient {
  get<T>(url: string, options?: HttpClientOptions): Promise<T>;
  post<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  put<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  patch<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  delete<T>(url: string, options?: HttpClientOptions): Promise<T>;

  // Opcional: método para criar uma instância com configuração específica
  create(config: HttpClientOptions): HttpClient;
}
