import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useLogin } from '../api/mutations';
import { useSonner } from '@/shared/hooks/use-sonner';
import { LoginRequest, loginRequestSchema } from '../schemas/auth-schemas';
import { formatCPF, isValidCPF } from '@/shared/utils/fields/cpf';
import { PasswordInput } from '@/shared/components/password-input';

type LoginFormValues = z.infer<typeof loginRequestSchema>;

export function LoginForms() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useSonner();
  const login = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);

    try {
      // Normalizando o CPF - removendo caracteres especiais
      const normalizedCpf = values.username.replace(/\D/g, '');

      // Chamando a API de login
      const response = await login.mutateAsync({
        username: normalizedCpf,
        password: values.password,
      } as LoginRequest);

      toast({
        title: 'Login realizado com sucesso',
        description: response.message || 'Você será redirecionado em instantes.',
      });

      // Verificar se precisa selecionar módulo/perfil
      if (response.requires_role_selection) {
        router.push('/select-module');
      } else {
        // Redirecionar para a página principal após login
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente.',
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu CPF"
                    disabled={isLoading}
                    onChange={(e) => {
                      // Limit input to 14 chars (formatted CPF max length)
                      const input = e.target.value.slice(0, 14);
                      const formattedCPF = formatCPF(input);
                      field.onChange(formattedCPF);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    value={field.value}
                    maxLength={14} // Explicit maxLength for the input
                    className={field.value && !isValidCPF(field.value) ? 'border-red-300' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Digite sua senha" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
