# Referência da Estrutura do Projeto

Este documento fornece uma referência abrangente para a estrutura do projeto, explicando o propósito e a organização de cada diretório e arquivo principal.

## Estrutura Raiz

```
/
├── .github/                     # Fluxos de trabalho do GitHub
├── .husky/                      # Hooks do Git
├── docs/                        # Documentação do projeto
├── public/                      # Ativos estáticos
├── src/                         # Código-fonte da aplicação
├── tests/                       # Testes Vitest
├── .env.example                 # Exemplo de variáveis de ambiente
├── .eslintrc.json               # Configuração do ESLint
├── .gitignore                   # Regras de ignorar do Git
├── .prettierrc                  # Configuração do Prettier
├── components.json              # Configuração do shadcn/ui
├── eslint.config.mjs            # Configuração do ESLint (novo formato)
├── lint-staged.config.js        # Configuração do lint-staged
├── next.config.js               # Configuração do Next.js
├── package.json                 # Dependências e scripts do projeto
├── postcss.config.js            # Configuração do PostCSS
├── README.md                    # README do projeto
├── tailwind.config.js           # Configuração do Tailwind CSS
├── tsconfig.json                # Configuração do TypeScript
└── vitest.config.ts             # Configuração do Vitest
```

## Diretório de Código-Fonte (`src/`)

```
src/
├── app/                         # Next.js App Router
│   ├── (auth)/                  # Grupo de rotas de autenticação
│   ├── (protected)/             # Grupo de rotas protegidas
│   ├── api/                     # Rotas de API
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Página inicial
├── modules/                     # Organização baseada em módulos
│   ├── rh/                      # Módulo de Recursos Humanos
│   │   ├── features/            # Funcionalidades do módulo RH
│   │   │   ├── employees/       # Funcionalidade de gerenciamento de funcionários
│   │   │   └── recruitment/     # Funcionalidade de recrutamento
│   │   └── constants/           # Constantes específicas do módulo
│   ├── financial/               # Módulo Financeiro
│   │   ├── features/            # Funcionalidades do módulo Financeiro
│   │   │   ├── invoicing/       # Funcionalidade de faturamento
│   │   │   └── payments/        # Funcionalidade de pagamentos
│   │   └── constants/           # Constantes específicas do módulo
├── shared/                      # Código compartilhado
│   ├── components/              # Componentes compartilhados
│   ├── config/                  # Configuração global
│   ├── hooks/                   # Hooks compartilhados
│   ├── lib/                     # Bibliotecas principais
│   └── utils/                   # Funções utilitárias
├── middleware.ts                # Middleware do Next.js
└── providers/                   # Provedores globais
```

## Explicação dos Principais Diretórios

### Modules (`modules/`)

O diretório `modules/` contém todos os módulos organizacionais, cada um representando um setor ou departamento da empresa:

- **Módulos Organizacionais**: Cada módulo (como `rh/`, `financial/`) representa um setor específico da empresa
- **Funcionalidades por Módulo**: Dentro de cada módulo, o diretório `features/` contém as funcionalidades específicas daquele módulo
- **Código Específico do Módulo**: Constantes, tipos e utilitários que são compartilhados entre funcionalidades do mesmo módulo

### Features (Dentro dos Módulos) (`modules/[nome-do-módulo]/features/`)

Cada diretório de funcionalidade contém todo o código relacionado a um domínio de negócio específico de um modulo:

- **API**: Endpoints de API, consultas e mutações específicas da funcionalidade
- **Components**: Componentes de UI específicos da funcionalidade
- **Hooks**: Hooks React personalizados específicos da funcionalidade
- **Store**: Gerenciamento de estado (stores Zustand) para a funcionalidade
- **Types**: Tipos TypeScript específicos da funcionalidade
- **Schemas**: Schemas Zod para validação específica da funcionalidade

### App Router (`app/`)

O diretório `app/` usa o padrão App Router do Next.js 15:

- **Grupos de Rota**: Pastas entre parênteses como `(auth)` e `(protected)` são grupos de rotas
- **Componentes de Página**: Arquivos `page.tsx` definem rotas
- **Layouts**: Arquivos `layout.tsx` definem layouts compartilhados
- **Rotas de API**: O diretório `api/` contém manipuladores de endpoints de API

### Shared (`shared/`)

O diretório `shared/` contém código usado em várias funcionalidades:

#### Components

- **UI**: Componentes UI primitivos baseados no shadcn/ui
- **Forms**: Componentes de formulário reutilizáveis
- **Layouts**: Componentes de layout compartilhados

#### Config

Arquivos de configuração para variáveis de ambiente, flags de funcionalidades, rotas, etc.

#### Lib

Bibliotecas principais com responsabilidades específicas:

- **API Client**: Cliente HTTP com padrão adapter
- **Auth**: Utilitários de autenticação e autorização

#### Schemas

Schemas Zod para validação de dados, particularmente para respostas de API e entradas de formulários.

#### Utils

Funções utilitárias como formatadores, conversores de case, etc.

### Providers (`providers/`)

Provedores de contexto globais usados em toda a aplicação:

- **TanStack Provider**: Configura o React Query
- **Store Provider**: Fornece acesso às stores globais

## Arquivos de Configuração Principais

- **`next.config.js`**: Configuração do Next.js
- **`tailwind.config.js`**: Configuração do Tailwind CSS
- **`tsconfig.json`**: Configuração do TypeScript
- **`eslint.config.mjs`**: Configuração do ESLint
- **`vitest.config.ts`**: Configuração de testes
- **`components.json`**: Configuração de componentes do shadcn/ui

## Variáveis de Ambiente

Variáveis de ambiente esperadas (a serem definidas em `.env.local`):

```
NEXT_PUBLIC_API_URL=https://api-url.com
NEXT_PUBLIC_FEATURE_FLAGS_ENABLED=true
NEXT_PUBLIC_AUTH_ENABLED=true
```
