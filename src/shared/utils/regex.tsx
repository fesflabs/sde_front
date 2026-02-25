// Este arquivo é mantido para compatibilidade, mas os regex
// agora estão definidos em seus respectivos módulos de campo

// Reexportamos todos os regex dos módulos
export * from './fields';

// Definimos constantes específicas para regex comuns
export const NUM_ONLY_REGEX = /\d+/;
export const ALPHA_ONLY_REGEX = /[a-zA-Z]+/;
export const ALPHANUMERIC_REGEX = /[a-zA-Z0-9]+/;
export const SPECIAL_CHARS_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
