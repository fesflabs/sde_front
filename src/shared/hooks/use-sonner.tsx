'use client';

import { toast as sonnerToast, type ToastT } from 'sonner';
import { ReactNode } from 'react';

type SonnerToastOptions = Omit<ToastT, 'id'>;

interface ToastActionElement {
  altText: string;
  onClick: () => void;
  children: ReactNode;
}

interface UseSonnerReturn {
  toast: (
    props: {
      title?: ReactNode;
      description?: ReactNode;
      action?: ToastActionElement;
      variant?: 'default' | 'destructive';
    } & SonnerToastOptions
  ) => { id: string; dismiss: () => void; update: (props: object) => void };
  success: (title: string, description?: string, options?: SonnerToastOptions) => void;
  error: (title: string, description?: string, options?: SonnerToastOptions) => void;
  info: (title: string, description?: string, options?: SonnerToastOptions) => void;
  warning: (title: string, description?: string, options?: SonnerToastOptions) => void;
  dismiss: (toastId?: string) => void;
  message: (title: string, description?: string, options?: SonnerToastOptions) => Promise<void>;
}

/**
 * Hook for displaying toast notifications using Sonner
 * Provides a similar API to the deprecated useToast hook
 */
export function useSonner(): UseSonnerReturn {
  const toast = ({
    title,
    description,
    action,
    variant = 'default',
    ...props
  }: {
    title?: ReactNode;
    description?: ReactNode;
    action?: ToastActionElement;
    variant?: 'default' | 'destructive';
  } & SonnerToastOptions) => {
    const id = sonnerToast(title as string, {
      description,
      action: action
        ? {
            label: action.children,
            onClick: action.onClick,
          }
        : undefined,
      className: variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : '',
      ...props,
    });

    return {
      id: id.toString(),
      dismiss: () => sonnerToast.dismiss(id),
      update: (props: object) => {
        // Sonner doesn't directly have an update method, so we'll dismiss and create a new toast
        sonnerToast.dismiss(id);
        // Create a new toast with the updated props
        sonnerToast(title as string, {
          ...props,
        });
      },
    };
  };

  const dismiss = (toastId?: string) => {
    if (toastId) {
      sonnerToast.dismiss(Number(toastId));
    } else {
      sonnerToast.dismiss();
    }
  };

  const success = (title: string, description?: string, options?: SonnerToastOptions) => {
    sonnerToast.success(title, { description, ...options });
  };

  const error = (title: string, description?: string, options?: SonnerToastOptions) => {
    sonnerToast.error(title, { description, ...options });
  };

  const info = (title: string, description?: string, options?: SonnerToastOptions) => {
    sonnerToast.info(title, { description, ...options });
  };

  const warning = (title: string, description?: string, options?: SonnerToastOptions) => {
    sonnerToast.warning(title, { description, ...options });
  };

  // Helper method that returns a promise to await toast messages
  const message = (
    title: string,
    description?: string,
    options?: SonnerToastOptions
  ): Promise<void> => {
    return new Promise((resolve) => {
      sonnerToast(title, {
        description,
        onDismiss: () => resolve(),
        ...options,
      });
    });
  };

  return {
    toast,
    success,
    error,
    info,
    warning,
    dismiss,
    message,
  };
}
