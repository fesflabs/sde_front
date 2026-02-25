'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { getModuleById, getAllModules } from '@/modules/module-registry';
import { usePathname } from 'next/navigation';
import { ModuleConfig } from '@/modules/module-types';

/**
 * Hook para obter módulos disponíveis para o usuário atual
 */
export function useAvailableModules() {
  const { user } = useAuthStore();

  return useMemo(() => {
    if (!user?.available_modules) return [];

    // Mapear IDs dos módulos disponíveis para configurações completas
    return user.available_modules
      .map((moduleInfo) => getModuleById(moduleInfo.id))
      .filter(Boolean) as ModuleConfig[];
  }, [user]);
}

/**
 * Hook para determinar o módulo atual com base na URL
 */
export function useCurrentModule() {
  const pathname = usePathname();
  const modules = getAllModules();

  return useMemo(() => {
    if (!pathname) return undefined;

    // Encontrar o módulo cujo caminho é prefixo da URL atual
    return modules.find(
      (module) => pathname === module.path || pathname.startsWith(`${module.path}/`)
    );
  }, [pathname, modules]);
}
