'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/shared/components/ui/alert-dialog';

interface DialogState {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

interface AlertContextType {
  showAlert: (title: string, description: string, onConfirm?: () => void) => void;
  showMessage: (title: string, message: string) => Promise<void>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    title: '',
    description: '',
    showCancel: true,
  });

  const showAlert = (title: string, description: string, onConfirm?: () => void) => {
    setDialogState({
      isOpen: true,
      title,
      description,
      onConfirm: onConfirm || (() => {}),
      showCancel: true,
    });
  };

  const showMessage = (title: string, message: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      // First ensure the dialog is closed
      setDialogState({
        isOpen: false,
        title: '',
        description: '',
        showCancel: false,
      });

      // Then open with the new message
      setTimeout(() => {
        setDialogState({
          isOpen: true,
          title,
          description: message,
          onConfirm: () => {
            setDialogState((prev) => ({ ...prev, isOpen: false }));
            resolve();
          },
          showCancel: false,
        });
      }, 100);
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert, showMessage }}>
      {children}
      <AlertDialog
        open={dialogState.isOpen}
        onOpenChange={(isOpen: boolean) => setDialogState((prev) => ({ ...prev, isOpen }))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialogState.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {dialogState.showCancel && <AlertDialogCancel>Cancelar</AlertDialogCancel>}
            <AlertDialogAction onClick={() => dialogState.onConfirm?.()}>
              {dialogState.showCancel ? 'Continuar' : 'OK'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
