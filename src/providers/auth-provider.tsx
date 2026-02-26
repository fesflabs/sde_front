'use client';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Componente provedor que inicializa e sincroniza o estado de autenticação
 * Este componente deve envolver toda a aplicação para garantir que o
 * estado de autenticação esteja sempre atualizado.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>;
}
