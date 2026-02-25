import { useAuthStore } from '../store/auth-store';
import { useCurrentUser } from '../api/queries';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Hook para acessar todos os dados e funcionalidades de autenticação
 */
export function useAuth() {
  const { user, authInfo, isAuthenticated, isLoading, clearUser } = useAuthStore();

  const { isLoading: isUserLoading, refetch, isError, error } = useCurrentUser();

  const router = useRouter();

  // Função para realizar logout
  const logout = useCallback(() => {
    // Remover o token do cookie
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Limpar o store
    clearUser();

    // Redirecionar para a página de login
    router.push('/login');
  }, [clearUser, router]);

  // Verificar se o usuário precisa selecionar um perfil
  const requiresRoleSelection = authInfo?.requires_role_selection || false;

  return {
    user,
    authInfo,
    isAuthenticated,
    isLoading: isLoading || isUserLoading,
    refetchUser: refetch,
    logout,
    requiresRoleSelection,
    isError,
    error,
  };
}
