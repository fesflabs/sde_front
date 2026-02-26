'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useAvailableModules } from '@/shared/hooks/use-modules';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useSelectRole } from '@/features/auth/api/mutations';
import { useSonner } from '@/shared/hooks/use-sonner';

export function ModuleSelector() {
  const { user } = useAuthStore();
  const availableModules = useAvailableModules();
  const router = useRouter();
  const selectRole = useSelectRole();
  const { toast } = useSonner();
  const [isChanging, setIsChanging] = useState(false);

  if (!user || availableModules.length <= 1) return null;

  // Obtém o nome do módulo atual
  const currentModuleName = user.current_module?.name || 'Selecione um módulo';

  async function handleModuleChange(moduleId: number, roleId: number) {
    try {
      setIsChanging(true);

      await selectRole.mutateAsync({
        moduleId,
        roleId,
      });

      toast({
        title: 'Módulo alterado com sucesso',
        description: 'Você será redirecionado para a página inicial do módulo.',
      });

      // Obter o caminho do módulo selecionado e redirecionar
      const selectedModule = availableModules.find((m) => m.id === moduleId);
      if (selectedModule) {
        router.push(selectedModule.path);
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro ao alterar módulo',
        description: 'Por favor, tente novamente.',
      });
    } finally {
      setIsChanging(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={isChanging}>
          <span>{currentModuleName}</span>
          {isChanging ? <span>Alterando...</span> : <span>▾</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.available_modules?.map((module) =>
          // Se o módulo tem apenas um papel, mudar direto, senão abrir sub-menu
          module.roles.length === 1 ? (
            <DropdownMenuItem
              key={module.id}
              onClick={() => handleModuleChange(module.id, module.roles[0].id)}
              disabled={module.id === user.current_module?.id}
            >
              {module.name}
            </DropdownMenuItem>
          ) : (
            // Implementar submenu para múltiplos papéis
            <DropdownMenuItem key={module.id}>{module.name}</DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
