/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/shared/lib/api-client';
import { AUTH_ENDPOINTS } from '@/features/auth/api/endpoints';
import { AuthQueryKeys } from '@/features/auth/api/queries';
import {
  LoginRequest,
  LoginResponse,
  SelectRoleRequest,
} from '@/features/auth/schemas/auth-schemas';
import { useAuthStore } from '@/features/auth/store/auth-store';

/**
 * Hook para login de usuário
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const { setAuthInfo, setLoading } = useAuthStore();
  const httpClient = ApiClient.getInstance().getHttpClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      setLoading(true);
      const response = await httpClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);

      // Armazenar token em cookie em vez de localStorage
      if (response.access_token) {
        // Remover token antigo do localStorage (para migração)
        localStorage.removeItem('authToken');

        // Definir cookie com o token
        document.cookie = `authToken=${response.access_token}; path=/; max-age=86400; SameSite=Strict`;
      }

      return response;
    },
    onSuccess: (data) => {
      // Armazenar informações de autenticação
      setAuthInfo(data);

      // Se não precisar selecionar perfil, buscar dados completos do usuário
      if (!data.requires_role_selection) {
        queryClient.invalidateQueries({ queryKey: AuthQueryKeys.currentUser });
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useForgotPassword() {
  const httpClient = ApiClient.getInstance().getHttpClient();

  return useMutation({
    mutationFn: async (email: string) => {
      return await httpClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        email,
      });
    },
    onError: (error: any) => {
      // Handle any specific error transformations here if needed
      console.error('Password reset request failed:', error);
      return (
        error.response?.data || { message: 'Erro ao processar a solicitação de reset de senha.' }
      );
    },
  });
}

/**
 * Hook para seleção de módulo e perfil
 */
export function useSelectRole() {
  const queryClient = useQueryClient();
  const { setAuthInfo, setLoading } = useAuthStore();
  const httpClient = ApiClient.getInstance().getHttpClient();

  return useMutation({
    mutationFn: async ({ moduleId, roleId }: SelectRoleRequest) => {
      setLoading(true);
      const response = await httpClient.post<LoginResponse>(AUTH_ENDPOINTS.SELECT_ROLE, {
        moduleId,
        roleId,
      });

      // Atualizar o token no cookie
      if (response.access_token) {
        document.cookie = `authToken=${response.access_token}; path=/; max-age=86400; SameSite=Strict`;
      }

      return response;
    },
    onSuccess: (data) => {
      // Atualiza as informações de autenticação
      const currentAuth = useAuthStore.getState().authInfo;

      setAuthInfo({
        ...currentAuth,
        access_token: data.access_token,
        token_type: data.token_type,
        current_module: data.current_module,
        current_role: data.current_role,
        requires_role_selection: false,
      } as LoginResponse);

      // Buscar dados completos do usuário após selecionar o perfil
      queryClient.invalidateQueries({ queryKey: AuthQueryKeys.currentUser });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

/**
 * Hook para logout de usuário
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      // Removendo o cookie 'authToken'
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
    onSuccess: () => {
      clearUser();
      queryClient.invalidateQueries({ queryKey: AuthQueryKeys.currentUser });
    },
  });
}
