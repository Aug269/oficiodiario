/**
 * Fachada do Lecionário Comum Revisado Expandido (tradução REB).
 *
 * Os dados são gerados a partir do PDF oficial por
 * scripts/build-lectionary.mjs (ver lectionaryData.generated.ts) e cobrem,
 * nos três anos A/B/C: Advento, Natal, Epifania, Quaresma, Semana Santa,
 * Páscoa, Ascensão, Pentecostes, Trindade e Próprios 3 a 29, além das
 * leituras diárias expandidas (segunda a sábado) e dos Dias Santos.
 *
 * O acervo completo é carregado sob demanda (dynamic import), preservando
 * um bundle inicial enxuto e mantendo o funcionamento 100% offline depois
 * da primeira visita (o service worker pré-armazena todos os chunks).
 */
import type { LiturgicalDayInfo } from '../services/liturgicalCalendar';

export type Series = 's' | 'c';

export interface GeneratedReading {
  ref: string;
  title: string;
  series?: Series;
  alternative?: boolean;
}

export interface GeneratedEntry {
  key: string;
  name: string;
  sunday: GeneratedReading[];
  daily?: Partial<Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat', GeneratedReading[]>>;
  psalms?: { pre?: GeneratedReading[]; post?: GeneratedReading[] };
}

export interface LectionaryReading {
  type: string;
  ref: string;
  title: string;
  series?: Series;
}

export interface LectionaryDay {
  dayType: string;
  title: string;
  key: string;
  readings: LectionaryReading[];
}

type GeneratedModule = {
  lectionary: Record<string, GeneratedEntry>;
  holyDays: Record<string, GeneratedReading[]>;
};

let modulePromise: Promise<GeneratedModule> | null = null;
function loadGenerated(): Promise<GeneratedModule> {
  if (!modulePromise) {
    modulePromise = import('./lectionaryData.generated').then((m) => ({
      lectionary: m.LECTIONARY_GENERATED.lectionary as unknown as Record<string, GeneratedEntry>,
      holyDays: m.LECTIONARY_GENERATED.holyDays as unknown as Record<string, GeneratedReading[]>,
    }));
  }
  return modulePromise;
}

const PSALM_BOOKS = new Set(['Salmo', 'Salmos']);
const GOSPEL_BOOKS = new Set(['Mateus', 'Marcos', 'Lucas', 'João']);
const EPISTLE_BOOKS = new Set([
  'Atos', 'Romanos', '1 Coríntios', '2 Coríntios', 'Gálatas', 'Efésios', 'Filipenses',
  'Colossenses', '1 Tessalonicenses', '2 Tessalonicenses', '1 Timóteo', '2 Timóteo',
  'Tito', 'Filemom', 'Hebreus', 'Tiago', '1 Pedro', '2 Pedro', '1 João', '2 João',
  '3 João', 'Judas', 'Apocalipse',
]);

function bookOf(ref: string): string {
  return ref.replace(/^\d?\s*/, '').split(/\s+\d/)[0].trim();
}

function labelFor(ref: string, index: number): string {
  const book = bookOf(ref);
  if (PSALM_BOOKS.has(book)) return 'Salmo';
  if (GOSPEL_BOOKS.has(book)) return 'Santo Evangelho';
  if (EPISTLE_BOOKS.has(book)) return 'Segunda Leitura';
  return index === 0 ? 'Primeira Leitura' : 'Leitura';
}

/** Escolhe a série complementar (c) quando há duplicatas semicontínuas. */
function preferComplementary(readings: GeneratedReading[]): GeneratedReading[] {
  const primary = readings.filter((r) => !r.alternative);
  const withSeries = primary.filter((r) => r.series);
  if (!withSeries.length) return primary;

  const plain = primary.filter((r) => !r.series);
  const cOt = withSeries.find((r) => r.series === 'c' && !PSALM_BOOKS.has(bookOf(r.ref)));
  const cPs = withSeries.find((r) => r.series === 'c' && PSALM_BOOKS.has(bookOf(r.ref)));
  const sOt = withSeries.find((r) => r.series === 's' && !PSALM_BOOKS.has(bookOf(r.ref)));
  const sPs = withSeries.find((r) => r.series === 's' && PSALM_BOOKS.has(bookOf(r.ref)));

  const head: GeneratedReading[] = [];
  const ot = cOt ?? sOt;
  const ps = cPs ?? sPs;
  if (ot) head.push(ot);
  if (ps) head.push(ps);
  return [...head, ...plain];
}

