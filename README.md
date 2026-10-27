# Ofício Diário & Lecionário — Rede Episcopal Brasileira

Aplicativo litúrgico e devocional (PWA) que reproduz digitalmente o *Ofício Diário &
Lecionário* oficial da Rede Episcopal Brasileira: ofícios canônicos, ofício para
famílias e indivíduos, ofício semanal, coletas, cânticos, calendário litúrgico
perpétuo (2026–2075) e o Lecionário Comum Revisado Expandido completo, com
funcionamento 100% offline.

## Funcionalidades

- **Abertura na hora canônica correta** — Matutino (05–11h), Meio-Dia (11–15h),
  Vespertino (15–21h) e Completas (21–05h), com barra de troca manual.
- **Cálculo litúrgico perpétuo** — Páscoa (algoritmo gregoriano), Cinzas, Ramos,
  Ascensão, Pentecostes, Trindade, Cristo Rei e 1º Domingo do Advento; ciclos A/B/C,
  tempos litúrgicos, Próprios 1–29 e dias santos de letra vermelha.
- **Lecionário completo** — 198 blocos (66 por ciclo) extraídos do livro oficial,
  incluindo leituras diárias (segunda a sábado) nas séries semicontínua e
  complementar, mais as lições dos dias santos.
- **Textos bíblicos integrados** — salmos e passagens embutidos para uso offline,
  com busca online como complemento quando há conexão.
- **Temporizador de silêncio meditativo** com sino suave (Web Audio, sem arquivos).
- **Modo leitura imersiva** — quatro tamanhos de fonte e modo noturno.
- **PWA instalável e offline** — service worker que pré-armazena todo o app,
  inclusive o PDF integral do livro.

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · vite-plugin-pwa (Workbox) ·
Vitest. Os dados do lecionário são gerados estaticamente a partir do PDF oficial.

## Comandos

```bash
npm install            # instala dependências
npm run dev            # servidor de desenvolvimento (porta 3000)
npm run build          # type-check + build de produção (gera sw.js e manifesto)
npm run preview        # serve o build de produção
npm test               # testes do calendário, das horas e do lecionário
npm run verify:table   # valida as 50 linhas da tábua móvel contra o PDF
npm run build:lectionary   # regenera o lecionário a partir do PDF
```

## Arquitetura de dados

| Caminho | Responsabilidade |
| --- | --- |
| `src/services/liturgicalCalendar.ts` | Motor perpétuo do ano cristão e das horas canônicas |
| `src/data/lectionaryData.generated.ts` | Acervo do lecionário gerado do PDF (carregado sob demanda) |
| `src/data/lectionaryData.ts` | Fachada: resolve as leituras do dia a partir da chave litúrgica |
| `src/data/liturgyData.ts` | Ordens dos ofícios, cânticos, ofícios familiares e semanais |
| `src/data/collectsData.ts` | Coletas do Ano Cristão, dias santos e comemorações |
| `src/data/bibleTexts.ts` / `src/services/bibleService.ts` | Textos bíblicos locais e fallback offline |
| `scripts/` | Extração do PDF (`pdfjs-dist`), geração do lecionário e verificação da tábua |

O lecionário fica num chunk separado, baixado apenas quando as leituras são
exibidas; depois disso o service worker o mantém disponível offline.

## Procedência dos dados

Os textos litúrgicos e as referências do lecionário foram extraídos de
`public/assets/oficio-diario-lecionario-reb.pdf` (ISBN 978-65-02-40661-8,
© Rede Episcopal Brasileira). O lecionário diário deriva do *Revised Common
Lectionary Expanded Daily Readings*, © 2024 Consultation on Common Texts.
