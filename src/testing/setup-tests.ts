/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Configuração global do ambiente de testes
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Silenciar warnings específicos durante testes
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: useLayoutEffect does nothing on the server/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Mock para IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));
