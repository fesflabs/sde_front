'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { Spinner } from '@/shared/components/spinner';
import { useAlert } from '@/providers/alert-provider-warpper';
import { useForgotPassword } from '../api/mutations';

// Define validation schema with zod
const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'O email é obrigatório').email('O formato do email é inválido'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForms({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const forgotPasswordMutation = useForgotPassword();
  const { showMessage } = useAlert();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPasswordMutation.mutateAsync(data.email);

      await showMessage(
        'Sucesso',
        'O link para redefinição de senha foi enviado para o seu email.'
      );
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Falha ao enviar o link de redefinição de senha.';

      // Set form error
      setError('email', {
        type: 'manual',
        message: errorMessage,
      });

      await showMessage('Erro', errorMessage);
    }
  };

  const isLoading = forgotPasswordMutation.isPending;

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className={errors.email ? 'border-red-500' : ''}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm font-medium text-red-500">{errors.email.message}</span>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="mt-1">
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar link de redefinição'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
