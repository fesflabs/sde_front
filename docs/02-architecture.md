# Visão Geral da Arquitetura

Este boilerplate segue um padrão de **arquitetura baseada em funcionalidades**, que organiza o código em torno de domínios de negócio, em vez de preocupações técnicas. Esta abordagem oferece vários benefícios:

- **Colocalização de código relacionado**: Todo código relacionado a uma funcionalidade específica é agrupado
- **Limites claros**: As funcionalidades são unidades independentes com interfaces bem definidas
- **Compreensão facilitada**: Novos desenvolvedores podem entender o código explorando os diretórios de funcionalidades
- **Escalabilidade**: O código pode crescer sem aumentar a complexidade para funcionalidades individuais
- **Manutenibilidade**: Mudanças em uma funcionalidade têm impacto mínimo sobre as outras

## Conceitos Arquiteturais Principais

### Organização Hierárquica: Módulos e Funcionalidades

Nossa arquitetura segue uma estrutura hierárquica de três níveis:

1. **Módulos**: Representam setores organizacionais da FESF
2. **Funcionalidades**: Capacidades de negócio dentro de cada módulo
3. **Componentes Técnicos**: Elementos específicos de cada funcionalidade

Diferentemente das arquiteturas tradicionais organizadas apenas por funcionalidades, nossa abordagem agrupa funcionalidades dentro de módulos que refletem a estrutura organizacional da empresa.

### Fluxo de Dependência

O fluxo de dependência segue uma direção específica:

- Módulos não devem depender de outros módulos
- Funcionalidades podem depender de código compartilhado
- Código compartilhado não deve depender de módulos ou funcionalidades
- Funcionalidades dentro de um módulo podem interagir, mas com acoplamento mínimo

## Estrutura de Diretórios

```
/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Grupo de rotas de autenticação
│   │   ├── (protected)/            # Rotas protegidas
│   │   └── ...
│   ├── modules/                    # Organização baseada em módulos
│   │   ├── rh/                     # Módulo de Recursos Humanos
│   │   │   ├── features/           # Funcionalidades do módulo RH
│   │   │   │   ├── employees/      # Funcionalidade de gerenciamento de funcionários
│   │   │   │   └── recruitment/    # Funcionalidade de recrutamento
│   │   ├── financial/              # Módulo Financeiro
│   │   │   ├── features/           # Funcionalidades do módulo Financeiro
│   │   │   │   ├── invoicing/      # Funcionalidade de faturamento
│   │   │   │   └── payments/       # Funcionalidade de pagamentos
│   │   └── ...                     # Outros módulos da organização
│   ├── shared/                     # Código compartilhado
│   │   ├── components/             # Componentes comuns
│   │   ├── config/                 # Configuração global
│   │   ├── hooks/                  # Hooks comuns
│   │   ├── lib/                    # Bibliotecas principais
│   │   └── ...
```

### Quando Criar um Módulo

Crie um novo módulo quando:

- Ele representa um setor ou departamento distinto na estrutura organizacional
- Possui um conjunto próprio de funcionalidades relacionadas
- Requer controle de acesso específico no nível do módulo

### Quando Criar uma Funcionalidade

Crie uma nova funcionalidade dentro de um módulo quando:

- Ela representa uma capacidade de negócio distinta dentro do módulo
- Possui seu próprio conjunto de componentes, hooks e estado

### Quando Usar Código Compartilhado

Mova código para `shared/` quando:

- É utilizado por múltiplas funcionalidades
- É uma funcionalidade central da aplicação
- Não pertence a nenhum domínio de negócio específico

## Comunicação Entre Funcionalidades

As funcionalidades não devem importar diretamente umas das outras. Em vez disso, devem se comunicar através de:

1. **Estado global**: Usando stores do Zustand
2. **Eventos globais**: Usando sistemas de eventos personalizados ou hooks
3. **Parâmetros de URL/Rota**: Usando o roteador do Next.js

Esta abordagem garante que as funcionalidades permaneçam desacopladas e possam ser desenvolvidas, testadas e mantidas independentemente.
