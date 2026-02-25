import { BriefcaseIcon } from 'lucide-react';
import { ModuleConfig } from '../module-types';
import { ppeRoutes } from './routes/route-config';

/**
 * Configuração do módulo de PPE (Prestação de Contas)
 */
export const ppeModule: ModuleConfig = {
  id: 2, // ID exato retornado pelo backend
  key: 'ppe',
  name: 'PPE',
  description: 'Módulo de Prestação de Contas e Projetos',
  path: '/ppe',
  icon: BriefcaseIcon,
  order: 20,
  routes: ppeRoutes,
  // Outras configurações específicas
};

// Exports adicionais específicos do módulo
export const PPE_MODULE_ID = ppeModule.id;
export const PPE_MODULE_KEY = ppeModule.key;
export const PPE_MODULE_PATH = ppeModule.path;
