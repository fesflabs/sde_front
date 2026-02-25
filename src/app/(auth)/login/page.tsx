'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { LoginForms } from '@/features/auth/components/login-form';

import srs_logo from '../../../../public/assets/images/srs_logo.png';

function SessionMessage() {
  const searchParams = useSearchParams();
  const sessionExpired = searchParams.get('session_expired');

  if (!sessionExpired) return null;

  return (
    <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
      <p className="text-center text-sm text-yellow-700">
        Sua sessão expirou. Por favor, faça login novamente.
      </p>
    </div>
  );
}

export default function AuthenticationPage() {
  return (
    <div className="flex w-full flex-col justify-center space-y-4 p-6 px-4 sm:w-[400px] sm:px-0">
      <Suspense fallback={null}>
        <SessionMessage />
      </Suspense>
      <div className="-ml-5 flex flex-col items-center gap-2">
        <div className="flex w-full items-center justify-center md:w-8/12">
          <Image src={srs_logo} alt="SRS Logo" className="mb-4 h-auto w-98" priority />
        </div>
      </div>
      <hr className="my-6 border-t border-gray-200" />
      <div className="mt-3 flex flex-col items-center space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-500">Faça seu Login</h1>
        <p className="text-center text-xs text-gray-400">
          Utilize seu CPF e senha para realizar o login. Após o acesso, você poderá alterar a sua
          senha.
        </p>
      </div>
      <LoginForms />
      <p className="text-muted-foreground text-center text-sm font-light">
        Esqueceu sua senha?{' '}
        <Link href="/forgot-password" className="hover:text-primary underline underline-offset-4">
          Clique aqui
        </Link>
      </p>
      <p className="text-muted-foreground px-8 py-4 text-center text-sm">
        Ao clicar em continuar você concorda com nossos{' '}
        <Link href="/terms-and-policy" className="hover:text-primary underline underline-offset-4">
          Termos de Uso e Política de Privacidade
        </Link>
      </p>
    </div>
  );
}
