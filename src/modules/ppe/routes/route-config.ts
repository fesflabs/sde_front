import { RouteConfig } from '@/shared/config/route-config';

/**
 * Configuração de rotas específicas do módulo PPE
 */
export const ppeRoutes: RouteConfig[] = [
  {
    path: '/ppe',
    title: 'PPE Dashboard',
    requiredPermissions: ['ppe:access'],
  },
  {
    path: '/ppe/reports',
    title: 'Relatórios PPE',
    requiredPermissions: ['ppe:reports:view'],
  },
];
