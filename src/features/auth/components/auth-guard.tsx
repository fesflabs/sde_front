'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { routes } from '@/shared/config/route-config';
import { verifyPermissions } from '@/shared/lib/auth/permissions';
import { useAlert } from '@/shared/hooks/use-alert';

interface RouteGuardProps {
  children: React.ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const { showMessage } = useAlert();
  const [authorized, setAuthorized] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Auth check function
    const checkAuth = () => {
      // Skip auth check for public routes
      const currentRoute = findRouteConfig(pathname);
      if (!currentRoute) {
        setAuthorized(true);
        setIsChecking(false);
        return;
      }

      // If route requires auth but user isn't loaded yet
      if (isLoading) {
        // Espera o carregamento terminar antes de decidir
        return;
      }

      // If route requires auth but no user
      if (!user) {
        setAuthorized(false);
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }

      // Verify permissions for this route
      const hasPermission = verifyPermissions({
        user,
        requiredRoles: currentRoute.requiredRoles || [],
        requiredPermissions: currentRoute.requiredPermissions || [],
        requiredModules: currentRoute.requiredModules || [],
        strictMode: true,
      });

      if (!hasPermission) {
        setAuthorized(false);
        showMessage('Acesso Negado', 'Você não tem permissão para acessar esta página.');
        router.push('/unauthorized');
        return;
      }

      setAuthorized(true);
      setIsChecking(false);
    };

    // Check auth on initial load and route changes
    checkAuth();
  }, [pathname, router, user, isLoading, showMessage]);

  // Find route configuration by path
  function findRouteConfig(pathname: string) {
    // First check top-level routes
    const route = routes.find((r) => r.path === pathname);
    if (route) return route;

    // Then check child routes
    for (const parentRoute of routes) {
      if (parentRoute.children) {
        const childRoute = parentRoute.children.find((r) => r.path === pathname);
        if (childRoute) return childRoute;
      }
    }

    return undefined;
  }

  return isChecking ? <div>Verificando autenticação...</div> : authorized ? <>{children}</> : null;
}
