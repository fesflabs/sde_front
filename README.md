# Boilerplate de Arquitetura Baseada em Módulos e Funcionalidades para Next.js

Este repositório fornece um boilerplate robusto e escalável para construir aplicações web modernas com Next.js, seguindo uma abordagem arquitetural baseada em módulos organizacionais e funcionalidades.

## Funcionalidades

- **Arquitetura em Módulos e Funcionalidades**: Código organizado em módulos (setores organizacionais) que contêm funcionalidades específicas
- **Controle de Acesso por Módulo**: Sistema de permissões que reflete a estrutura organizacional da empresa
- **Next.js 15 com App Router**: Utilizando as mais recentes capacidades do Next.js
- **TypeScript**: Segurança de tipos completa em toda a aplicação
- **TanStack Query + Zustand**: Poderoso sistema de busca de dados e gerenciamento de estado
- **Autenticação e Autorização**: Fluxo completo de autenticação com proteção de rotas
- **Cliente de API**: Comunicação flexível com API utilizando o padrão adaptador
- **Manipulação de Formulários**: Gerenciamento eficiente de formulários com React Hook Form + Zod
- **Componentes de UI**: Componentes acessíveis construídos com Radix UI + Tailwind CSS
- **Testes**: Configuração abrangente de testes com Vitest
- **Ferramentas de Desenvolvimento**: ESLint, Prettier, Husky e lint-staged

## Primeiros Passos

### Pré-requisitos

- Node.js 20+
- Gerenciador de pacotes PNPM

### Instalação

```bash
# Clone o repositório
git clone https://github.com/yourusername/nextjs-feature-boilerplate.git
cd nextjs-feature-boilerplate

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
pnpm dev
```

## Documentação

A documentação completa está disponível no diretório `docs`:

- [Introdução](docs/01-introduction.md)
- [Visão Geral da Arquitetura](docs/02-architecture.md)
- [Implementação de Funcionalidades](docs/03-features.md)
- [Estratégia de Gerenciamento de Estado](docs/04-state-management.md)
- [Implementação do Cliente de API](docs/05-api-client.md)
- [Autenticação e Autorização](docs/06-authentication.md)
- [Estratégia de Testes](docs/07-testing.md)
- [Fluxo de Trabalho de Desenvolvimento](docs/08-development-workflow.md)
- [Estrutura do Projeto](docs/09-project-structure.md)
- [Decisões Técnicas](docs/10-technical-decisions.md)
