# Estratégia de Testes

Este boilerplate implementa uma estratégia abrangente de testes usando o Vitest como framework principal de testes, junto com React Testing Library para testes de componentes.

## Configuração do Framework de Testes

A infraestrutura de testes é configurada usando Vitest com:

- **JSDOM**: Simula um ambiente de navegador para testes de componentes
- **React Testing Library**: Fornece utilitários para testar componentes React
- **Relatórios de Cobertura de Testes**: Mede a cobertura de código através do Vitest
- **Ambientes de Teste Isolados**: Cada teste é executado em seu próprio ambiente

## Estrutura de Diretórios de Testes

Os testes seguem a mesma organização baseada em funcionalidades do código-fonte:

```
tests/
├── features/                    # Testes para código específico de funcionalidades
│   ├── auth/                    # Testes da funcionalidade de autenticação
│   │   ├── components/          # Testes de componentes de auth
│   │   ├── hooks/               # Testes de hooks de auth
│   │   └── utils/               # Testes de utilitários de auth
│   ├── user/                    # Testes da funcionalidade de usuário
│   └── ...                      # Outros testes de funcionalidades
├── shared/                      # Testes para código compartilhado
│   ├── components/              # Testes de componentes compartilhados
│   ├── hooks/                   # Testes de hooks compartilhados
│   └── lib/                     # Testes de bibliotecas compartilhadas
│       ├── api-client/          # Testes do cliente API
│       └── ...                  # Outros testes de lib compartilhadas
└── setup.ts                     # Configuração de setup de testes
```

## Testando Diferentes Componentes

### 1. Componentes React

Os testes de componentes focam na renderização, interações do usuário e integração com hooks:

```typescript
// Exemplo de teste de componente para um formulário de login
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LoginForm } from '@/features/auth/components/login-form';
import { useLogin } from '@/features/auth/api/mutations';

// Mock do hook
vi.mock('@/features/auth/api/mutations', () => ({
  useLogin: vi.fn(),
}));

describe('LoginForm', () => {
  it('renderiza o formulário de login corretamente', () => {
    // Implementação do mock
    const mockLogin = vi.fn();
    (useLogin as any).mockReturnValue({
      mutate: mockLogin,
      isLoading: false,
    });

    render(<LoginForm />);

    // Verificar se os elementos do formulário estão presentes
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('envia o formulário com as credenciais do usuário', async () => {
    // Implementação do mock
    const mockLogin = vi.fn();
    (useLogin as any).mockReturnValue({
      mutate: mockLogin,
      isLoading: false,
    });

    render(<LoginForm />);

    // Preencher formulário e enviar
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Verificar se login foi chamado com os dados corretos
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### 2. Hooks Personalizados

Testes de hooks usam `renderHook` do React Testing Library:

```typescript
// Exemplo de teste de hook para useAuth
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useAuthStore } from '@/features/auth/store/auth-store';

// Mock da store
vi.mock('@/features/auth/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

describe('useAuth', () => {
  it('retorna o status de autenticação e dados do usuário', () => {
    // Implementação mock da store
    (useAuthStore as any).mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual({ id: '123', email: 'test@example.com' });
    expect(result.current.isLoading).toBe(false);
  });

  it('lida corretamente com o estado não autenticado', () => {
    // Implementação mock da store para estado não autenticado
    (useAuthStore as any).mockReturnValue({
      user: null,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
```

### 3. Cliente API & Queries

Testando clientes de API e hooks do TanStack Query:

```typescript
// Exemplo de teste para um hook de consulta API
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { useCurrentUser } from '@/features/user/api/queries';
import { apiClient } from '@/shared/lib/api-client/client';

// Mock do cliente API
vi.mock('@/shared/lib/api-client/client', () => ({
  apiClient: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCurrentUser', () => {
  it('busca os dados do usuário atual com sucesso', async () => {
    const mockUser = { id: '123', email: 'user@example.com', name: 'Test User' };
    (apiClient.get as any).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    // Inicialmente em estado de carregamento
    expect(result.current.isLoading).toBe(true);

    // Aguardar a resolução da consulta
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Verificar dados e status
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockUser);
  });
});
```

## Executando Testes

O boilerplate inclui vários scripts npm para execução de testes:

```bash
# Executar todos os testes
npm test

# Executar testes no modo de observação durante o desenvolvimento
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

## Requisitos de Cobertura

O projeto tem limiares mínimos de cobertura definidos:

- **Declarações**: 75%
- **Ramificações**: 70%
- **Funções**: 75%
- **Linhas**: 75%

Esses limiares são aplicados no pipeline de CI/CD para manter a qualidade do código.

## Melhores Práticas de Testes

1. **Teste pelo Comportamento do Usuário**: Concentre-se em como os usuários interagem com os componentes
2. **Isole os Testes**: Cada teste deve ser independente
3. **Mock de Dependências Externas**: Use mocks para serviços externos e hooks
4. **Teste Funcionalidades Isoladamente**: Crie mocks para dependências fora da funcionalidade sendo testada
5. **Crie Utilitários de Teste**: Use funções auxiliares para manter os testes DRY (Don't Repeat Yourself)
6. **Teste Estados de Erro**: Não teste apenas o caminho feliz
7. **Use IDs de Teste Consistentemente**: Adicione data-testid para elementos sem nomes ou papéis acessíveis
8. **Mantenha Testes Focados**: Teste um comportamento específico por caso de teste
