'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { useCurrentUser } from '@/features/auth/api/queries';
import { useAuthStore } from '@/features/auth/store/auth-store';

export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  // Obtém dados do usuário tanto do store quanto diretamente da query
  const { user: storeUser } = useAuthStore();
  const { data: queryUser } = useCurrentUser();

  // Prioriza o usuário do store, mas usa o da query se necessário
  const user = storeUser || queryUser;

  useEffect(() => {
    // Mostra o modal quando os dados do usuário estiverem disponíveis
    if (user) {
      setOpen(true);
    }
  }, [user]);

  if (!user) return null;

  // Extrai o nome de usuário do email
  const userName = user.email.split('@')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bem-vindo ao Sistema!</DialogTitle>
          <DialogDescription>
            Olá <span className="text-primary font-bold">{userName}</span>, parabéns por fazer login
            no sistema.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Entendi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
