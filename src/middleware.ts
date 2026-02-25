/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { routes, RouteConfig } from '@/shared/config/route-config';
import * as jwt from 'jsonwebtoken';

// Interface para o conteúdo do token JWT
interface TokenPayload {
  userId: string;
  role?: string;
  moduleId?: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Encontrar configuração da rota atual
  const currentRoute = findRouteConfig(pathname);

  // Ignorar rotas públicas (login, registro, etc)
  if (!currentRoute) {
    return NextResponse.next();
  }

  // Verificar autenticação
  const authToken = request.cookies.get('authToken')?.value;

  // Se não há token e a rota requer autenticação, redirecionar para login
  if (!authToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Decodificar o token para verificações básicas
    const payload = jwt.verify(
      authToken,
      process.env.JWT_SECRET || 'default_secret_key'
    ) as TokenPayload;

    // Verificar se o payload é válido
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid token payload');
    }

    // Verificar requisitos de role (se especificados)
    // Verificar requisitos de role (se especificados)
    if (
      currentRoute.requiredRoles &&
      currentRoute.requiredRoles.length > 0 &&
      payload.role &&
      !currentRoute.requiredRoles.includes(payload.role)
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (
      currentRoute.requiredModules &&
      currentRoute.requiredModules.length > 0 &&
      payload.moduleId &&
      !currentRoute.requiredModules.includes(payload.moduleId)
    ) {
      // Redirecionar para seleção de módulo se o módulo atual não for permitido
      return NextResponse.redirect(new URL('/select-module', request.url));
    }

    // Para verificações mais complexas (permissões específicas),
    // deixamos para o componente RouteGuard no cliente
  } catch (error) {
    // Erro ao decodificar o token ou token expirado, redirecionar para login
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Helper function to find route configuration by path
 */
function findRouteConfig(pathname: string): RouteConfig | undefined {
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

// Configure which paths this middleware will run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api).*)'],
};
