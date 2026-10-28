# Ofício Diário & Lecionário — Rede Episcopal Brasileira

Um aplicativo litúrgico e devocional progressivo (PWA) de alto padrão que transforma integralmente o livro oficial da Rede Episcopal Brasileira em uma experiência interativa, acessível e contemplativa no navegador, com identificação inteligente da hora canônica do dia, cálculo litúrgico perpétuo (2026–2075), textos completos dos ofícios e lecionário bíblico diário.

## Decisões Confirmadas na Consulta

> [!IMPORTANT]
> **Decisões aprovadas pelo usuário para o projeto:**
> - **Entrada Inicial**: O app abre automaticamente no Ofício canônico correspondente à hora atual (Oração da Manhã: 05h–11h, Meio-Dia: 11h–15h, Vespertino/Oração da Tarde: 15h–21h, Completas: 21h–05h), com barra de acesso rápido para os demais ofícios.
> - **Identidade Visual**: Estilo "Livro Litúrgico clássico" inspirado no Livro de Oração Comum anglicano: paleta bordô/vinho episcopal (`#541c44` / `#4a153b`), fundo em papel marfim aquecido (`#FAF7F2`), texto em serif clássico legível, partes da assembleia em negrito e rubricas litúrgicas em vermelho vivo (`#b91c1c`).
> - **Leituras Bíblicas**: Busca e exibição integrada dos textos completos das passagens bíblicas prescritas pelo Lecionário Comum Revisado Expandido para cada dia, evitando que o fiel precise sair do ofício para consultar outra Bíblia.
> - **Recursos Essenciais**:
>   1. Calculador Litúrgico Automático (conforme tábua 2026–2075 da REB, identificando Ano A, B ou C, tempo litúrgico e Próprio do dia).
>   2. Modo Leitura Imersiva com ajuste fino do tamanho da fonte e contraste (dia/noite).
>   3. Temporizador de Silêncio Meditativo integrado para os momentos indicados nas rubricas ("Guarda-se silêncio por alguns instantes").
>   4. Suporte PWA com funcionamento 100% offline para celulares, tablets e computadores.

---

## 1. Visão Geral e Experiência do Usuário

O aplicativo reproduz com fidelidade teológica e excelência gráfica os quatro grandes blocos do livro da Rede Episcopal Brasileira:

1. **Ofício Tradicional**:
   - Ofício Matutino (Oração da Manhã)
   - Ofício do Meio-Dia
   - Ofício Vespertino (Oração da Tarde)
   - Completas (Oração ao Fim do Dia)
   - Cânticos Suplementares (Te Deum, Benedictus Dominus Deus, Magna et mirabilia, Surge illuminare, Kyrie Pantokrator, Quaerite Dominum, Cantemus Domino, Dignus es, Cantate Domino, Ecce Deus, Deus misereatur, Benedicite omnia opera Domini)

2. **Ofício para Famílias e Indivíduos**:
   - Pela Manhã, Ao Meio-Dia, Ao Entardecer, Ao Anoitecer (antes/depois do jantar), No Fim do Dia
   - Credo Apostólico, Orações Adicionais e Orações às Refeições

3. **Ofício para a Semana**:
   - Breves orações e sentenças temáticas de Domingo a Sábado (A Ressurreição, A Criação e o Espírito, A Encarnação, O Arrependimento, A Ceia do Senhor, A Cruz, O Túmulo e o Descanso)

4. **Coletas e Calendário Litúrgico**:
   - Todas as Coletas do Ano Cristão (Advento ao Reino de Cristo)
   - Coletas dos Dias Santos e Festas Principais
   - Coletas Comuns e Comemorações Especiais (Reforma, IEAB, Pátria, etc.)
   - Lecionário Comum Revisado Expandido completo para os Anos A, B e C.

---

## 2. Design Visual & Tipografia Litúrgica

```
┌────────────────────────────────────────────────────────────────────────┐
│  REDE EPISCOPAL BRASILEIRA · OFÍCIO DIÁRIO & LECIONÁRIO   [A- A+] [🌙] │
├────────────────────────────────────────────────────────────────────────┤
│  Terça-feira, 27 de Outubro · Tempo Comum (Próprio 25) · Ano B         │
│  [ Matutino ]   [ Meio-Dia ]   [ Vespertino ★ ]   [ Completas ]        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                       OFÍCIO VESPERTINO                                │
│                        Oração da Tarde                                 │
│                                                                        │
│   Quem oficia pode iniciar a Oração da Tarde lendo uma sentença...     │ <- Rubrica vermelha
│                                                                        │
│   A luz e a paz de Jesus Cristo estejam convosco.                      │
│   E também contigo.                                                    │ <- Assembleia em negrito
│                                                                        │
│   [⏱ Iniciar 1 min de Silêncio]                                       │
│                                                                        │
│   ─── Leituras do Dia (Lecionário: Salmo 30, Rute 3:1-7, Lucas 10) ─── │
│   [Texto bíblico integrado completo com tradução em português]         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

- **Cores & Tokens**:
  - Cor Primária / Capa: Bordô Episcopal (`#4c1d47` / `#581c4a`)
  - Rubricas Litúrgicas: Vermelho Cardinal (`#b91c1c` / `#dc2626`)
  - Fundo Canvas Claro: Papel Litúrgico Linho / Marfim suave (`#FAF8F5`)
  - Fundo Canvas Escuro (Modo Noturno / Completas): Grafite profundo suave (`#181518`), com texto dourado/creme legível e rubricas coral suaves
  - Destaques dourados (`#b45309` / `#d97706`) para elementos sagrados e seletores de tempo litúrgico.
