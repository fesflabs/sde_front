// sss/middleware.ts
import { NextResponse } from 'next/server';

export function middleware() {
  // Simplesmente permite que todas as rotas passem sem verificação
  return NextResponse.next();
}

export const config = {
  // Deixamos o matcher vazio para que ele não intercepte nada
  matcher: [],
};
