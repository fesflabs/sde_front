import { z } from 'zod';

// Regex para data no formato DD/MM/YYYY
export const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

/**
 * Formata data para o padrão brasileiro (DD/MM/YYYY)
 */
export function formatDateToBrazilian(dateString: string): string {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
}

/**
 * Formata data para o padrão ISO (YYYY-MM-DD)
 */
export function formatDateToISO(date: string): string {
  if (!date) return '';
  try {
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
}

/**
 * Formata data de ISO (YYYY-MM-DD) para brasileiro (DD/MM/YYYY)
 */
export function formatDateFromISO(isoDate: string): string {
  if (!isoDate) return '';

  try {
    // Se já estiver no formato dd/mm/yyyy, retorna como está
    if (isoDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      return isoDate;
    }

    // Remove qualquer timezone ou hora
    const cleanDate = isoDate.split('T')[0];

    // Se estiver no formato yyyy-mm-dd
    if (cleanDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = cleanDate.split('-');
      return `${day}/${month}/${year}`;
    }

    // Se estiver no formato dd-mm-yyyy
    if (cleanDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = cleanDate.split('-');
      return `${day}/${month}/${year}`;
    }

    // Tenta criar um objeto Date
    const date = new Date(cleanDate);
    if (isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Invalid date format');
  }
}

/**
 * Schema Zod para validação de data
 */
export const dateSchema = z.string().regex(DATE_REGEX, 'Data inválida');

/**
 * Valida se uma string é uma data válida
 */
export function validateDate(date: string): string {
  return dateSchema.parse(date);
}
