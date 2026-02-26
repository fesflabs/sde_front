import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PPE - Módulo de Prestação de Contas',
};

/**
 * Página inicial do módulo PPE
 */
export default function PpeModulePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Prestação de Contas</h1>

      <Suspense fallback={<div>Carregando indicadores...</div>}></Suspense>

      {/* Outros componentes específicos do módulo PPE */}
    </div>
  );
}
