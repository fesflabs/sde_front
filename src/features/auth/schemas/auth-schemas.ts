import { z } from 'zod';
import { ModuleSchema, RoleSchema, ModuleWithRolesSchema } from '@/shared/schemas/user-schemas';
import { isValidCPF } from '@/shared/utils/fields';

/**
 * Schema para requisição de login
 */
export const loginRequestSchema = z.object({
  username: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
  password: z.string().min(4, 'Senha deve ter pelo menos 6 caracteres'),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

/**
 * Schema para resposta do login
 */
export const loginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  requires_role_selection: z.boolean(),
  requires_password_change: z.boolean().optional(),
  requires_email_confirmation: z.boolean().optional(),
  message: z.string().optional(),
  current_module: ModuleSchema.nullable(),
  current_role: RoleSchema.nullable(),
  available_modules: z.array(ModuleWithRolesSchema),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

/**
 * Schema para requisição de seleção de módulo/perfil
 */
export const selectRoleRequestSchema = z.object({
  moduleId: z.number(),
  roleId: z.number(),
});

export type SelectRoleRequest = z.infer<typeof selectRoleRequestSchema>;
