'use client';
import { WelcomeModal } from '@/features/auth/components/welcome-modal';
import { UserInfoPanel } from '@/features/auth/components/user-info-panel';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <WelcomeModal />

      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8 text-gray-500">
        Bem-vindo ao seu painel de controle. Aqui está um resumo das suas informações e permissões
        no sistema.
      </p>

      <UserInfoPanel />
    </div>
  );
}
// 'use client';
//
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/features/auth/hooks/use-auth';
//
// export default function DashboardPage() {
//   const { user, isAuthenticated, requiresRoleSelection } = useAuth();
//   const router = useRouter();
//
//   useEffect(() => {
//     // Check for authentication on client-side only
//     if (typeof window !== 'undefined') {
//       if (!document.cookie.includes('authToken=')) {
//         router.push('/login');
//         return;
//       }
//     }
//
//     // adiconar modal-alert com a mensagem padrão de login "ola {nome} parabens, voce logou no sistema do {sistema} voce tem cargo {cargo} e {funções}"
//
//     // No need to redirect to select role page for now
//     // if (requiresRoleSelection) {
//     //   router.push('/select-role');
//     // }
//   }, [isAuthenticated, requiresRoleSelection, router]);
//
//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
//       <p className="mb-4">Bem-vindo ao dashboard!</p>
//
//       <div className="rounded bg-gray-100 p-4">
//         <h2 className="mb-2 text-lg font-semibold">Informações do usuário:</h2>
//         <pre className="overflow-auto text-sm">{JSON.stringify(user, null, 2)}</pre>
//       </div>
//     </div>
//   );
// }
