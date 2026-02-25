import { ModuleConfig, ModuleRegistry } from './module-types';
// import { systemModule } from './system/config';
import { ppeModule } from './ppe/config';

// Registro central de todos os módulos da aplicação
const modules: ModuleRegistry = {
  // system: systemModule,
  ppe: ppeModule,
};

/**
 * Retorna todos os módulos registrados
 */
export function getAllModules(): ModuleConfig[] {
  return Object.values(modules).sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Retorna um módulo específico pela chave
 */
export function getModule(key: string): ModuleConfig | undefined {
  return modules[key];
}

/**
 * Retorna um módulo pelo ID numérico (usado quando o backend retorna IDs)
 */
export function getModuleById(id: number): ModuleConfig | undefined {
  return Object.values(modules).find((m) => m.id === id);
}

/**
 * Retorna o módulo padrão (se existir)
 */
export function getDefaultModule(): ModuleConfig | undefined {
  return Object.values(modules).find((m) => m.isDefault);
}
