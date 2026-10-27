import { describe, it, expect } from 'vitest';
import { getLiturgicalInfo } from '../services/liturgicalCalendar';
import { getLectionaryForDay, getLectionaryKeys } from './lectionaryData';

describe('fachada do lecionário', () => {
  it('expõe as 198 entradas dos três anos (66 por ciclo)', async () => {
    const keys = await getLectionaryKeys();
    expect(keys).toHaveLength(198);
    for (const cycle of ['a', 'b', 'c']) {
      expect(keys.filter((k) => k.startsWith(`${cycle}-`))).toHaveLength(66);
    }
  });

  it('fornece as leituras dominicais do Próprio 25 no Ano B', async () => {
    const info = getLiturgicalInfo(new Date(2027, 9, 24)); // domingo, Ano B, Próprio 25
    expect(info.lectionaryKey).toBe('b-tc-25');
    const day = await getLectionaryForDay(info);
    expect(day.readings.length).toBeGreaterThanOrEqual(4);
    const refs = day.readings.map((r) => r.ref).join(' ');
    expect(refs).toContain('Marcos 10:46–52'); // evangelho do cego Bartimeu
    expect(day.readings.some((r) => r.type === 'Salmo')).toBe(true);
    expect(day.readings.some((r) => r.type === 'Santo Evangelho')).toBe(true);
  });

  it('fornece leituras diárias expandidas nos dias úteis, com salmo e três lições', async () => {
    const info = getLiturgicalInfo(new Date(2026, 9, 27)); // terça-feira da mesma semana
    const day = await getLectionaryForDay(info);
    expect(day.dayType).toContain('Terça-feira');
    expect(day.readings.length).toBeGreaterThanOrEqual(4);
    expect(day.readings[0].type).toBe('Salmo');
  });

  it('usa as lições próprias dos dias santos fixos', async () => {
    const info = getLiturgicalInfo(new Date(2026, 10, 1)); // Todos os Santos
    expect(info.isRedLetterDay).toBe(true);
    const day = await getLectionaryForDay(info);
    expect(day.key).toBe('santo-10-1');
    expect(day.readings.map((r) => r.ref).join(' ')).toContain('Mateus 5:1–12');
  });

  it('cobre integralmente 2026–2075 sem qualquer dia sem leituras', async () => {
    const cursor = new Date(2026, 0, 1);
    const end = new Date(2075, 11, 31);
    let empty = 0;
    let total = 0;
    while (cursor <= end) {
      const day = await getLectionaryForDay(getLiturgicalInfo(cursor));
      if (day.readings.length === 0) empty += 1;
      total += 1;
      cursor.setDate(cursor.getDate() + 1);
    }
    expect(total).toBeGreaterThan(18_000);
    expect(empty).toBe(0);
  });
});
