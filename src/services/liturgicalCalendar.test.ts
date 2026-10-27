import { describe, it, expect } from 'vitest';
import {
  calculateEaster,
  getMovableDatesForYear,
  getLiturgicalInfo,
  getCycleForDate,
  getCanonicalHourId,
} from './liturgicalCalendar';

describe('identificação da hora canônica', () => {
  const at = (h: number, m = 0) => new Date(2026, 9, 27, h, m);

  it('respeita as fronteiras 05h/11h/15h/21h', () => {
    expect(getCanonicalHourId(at(4, 59))).toBe('completas');
    expect(getCanonicalHourId(at(5, 0))).toBe('matutino');
    expect(getCanonicalHourId(at(10, 59))).toBe('matutino');
    expect(getCanonicalHourId(at(11, 0))).toBe('meio-dia');
    expect(getCanonicalHourId(at(14, 59))).toBe('meio-dia');
    expect(getCanonicalHourId(at(15, 0))).toBe('vespertino');
    expect(getCanonicalHourId(at(20, 59))).toBe('vespertino');
    expect(getCanonicalHourId(at(21, 0))).toBe('completas');
    expect(getCanonicalHourId(at(0, 0))).toBe('completas');
  });
});

describe('cálculo da Páscoa e datas móveis', () => {
  it('calcula a Páscoa sempre num domingo entre 22 de março e 25 de abril', () => {
    for (let year = 2026; year <= 2075; year++) {
      const easter = calculateEaster(year);
      expect(easter.getDay()).toBe(0);
      const ordinal = easter.getMonth() * 31 + easter.getDate();
      expect(ordinal).toBeGreaterThanOrEqual(2 * 31 + 22);
      expect(ordinal).toBeLessThanOrEqual(3 * 31 + 25);
    }
  });

  // Linhas de referência transcritas da Tábua de Datas Móveis do livro (pp. 173–174).
  const table: Record<number, { cycle: 'A' | 'B' | 'C'; ash: string; easter: string; asc: string; pent: string; advent: string; next: 'A' | 'B' | 'C' }> = {
    2026: { cycle: 'A', ash: '1-18', easter: '3-5', asc: '4-14', pent: '4-24', advent: '10-29', next: 'B' },
    2029: { cycle: 'A', ash: '1-14', easter: '3-1', asc: '4-10', pent: '4-20', advent: '11-2', next: 'B' },
    2038: { cycle: 'A', ash: '2-10', easter: '3-25', asc: '5-3', pent: '5-13', advent: '10-28', next: 'B' },
    2052: { cycle: 'C', ash: '2-6', easter: '3-21', asc: '4-30', pent: '5-9', advent: '11-1', next: 'A' },
    2071: { cycle: 'A', ash: '2-4', easter: '3-19', asc: '4-28', pent: '5-7', advent: '10-29', next: 'B' },
    2075: { cycle: 'B', ash: '1-20', easter: '3-7', asc: '4-16', pent: '4-26', advent: '11-1', next: 'C' },
  };

  it('reproduz exatamente as datas móveis da tábua oficial nos anos de referência', () => {
    for (const [yearStr, expected] of Object.entries(table)) {
      const year = Number(yearStr);
      const m = getMovableDatesForYear(year);
      const key = (d: Date) => `${d.getMonth()}-${d.getDate()}`;
      expect(m.cycle).toBe(expected.cycle);
      expect(key(m.ashWednesday)).toBe(expected.ash);
      expect(key(m.easter)).toBe(expected.easter);
      expect(key(m.ascension)).toBe(expected.asc);
      expect(key(m.pentecost)).toBe(expected.pent);
      expect(key(m.firstSundayAdvent)).toBe(expected.advent);
      expect(m.firstSundayAdvent.getDay()).toBe(0);
      expect(getCycleForDate(m.firstSundayAdvent)).toBe(expected.next);
    }
  });

  it('mantém as relações canônicas entre as festas móveis em todo o período 2026–2075', () => {
    for (let year = 2026; year <= 2075; year++) {
      const m = getMovableDatesForYear(year);
      const diff = (a: Date, b: Date) => Math.round((a.getTime() - b.getTime()) / 86_400_000);
      expect(diff(m.ashWednesday, m.easter)).toBe(-46);
      expect(m.ashWednesday.getDay()).toBe(3);
      expect(diff(m.ascension, m.easter)).toBe(39);
      expect(diff(m.pentecost, m.easter)).toBe(49);
      expect(diff(m.trinitySunday, m.pentecost)).toBe(7);
      expect(diff(m.christTheKing, m.firstSundayAdvent)).toBe(-7);
      const adventMonth = m.firstSundayAdvent.getMonth();
      const adventDay = m.firstSundayAdvent.getDate();
      expect(adventMonth === 10 ? adventDay >= 27 : adventMonth === 11 && adventDay <= 3).toBe(true);
    }
  });
});

