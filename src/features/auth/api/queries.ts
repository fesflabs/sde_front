'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '@/shared/lib/api-client';
import { AUTH_ENDPOINTS } from '@/features/auth/api/endpoints';
import { UserSchema, User } from '@/shared/schemas/user-schemas';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store';

/**
 * Query keys para queries relacionadas a autenticação
 */
export const AuthQueryKeys = {
  currentUser: ['auth', 'currentUser'] as const,
};

/**
 * Hook para buscar dados do usuário atual (ME endpoint)
 * Sincroniza automaticamente com o Zustand store
 */
export function useCurrentUser() {
  const { setUser, setLoading, setError } = useAuthStore();
  const httpClient = ApiClient.getInstance().getHttpClient();

  const queryResult = useQuery({
    queryKey: AuthQueryKeys.currentUser,
    queryFn: async () => {
      try {
        const data = await httpClient.get<User>(AUTH_ENDPOINTS.ME);
        return UserSchema.parse(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
      }
    },
    enabled: typeof document !== 'undefined' && document.cookie.includes('authToken='),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });

  // Use useEffect para sincronizar o resultado da query com o store
  useEffect(() => {
    if (queryResult.data) setUser(queryResult.data);
    if (queryResult.error) setError(queryResult.error as Error);
    setLoading(queryResult.isLoading);
  }, [queryResult.data, queryResult.error, queryResult.isLoading, setUser, setError, setLoading]);

  return queryResult;
}
