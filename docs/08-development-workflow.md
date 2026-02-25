# Fluxo de Trabalho de Desenvolvimento

Este documento descreve o fluxo de trabalho de desenvolvimento recomendado para utilizar este boilerplate, cobrindo configuração, práticas de desenvolvimento, ferramentas de qualidade de código e implantação.

## Configuração do Projeto

### Pré-requisitos

- Node.js 20+
- Gerenciador de pacotes PNPM
- Git

### Configuração Inicial

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
4. Configure sua URL de API no `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Processo de Desenvolvimento

### Criando um Novo Módulo

1. **Crie a Estrutura de Diretórios do Módulo**:

   ```
   src/modules/[nome-do-módulo]/
   ├── features/           # Diretório para funcionalidades do módulo
   ├── constants/          # Constantes específicas do módulo
   └── types/              # Tipos compartilhados do módulo
   ```

2. **Configure as Permissões do Módulo**:
   - Defina as permissões de acesso ao módulo em `src/shared/config/modules-access.ts`

### Criando uma Nova Funcionalidade em um Módulo

1. **Crie a Estrutura de Diretórios da Funcionalidade**:

   ```
   src/modules/[nome-do-módulo]/features/[nome-da-funcionalidade]/
   ├── api/
   ├── components/
   ├── hooks/
   ├── store/
   └── types/
   ```

2. **Defina a API da Funcionalidade**:

   - Crie endpoints em `api/endpoints.ts`
   - Implemente consultas em `api/queries.ts`
   - Implemente mutações em `api/mutations.ts`

3. **Implemente a UI da Funcionalidade**:

   - Crie componentes em `components/`
   - Crie hooks em `hooks/`
   - Defina tipos em `types/`

4. **Crie as Rotas da Funcionalidade**:
   - Adicione as rotas no diretório `src/app/`
   - Use componentes da sua funcionalidade

### Ferramentas de Qualidade de Código

O boilerplate inclui várias ferramentas para garantir a qualidade do código:

#### ESLint

O ESLint está configurado para as melhores práticas de TypeScript e React:

```bash
# Executar verificação do ESLint
pnpm lint

# Corrigir problemas automaticamente corrigíveis
pnpm lint:fix
```

#### Prettier

O Prettier está configurado para formatação consistente do código:

```bash
# Formatar código
pnpm format
```

#### Comando de Correção Combinado

O boilerplate fornece um comando combinado para corrigir todos os problemas de formatação e linting:

```bash
pnpm fix:all
```

### Git Hooks

O boilerplate usa Husky e lint-staged para garantir a qualidade do código nos commits:

- **Hook Pré-commit**: Executa ESLint e Prettier nos arquivos em staging
- **Hook de Mensagem de Commit**: Valida o formato da mensagem de commit (opcional)

### Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes no modo de observação
pnpm test:watch

# Gerar relatório de cobertura de teste
pnpm test:coverage
```

## Estratégia de Ramificação

A estratégia de ramificação recomendada é:

1. **main**: Código pronto para produção
2. **develop**: Ramo de integração para funcionalidades
3. **feature/[nome]**: Ramos de desenvolvimento de funcionalidades
4. **hotfix/[nome]**: Ramos de correção de bugs
5. **release/[versão]**: Ramos de preparação para lançamento

## Processo de Pull Request

1. Crie um ramo de funcionalidade a partir do develop
2. Implemente suas alterações
3. Certifique-se de que todos os testes passam
4. Envie um pull request para develop
5. Aguarde a revisão de código e a aprovação das verificações de CI/CD
6. Mescle com develop use preferencialmente o stash de merge

## Implantação

### Compilando para Produção

```bash
# Compilar versão de produção
pnpm build

# Verificar compilação de produção localmente
pnpm start
```

### Plataformas de Implantação Recomendadas

O boilerplate é compatível com múltiplas plataformas de implantação, mas na FESF utilizamos o deploy dos serviços onpremisses

**Docker**:

- Use o Dockerfile incluído
- Compile com `docker build -t your-app .`
- Execute com `docker run -p 3000:3000 your-app`

## Integração Contínua

O boilerplate está preparado para pipelines de CI/CD com:

- Verificação de tipos com TypeScript
- Linting com ESLint
- Testes com Vitest
- Relatório de cobertura

O exemplo de fluxo de trabalho do GitHub Actions está incluído em `.github/workflows/main.yml`.

## Documentação

Documente seu código e funcionalidades conforme você desenvolve:

- **Comentários**: Adicione comentários como os presentes no boilerplate a funções e componentes, apesar de não serem obrigatórios e o codigo ser preferencialmente autoexplicativo.
- **README**: Atualize arquivos README específicos de funcionalidades
- **Documentação de API**: Documente endpoints de API e seus parâmetros

> OBS: **Storybook**: Atualmente não está incluído, mas pode ser adicionado para documentação de componentes UI.
