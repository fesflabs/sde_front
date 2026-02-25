import { z } from 'zod';

// Reexportamos todos os validators dos módulos
export * from './fields';

// Função utilitária para validação de enums
export function enumWithValidation<T extends z.ZodEnum<[string, ...string[]]>>(
  enumSchema: T,
  fieldName: string
): z.ZodEffects<T> {
  return enumSchema.describe(fieldName).refine((val) => val !== undefined, {
    message: `${fieldName} é obrigatório`,
  });
}
