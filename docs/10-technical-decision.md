# Decisões Técnicas

Este documento explica as principais decisões técnicas tomadas neste boilerplate, incluindo a lógica por trás das escolhas de tecnologia e padrões arquiteturais.

## Tecnologias Principais

### Next.js (App Router)

**Decisão**: Utilizar Next.js com App Router como framework da aplicação.

**Justificativa**:

- **Server Components**: Otimiza o desempenho através de componentes React renderizados no servidor
- **Roteamento Simplificado**: Roteamento baseado em sistema de arquivos simplifica a navegação
- **Rotas de API Integradas**: Criação fácil de rotas de API sem configuração adicional de servidor
- **Builds Otimizadas**: Divisão automática de código e otimização de ativos
- **Ecossistema Forte**: Grande comunidade e excelente documentação

### React 19

**Decisão**: Utilizar React 19 para a biblioteca de UI.

**Justificativa**:

- **Recursos Mais Recentes**: Acesso às últimas funcionalidades e melhorias do React
- **Desempenho**: Melhor performance de renderização e otimizações
- **Preparação para o Futuro**: Garante compatibilidade com futuras atualizações do ecossistema React

### TypeScript

**Decisão**: Utilizar TypeScript para segurança de tipos.

**Justificativa**:

- **Segurança de Tipos**: Detecta erros em tempo de compilação em vez de durante a execução
- **Experiência do Desenvolvedor**: Melhor suporte de IDE e autocompletar
- **Código Autodocumentado**: Tipos servem como documentação
- **Confiança na Refatoração**: Refatoração mais segura com verificação de tipos

### Zustand para Gerenciamento de Estado

**Decisão**: Utilizar Zustand em vez de Redux ou Context API para estado global.

**Justificativa**:

- **Simplicidade**: Mínimo boilerplate comparado ao Redux
- **Desempenho**: Atualizações eficientes com memorização automática
- **Suporte a TypeScript**: Excelente integração com TypeScript
- **Composabilidade**: Facilidade para criar e compor múltiplas stores
- **Suporte a Middleware**: Suporte para middlewares como persistência e devtools

### TanStack Query para Dados de API

**Decisão**: Utilizar TanStack Query para busca e cache de dados de API.

**Justificativa**:

- **Cache**: Cache integrado reduz requisições de rede desnecessárias
- **Recarregamento em Segundo Plano**: Mantém dados atualizados sem afetar a experiência do usuário
- **Estados de Carregamento/Erro**: Manipulação simplificada de estados de carregamento e erro
- **Suporte a Paginação**: Suporte integrado para paginação e consultas infinitas
- **Ferramentas de Desenvolvimento**: Excelentes ferramentas de depuração para inspecionar consultas e cache

### Zod para Validação

**Decisão**: Utilizar Zod para validação de esquemas.

**Justificativa**:

- **Integração com TypeScript**: Suporte de primeira classe ao TypeScript com inferência de tipos
- **Validação em Tempo de Execução**: Valida dados em tempo de execução além das verificações em tempo de compilação do TypeScript
- **Integração com API**: Perfeito para validar respostas de API
- **Integração com Formulários**: Funciona bem com React Hook Form
- **Composição de Esquemas**: Fácil de compor e reutilizar esquemas

### Axios (via Padrão Adapter)

**Decisão**: Utilizar Axios através de um padrão adapter para requisições de API.

**Justificativa**:

- **Padrão Adapter**: Desacopla a lógica de negócio da implementação do cliente HTTP
- **Organização por Funcionalidade**: Permite que as operações de API sejam organizadas por funcionalidade
- **Testabilidade**: Facilita testes através de mocking
- **Interceptadores**: Poderosos interceptadores de requisição/resposta para tratamento global
- **Tratamento de Erros**: Tratamento de erros consistente em toda a aplicação

## Decisões Arquiteturais

### Arquitetura Baseada em Módulos e Funcionalidades

**Decisão**: Organizar código em uma hierarquia de módulos organizacionais e funcionalidades.

**Justificativa**:

- **Alinhamento Organizacional**: A estrutura do código reflete a estrutura organizacional da FESF
- **Gerenciamento de Permissões**: Facilita a implementação de controle de acesso baseado em módulos
- **Escalabilidade por Setor**: Permite que equipes diferentes trabalhem em módulos diferentes
- **Clareza de Responsabilidades**: Torna explícito quais funcionalidades pertencem a quais setores
- **Evolução Independente**: Módulos podem evoluir independentemente conforme as necessidades do setor

### Controle de Acesso por Módulo

**Decisão**: Implementar controle de acesso no nível do módulo além do nível da funcionalidade.

