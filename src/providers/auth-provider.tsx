'use client';
import { useCurrentUser } from '@/features/auth/api/queries';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Componente provedor que inicializa e sincroniza o estado de autenticação
 * Este componente deve envolver toda a aplicação para garantir que o
 * estado de autenticação esteja sempre atualizado.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const { setUser, setLoading, setError } = useAuthStore();

  // Este useEffect garante que o estado Zustand está sincronizado
  // com o resultado do useCurrentUser
  useEffect(() => {
    setUser(user || null);
    setLoading(isLoading);
    setError(error as Error | null);
  }, [user, isLoading, error, setUser, setLoading, setError]);

  return <>{children}</>;
}
