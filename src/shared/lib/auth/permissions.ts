/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeatureFlagProvider, FeatureFlag } from '@/shared/config/feature-flags';
import { User } from '@/shared/schemas/user-schemas';

interface PermissionCheckOptions {
  user: User;
  requiredRoles?: string[];
  requiredModules?: number[];
  requiredPermissions?: string[];
  requiredAttributes?: {
    key: string;
    value: string | number | boolean | unknown[]; // Union type for supported comparison values
    operator?: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
  }[];
  featureFlags?: FeatureFlag[];
  strictMode?: boolean;
}

/**
 * Verifica se o usuário tem as permissões necessárias com base em RBAC e ABAC
 */
export function verifyPermissions(options: PermissionCheckOptions): boolean {
  const {
    user,
    requiredRoles = [],
    requiredModules = [],
    requiredPermissions = [],
    requiredAttributes = [],
    featureFlags = [],
    strictMode = false,
  } = options;

  // Se não houver requisitos, permitir acesso
  const hasRequirements =
    requiredRoles.length > 0 ||
    requiredModules.length > 0 ||
    requiredPermissions.length > 0 ||
    requiredAttributes.length > 0 ||
    featureFlags.length > 0;

  if (!hasRequirements) {
    return true;
  }

  // Verificação básica - usuário deve estar ativo
  if (!user.is_active) {
    return false;
  }

  // Verificação de roles (RBAC)
  let roleCheck = true;
  if (requiredRoles.length > 0) {
    // Verifica se o papel atual do usuário está entre os requeridos
    roleCheck = user.current_role ? requiredRoles.includes(user.current_role.name) : false;
  }

  // Verificação de módulos (RBAC)
  let moduleCheck = true;
  if (requiredModules.length > 0) {
    // Verifica se o usuário tem algum dos módulos requeridos
    moduleCheck = requiredModules.some((moduleId) =>
      user.available_modules.some((m) => m.id === moduleId)
    );
  }

  // Verificação de permissions (RBAC)
  let permissionCheck = true;
  if (requiredPermissions.length > 0) {
    permissionCheck = requiredPermissions.every((perm) =>
      user.direct_permissions.some((p) => p.name === perm)
    );
  }

  // Verificação de atributos (ABAC)
  let attributeCheck = true;
  if (requiredAttributes.length > 0) {
    attributeCheck = requiredAttributes.every((attr) => {
      const userValue = user[attr.key as keyof User];

      switch (attr.operator) {
        case 'contains':
          return Array.isArray(userValue) && (userValue as unknown[]).includes(attr.value);
        case 'greaterThan':
          return (
            typeof userValue === 'number' &&
            typeof attr.value === 'number' &&
            userValue > attr.value
          );
        case 'lessThan':
          return (
            typeof userValue === 'number' &&
            typeof attr.value === 'number' &&
            userValue < attr.value
          );
        case 'equals':
        default:
          return userValue === attr.value;
      }
    });
  }

  // Verificação de feature flags
  // Verificação de feature flags
  let featureFlagCheck = true;
  if (featureFlags.length > 0) {
    // Cast to any to avoid type incompatibility issues
    const flagProvider = new FeatureFlagProvider(user as any);
    featureFlagCheck = featureFlags.every((flag) => flagProvider.isEnabled(flag));
  }

  // Modo estrito: todos os checks devem passar
  if (strictMode) {
    return roleCheck && moduleCheck && permissionCheck && attributeCheck && featureFlagCheck;
  }

  // Modo não-estrito: pelo menos um check deve passar
  // (se o check for relevante - tiver requisitos definidos)
  return (
    (requiredRoles.length === 0 || roleCheck) &&
    (requiredModules.length === 0 || moduleCheck) &&
    (requiredPermissions.length === 0 || permissionCheck) &&
    (requiredAttributes.length === 0 || attributeCheck) &&
    (featureFlags.length === 0 || featureFlagCheck)
  );
}
