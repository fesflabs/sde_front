import { FeatureFlag } from '@/shared/config/feature-flags';

/**
 * Interface para configuração de rotas com controle de acesso
 */
export interface RouteConfig {
  path: string;
  title: string;
  icon?: string;
  requiredRoles?: string[];
  requiredModules?: number[];
  requiredPermissions?: string[];
  requiredAttributes?: {
    key: string;
    value: string | number | boolean;
    operator?: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
  }[];
  featureFlags?: FeatureFlag[];
  strictMode?: boolean;
  children?: RouteConfig[];
}

/**
 * Configuração central de todas as rotas da aplicação
 * Usada para gerar menus, sidebars e verificar permissões
 */
export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
  },
  {
    path: '/users',
    title: 'Usuários',
    icon: 'users',
    requiredRoles: ['admin'],
    requiredModules: [1], // Assumindo que 1 é o ID do módulo "Administração"
  },
  {
    path: '/reports',
    title: 'Relatórios',
    icon: 'chart',
    requiredPermissions: ['read:reports'],
    children: [
      {
        path: '/reports/sales',
        title: 'Vendas',
        requiredPermissions: ['read:sales'],
      },
      {
        path: '/reports/analytics',
        title: 'Analytics',
        featureFlags: ['ENABLE_ANALYTICS'],
      },
    ],
  },
];
