# Arquitetura

O projeto segue **Clean Architecture**: o código é dividido em camadas e as dependências
sempre apontam **para dentro**, em direção às regras de negócio. Frameworks (Next.js, React)
e fontes de dados (JSON, CMS, banco) são detalhes que podem ser trocados sem tocar no núcleo.

```
        ┌──────────────────────────────────────────────┐
        │  app/  (rotas Next.js)    main/ (composição) │
        │   ┌──────────────────────────────────────┐   │
        │   │ presentation/    infrastructure/     │   │
        │   │   ┌──────────────────────────────┐   │   │
        │   │   │ application/  (casos de uso) │   │   │
        │   │   │   ┌──────────────────────┐   │   │   │
        │   │   │   │ domain/ (entidades)  │   │   │   │
        │   │   │   └──────────────────────┘   │   │   │
        │   │   └──────────────────────────────┘   │   │
        │   └──────────────────────────────────────┘   │
        └──────────────────────────────────────────────┘
```

## Camadas

| Pasta                 | Responsabilidade                                                                                    | Pode depender de                  |
| --------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------- |
| `src/domain/`         | Entidades, value objects e **interfaces** de repositório (portas). TypeScript puro.                 | nada                              |
| `src/application/`    | Casos de uso que orquestram o domínio. Recebem repositórios por injeção de dependência.             | `domain`                          |
| `src/infrastructure/` | Implementações concretas das portas (ex.: repositório que lê JSON local, futuramente um CMS/banco). | `domain`, `application`           |
| `src/presentation/`   | Componentes React e view models. Não sabe de onde os dados vêm.                                     | `domain`, `application`, `shared` |
| `src/main/`           | **Composition root**: instancia as implementações e injeta nos casos de uso.                        | todas                             |
| `src/app/`            | Rotas do Next.js. Chama os casos de uso via `main/` e renderiza a `presentation/`.                  | todas                             |
| `src/shared/`         | Utilitários genéricos sem regra de negócio.                                                         | nada                              |

As regras da coluna "Pode depender de" são **verificadas automaticamente** pelo ESLint
(`no-restricted-imports` em `eslint.config.mjs`); um import que viole a regra quebra o lint e o CI.

## Por que isso importa aqui

A primeira versão do portfólio é **100% estática**: os dados ficam em arquivos versionados e
a Vercel gera páginas pré-renderizadas. Como as páginas dependem só de interfaces, migrar para
um CMS ou banco de dados no futuro significa criar uma nova implementação em
`infrastructure/` e trocar a ligação em `main/`, sem alterar domínio, casos de uso ou UI.
