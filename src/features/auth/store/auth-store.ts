import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/shared/schemas/user-schemas';
import { LoginResponse } from '../schemas/auth-schemas';
import { getModuleById } from '@/modules/module-registry';

interface AuthState {
  user: User | null;
  authInfo: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  currentModuleKey: string | null; // Para facilitar acesso à chave do módulo

  // Actions
  setUser: (user: User | null) => void;
  setAuthInfo: (authInfo: LoginResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      authInfo: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      currentModuleKey: null,

      // Actions
      setUser: (user) => {
        // Atualizar o currentModuleKey baseado no módulo atual do usuário
        const currentModuleKey = user?.current_module
          ? getModuleById(user.current_module.id)?.key || null
          : null;

        set({ user, isAuthenticated: !!user, currentModuleKey });
      },
      setAuthInfo: (authInfo) => set({ authInfo, isAuthenticated: true }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearUser: () =>
        set({ user: null, authInfo: null, isAuthenticated: false, currentModuleKey: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, authInfo: state.authInfo }),
      skipHydration: true,
    }
  )
);
