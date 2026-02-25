'use client';

import React from 'react';
import { AlertProvider, useAlert as useOriginalAlert } from '@/shared/hooks/use-alert';

/**
 * A wrapper for useAlert hook that makes it easier to import and use.
 * This hook provides functions to display alert dialogs:
 *
 * - showAlert: Shows a dialog with confirm and cancel options
 * - showMessage: Shows a dialog with just an OK button and returns a promise
 *
 * @example
 * // Basic usage
 * const { showAlert, showMessage } = useAlert();
 *
 * // Show a simple alert with cancel and confirm buttons
 * showAlert("Warning", "Are you sure you want to proceed?", () => {
 *   // Action to take when confirmed
 *   console.log("User confirmed");
 * });
 *
 * // Show a message and wait for user to acknowledge
 * await showMessage("Success", "Your data has been saved.");
 * // Code here runs after user clicks OK
 */
export function useAlert() {
  return useOriginalAlert();
}

/**
 * Wrap your application with this provider to use the useAlert hook.
 * Typically placed in the root layout or near the top of your component tree.
 */
export function AlertDialogProvider({ children }: { children: React.ReactNode }) {
  return <AlertProvider>{children}</AlertProvider>;
}
