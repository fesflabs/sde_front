import { z } from 'zod';

// Regex para senha (ajuste de acordo com suas regras)
export const PASSWORD_REGEX = /^.{6,}$/;

/**
 * Schema Zod para validação de senha
 */
export const passwordSchema = z.string().regex(PASSWORD_REGEX, 'Senha inválida');

/**
 * Valida se uma string é uma senha válida
 */
export function validatePassword(password: string): string {
  return passwordSchema.parse(password);
}
