export type FeatureFlag = keyof typeof FEATURE_FLAGS;

// Definição central das feature flags
export const FEATURE_FLAGS = {
  // Funcionalidades gerais
  ENABLE_ANALYTICS: {
    defaultValue: false,
    description: 'Enable analytics dashboard',
    requiredRoles: ['admin', 'analyst'],
  },
  DARK_MODE: {
    defaultValue: true,
    description: 'Enable dark mode for all users',
  },

  // Funcionalidades específicas
  NEW_DASHBOARD_UI: {
    defaultValue: false,
    description: 'Enable new dashboard UI',
    requiredRoles: ['admin', 'beta-tester'],
  },
  ENABLE_SENSITIVE_REPORTS: {
    defaultValue: false,
    description: 'Enable access to sensitive reports',
    requiredRoles: ['admin', 'compliance-officer'],
    requiredPermissions: ['read:sensitive-data'],
  },
  EXPERIMENTAL_FEATURES: {
    defaultValue: false,
    description: 'Enable experimental features',
    requiredAttributes: [{ key: 'beta', value: true }],
  },
} as const;

interface User {
  roles?: string[];
  permissions?: string[];
  [key: string]: string[] | boolean | undefined;
}

export class FeatureFlagProvider {
  private user: User | null;
  private overrides: Partial<Record<FeatureFlag, boolean>>;

  constructor(user: User | null, overrides: Partial<Record<FeatureFlag, boolean>> = {}) {
    this.user = user;
    this.overrides = overrides;
  }

  isEnabled(flag: FeatureFlag): boolean {
    // 1. Verificar se há override explícito
    if (flag in this.overrides) {
      return this.overrides[flag] === true;
    }

    // 2. Verificar se a flag existe
    const flagConfig = FEATURE_FLAGS[flag];
    if (!flagConfig) {
      return false;
    }

    // 3. Se não houver usuário, use o valor padrão
    if (!this.user) {
      return flagConfig.defaultValue;
    }

    // 4. Verificar requisitos baseados em papel (RBAC)
    if (
      'requiredRoles' in flagConfig &&
      flagConfig.requiredRoles &&
      flagConfig.requiredRoles.length > 0
    ) {
      const userRoles = this.user.roles || [];
      const hasRequiredRole = flagConfig.requiredRoles.some((role: string) =>
        userRoles.includes(role)
      );
      if (!hasRequiredRole) {
        return false;
      }
    }

    // 5. Verificar requisitos baseados em permissão (RBAC)
    if (
      'requiredPermissions' in flagConfig &&
      flagConfig.requiredPermissions &&
      flagConfig.requiredPermissions.length > 0
    ) {
      const userPermissions = this.user.permissions || [];
      const hasAllRequiredPermissions = flagConfig.requiredPermissions.every((permission: string) =>
        userPermissions.includes(permission)
      );
      if (!hasAllRequiredPermissions) {
        return false;
      }
    }

    // 6. Verificar requisitos baseados em atributos (ABAC)
    if (
      'requiredAttributes' in flagConfig &&
      flagConfig.requiredAttributes &&
      flagConfig.requiredAttributes.length > 0
    ) {
      const hasAllRequiredAttributes = flagConfig.requiredAttributes.every(
        (attr: { key: string; value: boolean | string | number }) => {
          const userValue = this.user?.[attr.key];
          return userValue === attr.value;
        }
      );
      if (!hasAllRequiredAttributes) {
        return false;
      }
    }

    // Se passou por todas as verificações, a flag está habilitada
    return flagConfig.defaultValue;
  }
}
