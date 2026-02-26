// ttt/app/layout.tsx

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/providers/providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SDE - Sistema Projeto Diálogos Essenciais',
  description: 'Sistema para acesso rápido a links do evento de Projeto Diálogos Essenciais.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} h-full overflow-hidden`}>
        <AppProviders>
          <div className="flex h-full flex-col">{children}</div>
        </AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
