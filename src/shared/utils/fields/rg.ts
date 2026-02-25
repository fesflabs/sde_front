import { z } from 'zod';

// Regex para RG
export const RG_REGEX = /^\d{1,10}$/;

/**
 * Formata um RG para o padrão XX.XXX.XXX-X
 */
export function formatRG(value: string): string {
  if (!value) return '';
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1})$/, '$1-$2');
}

/**
 * Validator para RG
 */
export const rgValidator = z
  .string()
  .refine(
    (val) => {
      const digitsOnly = val.replace(/\D/g, '');
      return digitsOnly.length === 10 || digitsOnly.length === 6;
    },
    {
      message: 'RG inválido',
    }
  )
  .transform((val) => val.replace(/\D/g, ''));
