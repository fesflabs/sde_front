import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Adicione aqui quaisquer providers que seus componentes precisem para os testes
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

// Re-exporta tudo
export * from '@testing-library/react';
export { customRender as render };