- **Tipografia**:
  - Fontes clássicas com serifa para textos litúrgicos, salmos e leituras.
  - Hierarquia rigorosa: títulos em versalete/caixa alta espaçada, rubricas em itálico vermelho suave, respostas do povo com peso 700 (negrito).

---

## 3. Arquitetura Técnica & Modelo de Dados

```
┌──────────────────────────────────────────────────────────────────┐
│                           App.tsx                                │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │ LiturgicalHeader (Data, Tempo Litúrgico, Coleta, Ações) │   │
│   └──────────────────────────────────────────────────────────┘   │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │ QuickHourBar (Matutino | Meio-Dia | Vespertino | Compl.) │   │
│   └──────────────────────────────────────────────────────────┘   │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │ ModeSwitch (Ofício Tradicional | Famílias | Semanal)     │   │
│   └──────────────────────────────────────────────────────────┘   │
│   ┌───────────────────────────────┬──────────────────────────┐   │
│   │ OfficeViewer (Texto Litúrgico)│ LiturgicalCalendarViewer │   │
│   │ - Rubricas vermelhas          │ - Busca por data         │   │
│   │ - Assembleia em negrito       │ - Anos A, B, C           │   │
│   │ - Textos bíblicos integrados  │ - Dias Santos & Festas   │   │
│   │ - SilenceTimer (Temporizador) │ - Tábua Móvel 2026-2075  │   │
│   └───────────────────────────────┴──────────────────────────┘   │
│   ┌──────────────────────────────────────────────────────────┐   │
│   │ PWAInstallButton & OfflineCacheService (Cache Local)     │   │
│   └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Principais Módulos:
1. `src/data/liturgyData.ts`:
   - Armazena todas as ordens dos Ofícios (Matinas, Meio-Dia, Vésperas, Completas), todos os Cânticos Suplementares, Ofício para Famílias (Manhã, Meio-Dia, Entardecer, Anoitecer, Fim do Dia) e Ofício para a Semana (Domingo a Sábado), além de orações adicionais, credos e orações às refeições.
2. `src/data/collectsData.ts`:
   - Todas as Coletas do Ano Cristão (Advento, Natal, Epifania, Quaresma, Semana Santa, Tempo Pascal, Próprios 1 a 29 do Tempo Comum), Dias Santos e Comemorações da REB.
3. `src/data/lectionaryData.ts`:
   - Estrutura de dados das leituras do Lecionário Comum Revisado Expandido (Anos A, B, C, com séries semicontínua e complementar), datas fixas e dias santos.
4. `src/services/liturgicalCalendar.ts`:
   - Motor de cálculo que dada uma data qualquer calcula:
     - Páscoa e datas móveis (Cinzas, Ascensão, Pentecostes, Trindade, Cristo Rei, 1º Domingo do Advento) conforme a Tábua do livro.
     - Determina o Ano Litúrgico (A, B ou C).
     - Identifica o Próprio do Tempo Comum vigente ou festa celebrada.
5. `src/services/bibleService.ts`:
   - Fornece os textos das leituras em português com banco de textos locais para todos os Salmos e principais leituras do ofício, além de integração com API bíblica para busca dinâmica e fallback offline embutido.
6. `src/components/SilenceTimer.tsx`:
   - Temporizador suave e reverente com sons opcionais suaves de sino ou vibração para momentos de meditação silenciosa.
7. `src/components/PWAInstallButton.tsx`:
   - Permite instalar como app nativo no celular ou computador, com suporte offline completo.

---

## 4. Plano de Execução

1. **Instalação e Infraestrutura PWA**:
   - Instalar `vite-plugin-pwa` e ícones litúrgicos SVG/PNG.
   - Configurar `vite.config.ts`, `metadata.json` e `index.html`.
2. **Base de Dados Litúrgica Integral**:
   - Extrair e estruturar todos os textos dos Ofícios, rubricas, orações, cânticos e coletas presentes no documento oficial da REB.
   - Implementar cálculo da data litúrgica conforme as páginas 137–174 do documento.
3. **Componentes e Experiência do Usuário**:
   - Criar interface com estética editorial sacra (papel marfim, bordô, rubricas vermelhas).
   - Modo de seleção de ofício automático e manual.
   - Leitor com texto das leituras do lecionário integradas.
   - Temporizador de silêncio para os momentos penitenciais e de intercessão.
   - Controles de acessibilidade (tamanho da fonte, modo noturno).
4. **Verificação & Teste**:
   - Compilação via `compile_applet` e testes das transições de horários e datas litúrgicas.
