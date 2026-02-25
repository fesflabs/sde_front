'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useCurrentUser } from '@/features/auth/api/queries';
import { UserUtils } from '@/shared/schemas/user-schemas';

export function UserInfoPanel() {
  // Obtém dados do usuário tanto do store quanto diretamente da query
  const { user: storeUser } = useAuthStore();
  const { data: queryUser } = useCurrentUser();

  // Prioriza o usuário do store, mas usa o da query se necessário
  const user = storeUser || queryUser;

  if (!user) return null;

  const userName = user.email.split('@')[0];
  const currentRole = user.current_role?.name || 'Sem cargo atribuído';
  const currentModule = user.current_module?.name || 'Nenhum módulo selecionado';

  // Obtém lista de módulos disponíveis
  const availableModules = user.available_modules.map((module) => module.name).join(', ');

  // Agrupa as permissões por tipo de recurso para melhor visualização
  const permissionsByResource = user.direct_permissions.reduce(
    (acc, permission) => {
      const resource = permission.details.resource;
      if (!acc[resource]) {
        acc[resource] = [];
      }
      acc[resource].push(permission.details.action);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
          <CardDescription>Suas informações básicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Username</span> {userName}
            </div>
            <div>
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-medium">CPF:</span> {user.cpf}
            </div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              {UserUtils.isActive(user) ? 'Ativo' : 'Inativo'}
            </div>
            <div>
              <span className="font-medium">Criado em:</span>{' '}
              {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cargo e Módulos</CardTitle>
          <CardDescription>Suas atribuições no sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Módulo atual:</h4>
            <p>{currentModule}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Cargo atual:</h4>
            <p>{currentRole}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Módulos disponíveis:</h4>
            <p>{availableModules}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suas Permissões</CardTitle>
          <CardDescription>O que você pode fazer no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(permissionsByResource).map(([resource, actions]) => (
              <Badge key={resource} variant="outline" className="py-1">
                {resource}: {actions.join(', ')}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
