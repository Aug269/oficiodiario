import { readFileSync } from 'node:fs';
import { getMovableDatesForYear, calculateProprioNumber } from '../src/services/liturgicalCalendar';

// Valida a tábua calculada contra a tábua impressa no livro (extraída do PDF, p. 173-174).
const raw = readFileSync('scripts/out/full-text.txt', 'utf8');
const tableSection = raw.split(/===== PÁGINA 173 =====/)[1].split(/===== PÁGINA 175 =====/)[0].replace(/\s+/g, ' ');
const rowRe = /(20\d{2})\s+([ABC])\s+(\d)\s+(\d{1,2})\s+(fev|mar)\s+(\d{1,2})\s+(mar|abr)\s+(\d{1,2})\s+(abr|mai|jun)\s+(\d{1,2})\s+(abr|mai|jun)\s+Próprio\s+(\d)\s+(\d{1,2})\s+(nov|dez)\s+\(([ABC])\)/gu;

const monthIdx: Record<string, number> = { fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, nov: 10, dez: 11 };
let failures = 0;
let rows = 0;
for (const m of tableSection.matchAll(rowRe)) {
  rows += 1;
  const [, yearStr, cycle, epiphSundays, ashDay, ashMon, easterDay, easterMon, ascDay, ascMon, pentDay, pentMon, proper, advDay, advMon, nextCycle] = m;
  const year = Number(yearStr);
  const mov = getMovableDatesForYear(year);
  const firstProperSunday = new Date(mov.trinitySunday);
  firstProperSunday.setDate(firstProperSunday.getDate() + 7);
  const computedProper = calculateProprioNumber(firstProperSunday);

  let epiphCount = 0;
  const cursor = new Date(year, 0, 7);
  while (cursor < mov.ashWednesday) {
    if (cursor.getDay() === 0) epiphCount += 1;
    cursor.setDate(cursor.getDate() + 1);
  }

  const expected = {
    cycle,
    epiph: Number(epiphSundays),
    ash: `${monthIdx[ashMon]}-${Number(ashDay)}`,
    easter: `${monthIdx[easterMon]}-${Number(easterDay)}`,
    asc: `${monthIdx[ascMon]}-${Number(ascDay)}`,
    pent: `${monthIdx[pentMon]}-${Number(pentDay)}`,
    proper: Number(proper),
    advent: `${monthIdx[advMon]}-${Number(advDay)}`,
    next: nextCycle,
  };
  const key = (d: Date) => `${d.getMonth()}-${d.getDate()}`;
  const actual = {
    cycle: mov.cycle,
    epiph: epiphCount,
    ash: key(mov.ashWednesday),
    easter: key(mov.easter),
    asc: key(mov.ascension),
    pent: key(mov.pentecost),
    proper: computedProper,
    advent: key(mov.firstSundayAdvent),
    next: mov.cycleAtAdvent,
  };
  const diffs = Object.entries(expected).filter(([k]) => (expected as Record<string, unknown>)[k] !== (actual as Record<string, unknown>)[k]);
  if (diffs.length) {
    failures += 1;
    console.log(`✗ ${year}:`, JSON.stringify(expected), '!=', JSON.stringify(actual));
  }
}
console.log(`linhas validadas: ${rows}, divergências: ${failures}`);
process.exit(failures ? 1 : 0);
