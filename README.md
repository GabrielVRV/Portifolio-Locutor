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
content/             # dados do portfólio (perfil e gravações) em JSON
public/audio/        # arquivos de áudio das gravações
src/
├── domain/          # entidades e interfaces (portas)
├── application/     # casos de uso
├── infrastructure/  # implementações das portas (fontes de dados)
├── presentation/    # componentes React
├── main/            # composition root (injeção de dependência)
├── shared/          # utilitários genéricos
└── app/             # rotas do Next.js
```

## Atualizando o conteúdo

Todo o conteúdo fica em `content/` e é validado pelos testes: um campo errado quebra o CI
antes de chegar ao site publicado.

**Adicionar uma gravação:**

1. Coloque o áudio (de preferência `.mp3`) em `public/audio/`.
2. Gere a duração e a forma de onda (requer [ffmpeg](https://ffmpeg.org/) instalado):

   ```bash
   pnpm audio:waveform public/audio/spot-supermercado-bom-preco.mp3
   ```

3. Adicione um item em `content/demo-reels.json`, colando `durationInSeconds` e `waveform`
   da saída do comando:

   ```json
   {
     "id": "spot-supermercado-bom-preco",
     "title": "Spot Supermercado Bom Preço",
     "description": "Oferta de fim de semana",
     "category": "spot-comercial",
     "audioSrc": "/audio/spot-supermercado-bom-preco.mp3",
     "durationInSeconds": 30.4,
     "waveform": [0.12, 0.58, 0.91],
     "chapters": [
       { "title": "Abertura", "category": "spot-comercial", "startInSeconds": 0 },
       { "title": "Ofertas", "category": "spot-comercial", "startInSeconds": 8.5 }
     ],
     "recordedAt": "2026-10-01",
     "featured": false
   }
   ```

   Categorias aceitas: `apresentacao`, `noticia`, `carro-de-som`, `spot-comercial`,
   `vinheta`, `chamada`, `institucional` e `eventos`. São opcionais: `description`,
   `waveform`, `chapters` (marcam estilos dentro de um mesmo áudio, em ordem de início),
   `recordedAt` e `featured` (aparece primeiro).

4. Rode `pnpm test` e faça o commit (`feat(content): add supermarket spot`).

**Título e descrição no Google:** edite `seo` em `content/announcer.json`. O ideal é até 60
caracteres no título e 155 na descrição.

## Endereço do site

O endereço público alimenta o canonical, o sitemap, o `robots.txt` e a prévia de links. Na
Vercel ele é detectado sozinho. Em outro host, ou para forçar um domínio próprio, defina
`NEXT_PUBLIC_SITE_URL` (ex.: `https://carlosartur.com.br`) e gere um novo build.

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
