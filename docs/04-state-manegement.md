# Estratégia de Gerenciamento de Estado

Este boilerplate implementa uma **abordagem híbrida de gerenciamento de estado** que aproveita os pontos fortes de múltiplas bibliotecas para diferentes tipos de estado.

## Categorias de Estado

Distinguimos entre diferentes tipos de estado:

1. **Estado do Servidor**: Dados que vêm do servidor (endpoints de API)
2. **Estado do Cliente**: Estado da UI que existe apenas no cliente
3. **Estado da URL**: Estado que é refletido na URL

## Tecnologias Utilizadas

### TanStack Query (React Query)

Utilizado para **gerenciamento de estado do servidor**:

- Busca de dados, cache e sincronização com o servidor
- Recarregamento automático em segundo plano
- Estados de carregamento e erro
- Paginação e consultas infinitas
- Manipulação de mutações (criar, atualizar, excluir)
- Invalidação de consultas

### Zustand

Utilizado para **gerenciamento de estado do cliente**:

- Estado global da UI
- Estado de autenticação
- Flags de funcionalidades
- Tema/preferências
- Qualquer estado que precise ser acessado por múltiplos componentes

### Next.js Router

Utilizado para **estado da URL**:

- Navegação entre páginas
- Parâmetros de rota
- Parâmetros de consulta
- Fragmentos de hash

## Detalhes de Implementação

### Configuração do TanStack Query

O boilerplate configura o TanStack Query através de um componente provedor:

```tsx
// src/providers/tanstack-provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';

interface TanstackProviderProps {
  children: React.ReactNode;
}

export function TanstackProvider({ children }: TanstackProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
            refetchOnWindowFocus: false,
            retry: (failureCount, error: any) => {
              // Não tentar novamente em erros 404 ou de autenticação
              if (error?.status === 404 || error?.status === 401) return false;
              return failureCount < 3;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```

### Exemplo de Store Zustand

Cada funcionalidade pode definir sua própria store:

```tsx
// src/features/auth/store/auth-store.ts
import { create } from 'zustand';
import { User } from '@/shared/schemas/user-schema';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, error: null }),
}));
```

### Sincronizando TanStack Query com Zustand

Para dados do usuário, sincronizamos o TanStack Query (busca de API) com o Zustand (estado global):

```tsx
// src/features/auth/components/auth-provider.tsx
'use client';

import { useEffect } from 'react';
import { useCurrentUser } from '@/features/auth/api/queries';
import { useAuthStore } from '@/features/auth/store/auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, error } = useCurrentUser();
  const { setUser, setLoading, setError } = useAuthStore();

  // Sincroniza o estado da consulta com a store zustand
  useEffect(() => {
    setUser(user || null);
    setLoading(isLoading);
    setError(error as Error | null);
  }, [user, isLoading, error, setUser, setLoading, setError]);

  return <>{children}</>;
}
```

## Melhores Práticas

1. **Use TanStack Query para Dados de API**

   - Todas as chamadas de API devem passar pelo TanStack Query
   - Defina consultas e mutações em diretórios de API específicos de funcionalidades
   - Use chaves de consulta que sigam um padrão consistente

2. **Use Zustand para Estado da UI**

   - Mantenha as stores pequenas e focadas
   - Defina stores no nível da funcionalidade quando possível
   - Use stores compartilhadas apenas para estado verdadeiramente global

3. **Prefira Hooks para Acesso ao Estado**

   - Crie hooks personalizados que encapsulem o acesso ao estado
   - Abstraia os detalhes de implementação (seja TanStack Query, Zustand ou outra coisa)

4. **Derive Estado Quando Possível**

   - Em vez de duplicar estado, derive-o do estado existente
   - Use seletores e memoização para performance

5. **Mantenha os Componentes Puros**
   - Os componentes devem receber estado através de props ou hooks
   - Evite lógica complexa de estado nos componentes

```

## User ───

> #buffers
> #files
> $claude-3.7-sonnet-thought
> traduza para pt-br:


```
