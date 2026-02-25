import { z } from 'zod';

// Regex para email
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Schema Zod para validação de email
 */
export const emailSchema = z.string().regex(EMAIL_REGEX, 'E-mail inválido');

/**
 * Valida se uma string é um email válido
 */
export function validateEmail(email: string): string {
  return emailSchema.parse(email);
}
