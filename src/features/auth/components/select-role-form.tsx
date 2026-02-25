'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import { useSelectRole } from '../api/mutations';
import { useAuthStore } from '../store/auth-store';
import { useSonner } from '@/shared/hooks/use-sonner';
import { getModuleById } from '@/modules/module-registry';

// Schema de validação
const selectRoleSchema = z.object({
  moduleId: z.string().min(1, { message: 'Selecione um módulo' }),
  roleId: z.string().min(1, { message: 'Selecione um perfil' }),
});

type SelectRoleFormValues = z.infer<typeof selectRoleSchema>;

interface SelectRoleFormProps {
  onSuccess?: () => void;
}

export function SelectRoleForm({ onSuccess }: SelectRoleFormProps) {
  const { user } = useAuthStore();
  const selectRole = useSelectRole();
  const { toast } = useSonner();
  const [availableRoles, setAvailableRoles] = useState<Array<{ id: number; name: string }>>([]);

  const form = useForm<SelectRoleFormValues>({
    resolver: zodResolver(selectRoleSchema),
    defaultValues: {
      moduleId: '',
      roleId: '',
    },
  });

  const moduleInfos = useMemo(() => {
    if (!user?.available_modules) return [];

    return user.available_modules.map((module) => ({
      ...module,
      // Obter informações adicionais do registro de módulos
      config: getModuleById(module.id),
    }));
  }, [user]);

  // Atualizar as opções de perfis quando um módulo for selecionado
  const onModuleChange = (moduleId: string) => {
    form.setValue('roleId', '');

    if (!user?.available_modules || !moduleId) {
      setAvailableRoles([]);
      return;
    }

    const selectedModule = user.available_modules.find(
      (module) => module.id.toString() === moduleId
    );

    setAvailableRoles(selectedModule?.roles || []);
  };

  // Tratador de submissão do formulário
  async function onSubmit(values: SelectRoleFormValues) {
    try {
      await selectRole.mutateAsync({
        moduleId: parseInt(values.moduleId),
        roleId: parseInt(values.roleId),
      });

      toast({
        title: 'Módulo e perfil selecionados com sucesso',
      });

      onSuccess?.();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao selecionar módulo e perfil',
        description: 'Por favor, tente novamente.',
      });
      console.error('Select role error:', error);
    }
  }

  if (!user?.available_modules) {
    return <div>Carregando dados do usuário...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Módulo</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onModuleChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um módulo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {moduleInfos.map((module) => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {/* Usar o ícone do módulo se disponível */}
                      {module.config?.icon && <module.config.icon className="mr-2" />}
                      {module.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perfil</FormLabel>
              <Select onValueChange={field.onChange} disabled={availableRoles.length === 0}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={selectRole.isPending}>
          {selectRole.isPending ? 'Selecionando...' : 'Continuar'}
        </Button>
      </form>
    </Form>
  );
}