describe('ciclo litúrgico A/B/C', () => {
  it('usa o ciclo do ano civil e troca no 1º Domingo do Advento', () => {
    expect(getCycleForDate(new Date(2026, 0, 1))).toBe('A');
    expect(getCycleForDate(new Date(2026, 10, 28))).toBe('A');
    expect(getCycleForDate(new Date(2026, 10, 29))).toBe('B'); // 1º Advento 2026
    expect(getCycleForDate(new Date(2027, 0, 1))).toBe('B');
    expect(getCycleForDate(new Date(2028, 11, 2))).toBe('C'); // véspera do Advento 2028
    expect(getCycleForDate(new Date(2028, 11, 3))).toBe('A'); // 1º Advento 2028
  });
});

describe('informação litúrgica do dia', () => {
  it('identifica as grandes festas de 2026', () => {
    expect(getLiturgicalInfo(new Date(2026, 1, 18)).title).toContain('Cinzas');
    expect(getLiturgicalInfo(new Date(2026, 1, 18)).season).toBe('Quaresma');
    expect(getLiturgicalInfo(new Date(2026, 2, 29)).title).toContain('Domingo de Ramos');
    expect(getLiturgicalInfo(new Date(2026, 3, 5)).title).toContain('Páscoa');
    expect(getLiturgicalInfo(new Date(2026, 3, 5)).color).toBe('white');
    expect(getLiturgicalInfo(new Date(2026, 4, 14)).title).toContain('Ascensão');
    expect(getLiturgicalInfo(new Date(2026, 4, 24)).title).toContain('Pentecostes');
    expect(getLiturgicalInfo(new Date(2026, 4, 24)).color).toBe('red');
    expect(getLiturgicalInfo(new Date(2026, 4, 31)).title).toContain('Trindade');
    expect(getLiturgicalInfo(new Date(2026, 11, 25)).title).toContain('Natividade');
  });

  it('calcula o Próprio do Tempo Comum pelas janelas canônicas', () => {
    // 2026: após a Trindade (31 mai) começa-se pelo Próprio 5 (tábua do livro).
    expect(getLiturgicalInfo(new Date(2026, 5, 7)).proprioNumber).toBe(5);
    expect(getLiturgicalInfo(new Date(2026, 5, 10)).proprioNumber).toBe(5); // quarta da mesma semana
    expect(getLiturgicalInfo(new Date(2026, 10, 22)).title).toContain('Cristo Rei');
    expect(getLiturgicalInfo(new Date(2026, 10, 22)).proprioNumber).toBe(29);
    expect(getLiturgicalInfo(new Date(2026, 9, 25)).proprioNumber).toBe(25);
  });

  it('reconhece dias santos de letra vermelha e suas cores', () => {
    const allSaints = getLiturgicalInfo(new Date(2026, 10, 1));
    expect(allSaints.isRedLetterDay).toBe(true);
    expect(allSaints.holyDay).toContain('Todos os Santos');
    expect(allSaints.color).toBe('white');

    const peterPaul = getLiturgicalInfo(new Date(2026, 5, 29));
    expect(peterPaul.holyDay).toContain('Pedro e Paulo');
    expect(peterPaul.color).toBe('red');
  });

  it('emite chave de lecionário compatível com o ciclo e o tempo', () => {
    expect(getLiturgicalInfo(new Date(2026, 9, 27)).lectionaryKey).toBe('a-tc-25');
    expect(getLiturgicalInfo(new Date(2026, 11, 25)).lectionaryKey).toBe('b-nat-dia');
    expect(getLiturgicalInfo(new Date(2026, 1, 18)).lectionaryKey).toBe('a-quar-cinzas');
    expect(getLiturgicalInfo(new Date(2026, 0, 6)).lectionaryKey).toBe('a-epif-dia');
    expect(getLiturgicalInfo(new Date(2026, 10, 25)).lectionaryKey).toBe('a-tc-29');
  });

  it('cobre todos os dias de 2026–2075 sem falhar e com chave de lecionário', () => {
    const cursor = new Date(2026, 0, 1);
    const end = new Date(2075, 11, 31);
    let count = 0;
    while (cursor <= end) {
      const info = getLiturgicalInfo(cursor);
      expect(info.lectionaryKey).toMatch(/^[abc]-(adv|nat|epif|quar|sem|pasc|tc)-/);
      expect(info.title.length).toBeGreaterThan(0);
      cursor.setDate(cursor.getDate() + 1);
      count++;
    }
    expect(count).toBeGreaterThan(18_000);
  });
});
