import { z } from 'zod';

/**
 * Formata um CEP para o padrão XXXXX-XXX
 */
export function formatCEP(value: string): string {
  if (!value) return '';
  return value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Validator para CEP
 */
export const cepValidator = z
  .string()
  .refine((val) => /^\d{5}-\d{3}$/.test(val), {
    message: 'CEP inválido',
  })
  .transform((val) => val.replace(/\D/g, ''));

/**
 * Regex para CEP
 */
export const CEP_REGEX = /^\d{5}-\d{3}$/;
