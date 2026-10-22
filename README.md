# Portfólio de Locutor

Portfólio profissional para locutor e radialista, com amostras de voz (spots, vinhetas,
carro de som, institucionais), informações de carreira e canais de contato para orçamento.

> 🚧 Em desenvolvimento. O projeto está sendo construído por etapas, com histórico de commits
> seguindo [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

## Stack

- **[Next.js 16](https://nextjs.org/)** (App Router) com **React 19** e **TypeScript** em modo estrito
- **[Tailwind CSS 4](https://tailwindcss.com/)** para estilização
- **[Vitest](https://vitest.dev/)** + **Testing Library** para testes
- **ESLint** + **Prettier** para qualidade e padronização de código
- **Husky**, **lint-staged** e **commitlint** para validar cada commit
- **GitHub Actions** para CI e **[Vercel](https://vercel.com/)** para hospedagem

## Arquitetura

Clean Architecture com regras de dependência entre camadas verificadas pelo ESLint.
Detalhes em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

```
src/
├── domain/          # entidades e interfaces (portas)
├── application/     # casos de uso
├── infrastructure/  # implementações das portas (fontes de dados)
├── presentation/    # componentes React
├── main/            # composition root (injeção de dependência)
├── shared/          # utilitários genéricos
└── app/             # rotas do Next.js
```

## Como rodar

Pré-requisitos: Node.js 24+ e pnpm 10+.

```bash
pnpm install
pnpm dev
```

Acesse http://localhost:3000.

## Scripts

| Comando              | Descrição                                    |
| -------------------- | -------------------------------------------- |
| `pnpm dev`           | Servidor de desenvolvimento                  |
| `pnpm build`         | Build de produção                            |
| `pnpm lint`          | Verifica o código com ESLint                 |
| `pnpm format`        | Formata o código com Prettier                |
| `pnpm typecheck`     | Checagem de tipos do TypeScript              |
| `pnpm test`          | Executa os testes                            |
| `pnpm test:coverage` | Executa os testes com relatório de cobertura |

## Padrão de commits

Os commits seguem Conventional Commits e são validados automaticamente pelo commitlint:

```
<tipo>(escopo opcional): descrição no imperativo

feat: add demo reel audio player
fix(contact): correct WhatsApp link format
```

Tipos mais usados: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `build`, `ci`.

## Licença

Código disponível para fins de estudo e portfólio. O conteúdo (áudios, fotos e textos do
locutor) é de uso exclusivo do autor e não está coberto por licença aberta.