**Justificativa**:

- **Simplicidade de Permissões**: Usuários podem ter acesso a módulos inteiros
- **Hierarquia Natural**: Reflete a estrutura hierárquica organizacional
- **Auditoria Simplificada**: Facilita o rastreamento de quais setores têm acesso a quais recursos
- **Onboarding Eficiente**: Novos usuários podem receber acesso por setor/módulo

### Autenticação em Múltiplas Camadas

**Decisão**: Implementar autenticação em múltiplos níveis (middleware, provider, componentes).

**Justificativa**:

- **Defesa em Profundidade**: Múltiplas camadas de segurança protegem contra diferentes vetores de ataque
- **UX Melhorada**: Verificações do lado do cliente evitam redirecionamentos desnecessários
- **Fallbacks Elegantes**: Verificações do lado do servidor fornecem proteção de segurança final
- **Controle Detalhado**: Diferentes camadas lidam com diferentes aspectos da autenticação

### Conversão de Caso para Comunicação com API

**Decisão**: Lidar com a conversão camelCase/snake_case automaticamente no cliente de API.

**Justificativa**:

- **Consistência**: Frontend pode usar camelCase em todo lugar enquanto o backend usa snake_case
- **DRY**: Não há necessidade de converter casos manualmente para cada chamada de API
- **Redução de Erros**: Elimina erros de conversão manual
- **Experiência do Desenvolvedor**: Desenvolvedores trabalham com convenções naturais ao seu domínio

### Gerenciamento de Estado Híbrido

**Decisão**: Utilizar TanStack Query para estado do servidor e Zustand para estado da UI.

**Justificativa**:

- **Separação de Preocupações**: Diferentes ferramentas para diferentes tipos de estado
- **Especialização**: Cada biblioteca se destaca em seu caso de uso específico
- **Desempenho Otimizado**: TanStack Query lida com cache e revalidação, Zustand lida com atualizações de UI
- **Experiência do Desenvolvedor**: API simplificada para cada tipo de estado

### Estratégia Abrangente de Testes

**Decisão**: Utilizar Vitest com React Testing Library e limiares de cobertura aplicados.

**Justificativa**:

- **Framework Moderno**: Vitest é mais rápido e rico em recursos que Jest
- **Testes Centrados no Usuário**: React Testing Library incentiva testes da perspectiva do usuário
- **Requisitos de Cobertura**: Limiares aplicados mantêm a qualidade do código
- **Estrutura Correspondente**: Os testes seguem a mesma organização por funcionalidades do código

## Decisões de UI/UX

### Radix UI com Tailwind

**Decisão**: Utilizar componentes ShacnUI(Radix UI) estilizados com Tailwind CSS.

**Justificativa**:

- **Acessibilidade**: ShacnUI fornece componentes acessíveis prontos para uso
- **Personalização**: Tailwind facilita a estilização consistente desses componentes
- **Desempenho**: Classes utilitárias do Tailwind reduzem o tamanho do bundle CSS
- **Experiência do Desenvolvedor**: Abordagem de estilização consistente em toda a aplicação
- **Manutenibilidade**: Mudanças no sistema de design podem ser feitas em um único lugar

### Manipulação de Formulários com React Hook Form

**Decisão**: Utilizar React Hook Form para gerenciamento de formulários.

**Justificativa**:

- **Desempenho**: Minimiza re-renderizações e otimiza o desempenho do formulário
- **Validação**: Integração perfeita com Zod para validação
- **Experiência do Desenvolvedor**: API simples reduz boilerplate
- **Flexibilidade**: Funciona bem com componentes controlados e não-controlados
- **Tratamento de Erros**: Tratamento e exibição sofisticados de erros

## Decisões de Infraestrutura

### PNPM como Gerenciador de Pacotes

**Decisão**: Utilizar PNPM em vez de NPM ou Yarn.

**Justificativa**:

- **Eficiência de Espaço em Disco**: Dependências compartilhadas reduzem o uso de disco
- **Velocidade**: Tempos de instalação mais rápidos
- **Modo Estrito**: Previne problemas de hoisting de dependências
- **Suporte a Monorepo**: Melhor suporte para configurações de monorepo (se necessário posteriormente)

### Husky + lint-staged para Git Hooks

**Decisão**: Utilizar Husky com lint-staged para hooks do git.

**Justificativa**:

- **Qualidade de Código**: Garante que todo código commitado atenda aos padrões de qualidade
- **Consistência**: Mantém estilo de código consistente e previne erros
- **Verificações Automatizadas**: Reduz trabalho de revisão manual
- **Experiência do Desenvolvedor**: Feedback imediato sobre problemas no código
