/**
 * Gera src/data/commemorationsData.generated.ts a partir do "Calendário dos
 * Dias Santos e Comemorações" do PDF oficial da REB (pp. 145–169).
 *
 * A extração linear do PDF perde a coluna (Anglicana/Ecumênica), então cada
 * entrada é classificada apenas como:
 *   - 'santo'       → data de Dia Santo de letra vermelha (motor litúrgico);
 *   - 'comemoracao' → comemoração opcional (o livro as declara opcionais).
 *
 * Uso: npm run build:commemorations
 */
import { readFileSync, writeFileSync } from 'node:fs';

const raw = readFileSync('scripts/out/full-text.txt', 'utf8');
const pages = raw.split(/\n===== PÁGINA (\d+) =====\n/).slice(1);
const pageMap = new Map();
for (let i = 0; i < pages.length; i += 2) {
  pageMap.set(Number(pages[i]), pages[i + 1].replace(/\s+/g, ' ').trim());
}

const MONTHS = [
  ['janeiro', 0, 31], ['fevereiro', 1, 29], ['março', 2, 31], ['abril', 3, 30],
  ['maio', 4, 31], ['junho', 5, 30], ['julho', 6, 31], ['agosto', 7, 31],
  ['setembro', 8, 30], ['outubro', 9, 31], ['novembro', 10, 30], ['dezembro', 11, 31],
];
const flex = (s) =>
  s.split('').map((ch) => (ch === ' ' ? '\\s+' : ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*')).join('');

// Datas de letra vermelha do motor, para classificar as entradas.
const calendarSrc = readFileSync('src/services/liturgicalCalendar.ts', 'utf8');
const rldBlock = calendarSrc.slice(calendarSrc.indexOf('const RED_LETTER_DAYS'), calendarSrc.indexOf('};', calendarSrc.indexOf('const RED_LETTER_DAYS')));
const redLetterKeys = new Set([...rldBlock.matchAll(/'(\d{1,2})-(\d{1,2})'/g)].map((m) => `${Number(m[1])}-${Number(m[2])}`));
if (redLetterKeys.size < 20) throw new Error(`Falha ao ler RED_LETTER_DAYS (${redLetterKeys.size} chaves)`);

const HEADER_FORMS = [
  flex('Calendário e Lecionário'),
  flex('Calendário dos Dias Santos e Comemorações'),
  flex('Dia Letra vermelha Dias Santos Comemoração Anglicana Comemoração Ecumênica'),
];

function stripHeaders(text, monthFlex) {
  let out = text;
  for (const hf of HEADER_FORMS) {
    // Número de página imediatamente antes ou depois do cabeçalho.
    out = out.replace(new RegExp(`\\d{3}\\s+${hf}`, 'gu'), ' ');
    out = out.replace(new RegExp(`${hf}\\s+\\d{3}`, 'gu'), ' ');
    out = out.replace(new RegExp(hf, 'gu'), ' ');
  }
  out = out.replace(new RegExp(monthFlex, 'gu'), ' ').replace(/\s+/g, ' ').trim();
  return out;
}

/** Separa eventos múltiplos no mesmo dia (a informação de coluna se perdeu). */
function splitEvents(text) {
  // Antífonas Ó de dezembro: cada uma começa por "O Sapientia/Adonai/...".
  const oNames = ['O Sapientia', 'O Adonai', 'O Radix Jesse', 'O Clavis David', 'O Oriens', 'O Rex Gentium', 'O Emmanuel', 'O Virgo Virginum'];
  let parts = [text];
  for (const name of oNames) {
    const next = [];
    for (const p of parts) {
      const idx = p.indexOf(name);
      if (idx > 0) next.push(p.slice(0, idx).trim(), p.slice(idx).trim());
      else next.push(p);
    }
    parts = next.filter(Boolean);
  }
  // Divisão após ano (ou século romano) quando um novo nome capitalizado segue.
  const out = [];
  for (const p of parts) {
    const pieces = p.split(/(?<=\d{3,4}(?:\s+e\s+\d{3,4})?|Séc\.\s+(?:[IVXLC]+|[\d]+)(?:\s+e\s+(?:[IVXLC]+|[\d]+))?)\s+(?=[A-ZÀ-Ü“"])/u);
    out.push(...pieces.map((x) => x.trim()).filter(Boolean));
  }
  return out;
}

function parseEvent(text) {
  let t = text.trim().replace(/\s+/g, ' ');
  const entry = {};
  // Século romanizado/arábico no fim.
  const era = t.match(/,\s*Séc\.\s+([^,]+?)\s*$/u);
  if (era) {
    entry.era = `Séc. ${era[1].trim()}`;
    t = t.slice(0, era.index).trim();
  }
  // Um ou dois anos de falecimento.
  const years = t.match(/,\s*(\d{3,4})(?:\s+e\s+(\d{3,4}))?\s*$/u);
  if (years) {
    entry.years = years[2] ? [Number(years[1]), Number(years[2])] : [Number(years[1])];
    t = t.slice(0, years.index).trim();
  }
  // Nome e papel/descrição separados pela primeira vírgula.
  const comma = t.indexOf(',');
  if (comma >= 0) {
    entry.name = t.slice(0, comma).trim();
    const role = t.slice(comma + 1).trim();
    if (role) entry.role = role;
  } else {
    entry.name = t;
  }
  return entry;
}

const all = [];
for (const [monthName, monthIndex, daysInMonth] of MONTHS) {
  const monthFlex = flex(monthName.charAt(0).toUpperCase() + monthName.slice(1));
  // Identifica as páginas do mês pela presença do nome flexível.
  const monthPages = [...pageMap.entries()]
    .filter(([n, t]) => n >= 145 && n <= 170 && new RegExp(monthFlex, 'u').test(t))
    .sort((a, b) => a[0] - b[0])
    .map(([, t]) => t);
  if (!monthPages.length) throw new Error(`Mês não encontrado: ${monthName}`);
  const stream = stripHeaders(monthPages.join(' '), monthFlex);

  // Máquina de estados: casa marcadores de dia 1..N em ordem crescente.
  const markers = [...stream.matchAll(/\b(\d{1,2})\b/gu)];
  const days = [];
  let expected = 1;
  for (const m of markers) {
    if (Number(m[1]) !== expected) continue;
    days.push({ day: expected, index: m.index, len: m[0].length });
    expected += 1;
    if (expected > daysInMonth) break;
  }
  // Fevereiro, no calendário impresso, só traz 28 dias; os demais, o mês cheio.
  if (days.length < 28 || days.length > daysInMonth) {
    throw new Error(`${monthName}: contagem de dias inesperada (${days.length})`);
  }
  days.forEach((d, i) => {
    const start = d.index + d.len;
    const end = i + 1 < days.length ? days[i + 1].index : stream.length;
    const region = stream.slice(start, end).trim();
    if (!region) return;
    const isRed = redLetterKeys.has(`${monthIndex}-${d.day}`);
    splitEvents(region).forEach((eventText, j) => {
      const parsed = parseEvent(eventText);
      all.push({
        month: monthIndex,
        day: d.day,
        kind: isRed && j === 0 ? 'santo' : 'comemoracao',
        ...parsed,
      });
    });
  });
}

// Validações básicas.
if (all.length < 200) throw new Error(`Poucas entradas: ${all.length}`);
const santoCount = all.filter((e) => e.kind === 'santo').length;
if (santoCount !== redLetterKeys.size) {
  throw new Error(`Dias santos no calendário: ${santoCount}, chaves do motor: ${redLetterKeys.size}`);
}

const header = `/* GERADO AUTOMATICAMENTE por scripts/build-commemorations.mjs a partir do
 * Ofício Diário & Lecionário oficial da REB (PDF, pp. 145–169).
 * Não editar manualmente; atualize o extrator e rode: npm run build:commemorations
 */
export interface GeneratedCommemoration {
  month: number;
  day: number;
  kind: 'santo' | 'comemoracao';
  name: string;
  role?: string;
  years?: number[];
  era?: string;
}

`;
writeFileSync(
  'src/data/commemorationsData.generated.ts',
  `${header}export const COMMEMORATIONS_GENERATED: GeneratedCommemoration[] = ${JSON.stringify(all, null, 1)} as const;\n`,
);
console.log('entradas:', all.length, '| dias santos:', santoCount, '| comemorações:', all.length - santoCount);
console.log('amostra jan/2:', JSON.stringify(all.find((e) => e.month === 0 && e.day === 2)));
console.log('amostra jul/17:', JSON.stringify(all.filter((e) => e.month === 6 && e.day === 17)));
console.log('amostra dez/21:', JSON.stringify(all.filter((e) => e.month === 11 && e.day === 21)));
