/**
 * Formata hora para ISO (HH:MM:SS)
 */
export function formatTimeToISO(time: string): string {
  if (!time) return '';
  try {
    return `${time}:00`;
  } catch {
    return '';
  }
}

/**
 * Formata hora de ISO para HH:MM
 */
export function formatTimeFromISO(isoTime: string): string {
  if (!isoTime) return '';
  try {
    // Se vier com timezone
    if (isoTime.includes('T')) {
      const [, time] = isoTime.split('T');
      return time.substring(0, 5);
    }
    // Se vier apenas o horário
    return isoTime.substring(0, 5);
  } catch {
    return '';
  }
}

/**
 * Formata hora para o padrão HH:MM
 */
export function formatTime(time: string): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  if (!hours || !minutes) return '';
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

// Regex para hora no formato HH:MM
export const TIME_REGEX = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
