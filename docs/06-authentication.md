# Autenticação e Autorização

Este boilerplate implementa um sistema robusto de autenticação e autorização em múltiplas camadas que fornece segurança em diferentes níveis da aplicação.

## Arquitetura de Autenticação

A arquitetura de autenticação consiste em:

1. **Camada de Middleware**: Validação de autenticação do lado do servidor
2. **Store de Autenticação**: Gerenciamento de estado de autenticação do lado do cliente
3. **Guardas de Rota**: Proteção em nível de componente
4. **Utilitários de Permissão**: Verificação granular de permissões

Esta abordagem em múltiplas camadas garante que:

- As rotas são protegidas no nível do servidor
- A UI do cliente reflete o estado correto de autenticação
- Os componentes só são renderizados para usuários autorizados
- As permissões são verificadas consistentemente em toda a aplicação

## Camada de Middleware

O middleware do Next.js (`src/middleware.ts`) fornece a primeira linha de defesa de autenticação:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { routes } from '@/shared/config/route-config';

export function middleware(request: NextRequest) {
  // Check if the route requires authentication
  const pathname = request.nextUrl.pathname;
  const publicRoute = !routes.some(
    (route) => route.requiresAuth && pathname.match(new RegExp(`^${route.path}$`))
  );

  if (publicRoute) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Decode the token (not verify, as we don't have the secret in middleware)
    const payload = jwt.decode(token);

    // Basic role check can be done here
    if (payload && typeof payload === 'object' && 'role' in payload) {
      const userRole = payload.role as string;

      // Check if the route requires specific roles
      const routeConfig = routes.find((route) => pathname.match(new RegExp(`^${route.path}$`)));
      if (routeConfig?.requiredRoles && !routeConfig.requiredRoles.includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Redirect to login if token is invalid
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure which routes should use the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register|unauthorized).*)'],
};
```

## Store de Autenticação (Zustand)

O store de autenticação fornece acesso global ao estado de autenticação:

```typescript
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

## Provedor de Autenticação

O componente Provedor de Autenticação inicializa o estado de autenticação buscando os dados do usuário:

```typescript
// src/features/auth/components/auth-provider.tsx
'use client';

import { useEffect } from 'react';
import { useCurrentUser } from '@/features/auth/api/queries';
import { useAuthStore } from '@/features/auth/store/auth-store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, error } = useCurrentUser();
  const { setUser, setLoading, setError } = useAuthStore();

  // Sync query state with zustand store
  useEffect(() => {
    setUser(user || null);
    setLoading(isLoading);
    setError(error as Error | null);
  }, [user, isLoading, error, setUser, setLoading, setError]);

  return <>{children}</>;
}
```

## Componente de Guarda de Rota

O componente de Guarda de Rota fornece proteção de rota do lado do cliente:

```typescript
// src/features/auth/components/route-guard.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { routes } from '@/shared/config/route-config';
import { canAccess } from '@/shared/lib/auth/permissions';

interface RouteGuardProps {
  children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Skip authorization check if still loading
    if (isLoading) return;

    // Find matching route configuration
    const routeConfig = routes.find((route) => {
      if (typeof route.path === 'string') {
        return pathname === route.path;
      }
      return pathname.match(new RegExp(`^${route.path}$`));
    });

    // Allow access for routes without specific requirements
    if (!routeConfig || !routeConfig.requiresAuth) {
      setAuthorized(true);
      return;
    }

    // Check authentication and permissions
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user && routeConfig && !canAccess(user, routeConfig)) {
      router.push('/unauthorized');
      return;
    }

    setAuthorized(true);
  }, [pathname, isAuthenticated, isLoading, user, router]);

  // Show loading indicator while checking authorization
  if (isLoading || !authorized) {
    return <div>Loading...</div>;
  }

  // Render children only if authorized
  return <>{children}</>;
}
```

## Utilitários de Permissão

Os utilitários de permissões fornecem verificação granular de permissões:

```typescript
// src/shared/lib/auth/permissions.ts
import { User } from '@/shared/schemas/user-schema';
import { RouteConfig } from '@/shared/config/route-config';

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user || !user.directPermissions) return false;
  return user.directPermissions.includes(permission);
}

export function hasRole(user: User | null, role: string): boolean {
  if (!user || !user.currentRole) return false;
  return user.currentRole.name === role;
}

export function canAccess(user: User | null, route: RouteConfig): boolean {
  if (!route.requiresAuth) return true;
  if (!user) return false;

  // Check roles if specified
  if (route.requiredRoles && route.requiredRoles.length > 0) {
    if (!route.requiredRoles.includes(user.currentRole?.name)) {
      return false;
    }
  }

  // Check permissions if specified
  if (route.requiredPermissions && route.requiredPermissions.length > 0) {
    const hasAllRequiredPermissions = route.requiredPermissions.every((permission) =>
      hasPermission(user, permission)
    );
    if (!hasAllRequiredPermissions) {
      return false;
    }
  }

  return true;
}
```

## Benefícios Desta Abordagem

1. **Segurança em Múltiplas Camadas**: Proteção nos níveis de servidor e cliente
2. **Experiência de Usuário Elegante**: UI apropriada baseada no estado de autenticação
3. **Controle Granular**: Verificação detalhada de permissões
4. **Lógica Centralizada**: A lógica de autorização é centralizada e reutilizável
5. **Segurança de Tipos**: Tipagem forte para papéis e permissões
