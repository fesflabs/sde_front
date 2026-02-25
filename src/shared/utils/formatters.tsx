import { formatCPF } from './fields/cpf';
import { formatPhone } from './fields/phone';
import { formatRG } from './fields/rg';
import { formatCEP } from './fields/cep';
import { cleanSpecialChars, brazilianToISODate, ISOToBrazilianDate } from './fields/common';
import { formatDateToBrazilian, formatDateToISO, formatDateFromISO } from './fields/date';
import { formatTime, formatTimeToISO, formatTimeFromISO } from './fields/time';
import { formatCurrency } from './fields/currency';

// Mantemos o objeto formatters para compatibilidade com código existente
export const formatters = {
  cpf: formatCPF,
  phone: formatPhone,
  rg: formatRG,
  onlyPositiveNumbers: (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const num = parseInt(numbers, 10) || 0;
    return num.toString();
  },
  cep: formatCEP,
  cleanSpecialChars,
  // Formatadores de data
  dateToBrazilian: formatDateToBrazilian,
  dateToISO: formatDateToISO,
  dateFromISO: formatDateFromISO,
  brazilianToISODate,
  ISOToBrazilianDate,
  // Formatadores de hora
  time: formatTime,
  timeToISO: formatTimeToISO,
  timeFromISO: formatTimeFromISO,
  // Formatador de moeda
  currency: formatCurrency,
};

// Exportamos tudo dos módulos de campos
export * from './fields';