function toView(readings: GeneratedReading[]): LectionaryReading[] {
  return readings.map((r, i) => ({
    type: labelFor(r.ref, i),
    ref: r.ref,
    title: r.title,
    ...(r.series ? { series: r.series } : {}),
  }));
}

const WEEKDAY_SLOT = {
  1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat',
} as const;
const WEEKDAY_NAMES = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
  'Quinta-feira', 'Sexta-feira', 'Sábado',
];

function resolveEntry(
  lectionary: Record<string, GeneratedEntry>,
  key: string,
): GeneratedEntry | undefined {
  if (lectionary[key]) return lectionary[key];
  // Os Próprios 1 e 2 não existem no livro: o Tempo Comum inicial recorre
  // aos Próprios 3 (ou aos domingos depois da Epifania).
  if (/(^|-)tc-[12]$/.test(key)) return lectionary[key.replace(/tc-[12]$/, 'tc-3')];
  // A semana da Páscoa (pasc-1) usa o bloco do Domingo da Ressurreição,
  // que traz as leituras diárias de toda a oitava pascal.
  if (/(^|-)pasc-1$/.test(key)) return lectionary[key.replace(/pasc-1$/, 'pasc-dia')];
  return undefined;
}

/** Leituras do dia a partir das informações do cálculo litúrgico. */
export async function getLectionaryForDay(info: LiturgicalDayInfo): Promise<LectionaryDay> {
  const { lectionary, holyDays } = await loadGenerated();
  const dayOfWeek = info.date.getDay();

  // 1. Dias santos fixos com lições próprias no livro.
  const holyKey = `${info.date.getMonth()}-${info.date.getDate()}`;
  if (info.isRedLetterDay && holyDays[holyKey]) {
    return {
      dayType: info.holyDay ?? 'Dia Santo',
      title: info.title,
      key: `santo-${holyKey}`,
      readings: toView(preferComplementary(holyDays[holyKey])),
    };
  }

  const entry = resolveEntry(lectionary, info.lectionaryKey);
  if (!entry) {
    return { dayType: info.season, title: info.title, key: info.lectionaryKey, readings: [] };
  }

  // 2. Domingo e festas: leituras dominicais.
  if (dayOfWeek === 0 || !entry.daily) {
    return {
      dayType: dayOfWeek === 0 ? 'Leituras do Domingo' : WEEKDAY_NAMES[dayOfWeek],
      title: entry.name,
      key: entry.key,
      readings: toView(preferComplementary(entry.sunday)),
    };
  }

  // 3. Dia útil: leituras diárias expandidas + salmo do dia.
  const slot = WEEKDAY_SLOT[dayOfWeek as 1 | 2 | 3 | 4 | 5 | 6];
  const dayReadings = entry.daily[slot];
  if (!dayReadings || !dayReadings.length) {
    return {
      dayType: WEEKDAY_NAMES[dayOfWeek],
      title: entry.name,
      key: entry.key,
      readings: toView(preferComplementary(entry.sunday)),
    };
  }

  const isPreparation = dayOfWeek >= 4;
  const psalmPool = isPreparation ? entry.psalms?.pre : entry.psalms?.post;
  const chosen: GeneratedReading[] = [];
  if (psalmPool?.length) chosen.push(preferComplementary(psalmPool)[0]);
  chosen.push(...preferComplementary(dayReadings));

  return {
    dayType: `${WEEKDAY_NAMES[dayOfWeek]} · ${isPreparation ? 'Preparação para o Domingo' : 'Reflexão sobre o Domingo'}`,
    title: entry.name,
    key: entry.key,
    readings: toView(chosen),
  };
}

/** Catálogo completo de chaves, útil para testes e ferramentas. */
export async function getLectionaryKeys(): Promise<string[]> {
  const { lectionary } = await loadGenerated();
  return Object.keys(lectionary).sort();
}
