/**
 * Formata um número para moeda brasileira (R$)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export const CURRENCY_REGEX = /^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2})$/;
