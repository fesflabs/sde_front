import { IconType } from '@/shared/components/icons/icon-types';
import { RouteConfig } from '@/shared/config/route-config';

/**
 * Interface de configuração para um módulo
 */
export interface ModuleConfig {
  id: number; // ID numérico do módulo (igual ao backend)
  key: string; // Chave única usada nas rotas (ex: 'system', 'ppe')
  name: string; // Nome de exibição (ex: 'SYSTEM', 'PPE')
  description?: string; // Descrição do módulo
  path: string; // Caminho base (ex: '/system', '/ppe')
  icon?: IconType; // Ícone para o menu
  order?: number; // Ordem de exibição no menu
  routes?: RouteConfig[]; // Rotas específicas do módulo
  isDefault?: boolean; // Se é o módulo padrão para redirecionamento
}

// Tipo para o registro de módulos
export type ModuleRegistry = Record<string, ModuleConfig>;
