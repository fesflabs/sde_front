/**
 * Remove todos os caracteres especiais, deixando apenas números
 */
export function cleanSpecialChars(value: string): string {
  if (!value) return '';
  return value.replace(/\D/g, '');
}

/**
 * Converte data do formato brasileiro (DD/MM/YYYY) para ISO (YYYY-MM-DD)
 */
export function brazilianToISODate(date: string): string {
  if (!date) return '';
  const parts = date.split('/');
  if (parts.length !== 3) return '';
  const [day, month, year] = parts;
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Converte data do formato ISO (YYYY-MM-DD) para brasileiro (DD/MM/YYYY)
 */
export function ISOToBrazilianDate(date: string): string {
  if (!date) return '';
  const parts = date.split('-');
  if (parts.length !== 3) return '';
  const [year, month, day] = parts;
  if (!day || !month || !year) return '';
  return `${day}/${month}/${year}`;
}
