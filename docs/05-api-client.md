# Implementação do Cliente de API

Este boilerplate implementa uma arquitetura flexível de cliente de API usando o Padrão Adaptador, que abstrai a biblioteca HTTP subjacente e fornece uma interface consistente para fazer requisições à API.

## Visão Geral da Arquitetura

A arquitetura do cliente de API consiste em:

1. **Interface do Cliente HTTP**: Uma interface comum para operações HTTP
2. **Implementação Concreta** (Adaptador Axios): Implementação usando Axios
3. **Módulos de API Específicos por Funcionalidade**: Endpoints de API e operações agrupados por funcionalidade

Este padrão permite:

- Mudar a biblioteca HTTP subjacente sem afetar a lógica de negócio
- Tratamento de erros e processamento de requisições/respostas consistentes
- Organização de operações de API específicas por funcionalidade
- Testes facilitados através de simulação do cliente HTTP

## Interface do Cliente HTTP

A interface define um contrato comum para operações HTTP:

```typescript
// src/shared/lib/api-client/adapter/http-client.interface.ts
export interface HttpClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  withCredentials?: boolean;
  transformRequestCase?: boolean;
  transformResponseCase?: boolean;
}

export interface HttpClient {
  get<T>(url: string, options?: HttpClientOptions): Promise<T>;
  post<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  put<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  patch<T, D = any>(url: string, data?: D, options?: HttpClientOptions): Promise<T>;
  delete<T>(url: string, options?: HttpClientOptions): Promise<T>;
  create(config: HttpClientOptions): HttpClient;
}
```

## Implementação do Adaptador Axios

O adaptador Axios implementa a interface do cliente HTTP usando Axios:

```typescript
// src/shared/lib/api-client/adapter/axios-adapter.ts
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

  async get<T>(url: string, options?: HttpClientOptions): Promise<T> {
    return this.instance
      .get<T, { data: T }>(url, this.mapOptions(options))
      .then((response) => response.data);
  }

  // Outros métodos (post, put, patch, delete)...

  // Métodos auxiliares para transformação de requisição/resposta...
}
```

## Organização de API Específica por Funcionalidade

Cada funcionalidade tem seus próprios módulos de API:

```
features/auth/api/
├── endpoints.ts    # Define endpoints de API
├── mutations.ts    # Mutações TanStack Query
└── queries.ts      # Consultas TanStack Query
```

### Definição de Endpoints

```typescript
// src/features/auth/api/endpoints.ts
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/me',
};
```

### Mutações (Operações de Escrita)

```typescript
// src/features/auth/api/mutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/api-client';
import { AUTH_ENDPOINTS } from './endpoints';
import { UserCredentials } from '@/features/auth/schemas/auth-schema';
import { User } from '@/shared/schemas/user-schema';
import { QUERY_KEYS } from './queries';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: UserCredentials) =>
      apiClient.post<User>(AUTH_ENDPOINTS.LOGIN, credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(QUERY_KEYS.me, user);
    },
  });
}
```

### Consultas (Operações de Leitura)

```typescript
// src/features/auth/api/queries.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/api-client';
import { AUTH_ENDPOINTS } from './endpoints';
import { User } from '@/shared/schemas/user-schema';

export const QUERY_KEYS = {
  me: ['user', 'me'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: () => apiClient.get<User>(AUTH_ENDPOINTS.ME),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
```

## Validação de Variáveis de Ambiente

O cliente de API depende de variáveis de ambiente que são validadas na inicialização:

```typescript
// src/shared/config/env.ts
import { validateEnv } from '../lib/utils/env-validation';

// Define variáveis de ambiente obrigatórias
const requiredEnvVars = [
  { name: 'NEXT_PUBLIC_API_URL', required: true },
  // Outras variáveis obrigatórias...
];

// Valida variáveis de ambiente
try {
  validateEnv(requiredEnvVars);
} catch (error) {
  console.error(error);
  if (typeof window === 'undefined') {
    throw error;
  }
}

// Exporta variáveis de ambiente com tipos
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  // Outras variáveis de ambiente...
};
```

## Benefícios Desta Abordagem

1. **Desacoplamento**: A lógica de negócio é desacoplada da implementação do cliente HTTP
2. **Organização por Funcionalidade**: Operações de API são organizadas por funcionalidade
3. **Tratamento de Erros Consistente**: O tratamento de erros é centralizado no adaptador
4. **Conversão Automática de Caso**: Lida de forma transparente com a conversão camelCase/snake_case
5. **Segurança de Tipos**: Tipagem forte para requisições e respostas da API
6. **Testes**: Fácil de simular para testes
