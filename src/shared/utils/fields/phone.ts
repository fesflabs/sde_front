import { z } from 'zod';

// Regex para telefone (com ou sem formatação)
export const PHONE_REGEX = /^\(?(\d{2})\)?\s?(\d{4,5})-?(\d{4})$/;

/**
 * Formata um número de telefone para o padrão (XX) XXXXX-XXXX
 */
export function formatPhone(value: string): string {
  if (!value) return '';
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d{4})$/, '$1-$2');
}

/**
 * Schema Zod para validação simples de telefone
 */
export const phoneSchema = z.string().regex(PHONE_REGEX, 'Telefone inválido');

/**
 * Validator avançado para telefone com transformação
 */
export const phoneValidator = z
  .string()
  .transform((val) => formatPhone(val))
  .refine(
    (val) => {
      const clean = val.replace(/\D/g, '');
      return clean.length >= 10 && clean.length <= 11;
    },
    {
      message: 'Número de telefone inválido - formato esperado: (00) 00000-0000',
    }
  );
