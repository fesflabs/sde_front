import Image from 'next/image';
import Link from 'next/link';

import srs_logo from '../../../../public/assets/images/srs_logo.png';
import { cn } from '@/shared/lib/utils';
import { ForgotPasswordForms } from '@/features/auth/components/forgot-password-forms';

export default function ForgotPasswordPage() {
  return (
    <>
      <Link href="/login" className={cn('absolute top-4 right-4 md:top-8 md:right-8')}>
        Login
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-8 px-4 sm:w-[400px] sm:px-0">
        <div className="flex flex-col items-center space-y-4">
          <Image src={srs_logo} alt="SRS Logo" width={120} height={120} priority className="mb-1" />
          <h1 className="text-2xl font-semibold tracking-tight">Esqueci minha senha</h1>
          <p className="text-muted-foreground text-center text-sm">
            Insira seu email para receber um link de redefinição de senha.
          </p>
        </div>
        <ForgotPasswordForms />
        <p className="text-muted-foreground px-8 py-4 text-center text-sm">
          Ao clicar em continuar você concorda com nossos{' '}
          <Link
            href="/terms-and-policy"
            className="hover:text-primary underline underline-offset-4"
          >
            Termos de Uso e Política de Privacidade
          </Link>
        </p>
      </div>
    </>
  );
}
