import { describe, it, expect } from 'vitest';
import { CANTICLES, APOSTLES_CREED } from './liturgyData';
import { ALL_COLLECTS } from './collectsData';
import { getCommons, getOccasions, getOAntiphons } from './lectionaryData';
import {
  getCommemorationsForDate,
  getCommemorationsForMonth,
  getCommemorationCount,
} from './commemorationsData';

describe('completude diante do livro REB', () => {
  it('cataloga os 12 cânticos, incluindo os 5 suplementares que faltavam', () => {
    expect(CANTICLES).toHaveLength(12);
    for (const id of [
      'te-deum', 'benedictus-dominus', 'magna-et-mirabilia', 'surge-illuminare',
      'kyrie-pantokrator', 'quaerite-dominum', 'cantemus-domino', 'dignus-es',
      'cantate-domino', 'ecce-deus', 'deus-misereatur', 'benedicite',
    ]) {
      const canticle = CANTICLES.find((c) => c.id === id);
      expect(canticle, id).toBeDefined();
      expect(canticle!.verses.length).toBeGreaterThan(0);
    }
    const quaerite = CANTICLES.find((c) => c.id === 'quaerite-dominum')!;
    expect(quaerite.reference).toBe('Isaías 55:6–11');
    expect(quaerite.verses[0].call).toContain('Buscai o SENHOR');
  });

  it('expõe o Credo Apostólico como seção própria (p. 86)', () => {
    expect(APOSTLES_CREED).toContain('Creio em Deus Pai Todo-Poderoso');
    expect(APOSTLES_CREED).toContain('desceu ao Hades');
    expect(APOSTLES_CREED.endsWith('Amém.')).toBe(true);
  });

  it('inclui as 9 Coletas Comuns (pp. 132–134) além das 101 já existentes', () => {
    expect(ALL_COLLECTS).toHaveLength(110);
    const comuns = ALL_COLLECTS.filter((c) => c.category === 'comuns');
    expect(comuns).toHaveLength(9);
    expect(comuns.map((c) => c.title)).toEqual([
      'Comum dos Mártires',
      'Comum dos Missionários',
      'Comum dos Pastores / Bispos',
      'Comum dos Teólogos, Mestres e Confessores',
      'Comum dos Membros de Comunidade ou Ordem Religiosa',
      'Comum dos Ecumenistas',
      'Comum dos Reformadores',
      'Comum dos Renovadores da Sociedade',
      'Comum dos Santos e Santas',
    ]);
  });

  it('gera os 7 Comuns dos Santos com as leituras exatas do livro (pp. 405–406)', async () => {
    const commons = await getCommons();
    expect(commons).toHaveLength(7);
    const martires = commons.find((c) => c.id === 'comum-martires')!;
    expect(martires.readings.map((r) => r.ref)).toEqual([
      'Jeremias 11:18–20', 'Salmo 3', 'Mateus 16:24–27',
    ]);
    const santos = commons.find((c) => c.id === 'comum-santos')!;
    expect(santos.readings.map((r) => r.ref)).toEqual([
      'Eclesiástico 51:10–12', 'Salmo 131', 'Filipenses 3:7–14', 'Mateus 25:1–13',
    ]);
  });

  it('gera as 15 Ocasiões Especiais, preservando alternativas e notas (pp. 407–409)', async () => {
    const occasions = await getOccasions();
    expect(occasions).toHaveLength(15);
    const almas = occasions.find((o) => o.id === 'ocas-almas')!;
    expect(almas.note).toBe('2 de novembro');
    expect(almas.readings).toHaveLength(7);
    expect(almas.readings.filter((r) => r.alternative)).toHaveLength(3);
    const rogacao = occasions.find((o) => o.id === 'ocas-rogacao')!;
    expect(rogacao.note).toBe('Os três dias antes da Ascensão');
    expect(rogacao.readings[0].ref).toBe('Deuteronômio 11:10–15');
    const gracaA = occasions.find((o) => o.id === 'ocas-acao-gracas-a')!;
    expect(gracaA.readings[0].title).toBe('Uma terra de riachos');
  });

  it('gera as 7 Antífonas Ó de 17 a 23 de dezembro com as datas do livro (pp. 409–410)', async () => {
    const antiphons = await getOAntiphons();
    expect(antiphons.map((a) => a.day)).toEqual([17, 18, 19, 20, 21, 22, 23]);
    expect(antiphons.map((a) => a.name)).toEqual([
      'Ó Sabedoria', 'Ó Senhor do Poder', 'Ó Raiz de Jessé', 'Ó Chave de Davi',
      'Ó Sol Nascente', 'Ó Desejado das Nações', 'Ó Emanuel',
    ]);
    const emanuel = antiphons.find((a) => a.day === 23)!;
    expect(emanuel.readings.map((r) => r.ref)).toEqual([
      'Malaquias 3:1–4, 23–24', 'Salmo 25:4–5, 8–10, 14', 'Lucas 1:57–66',
    ]);
    const sol = antiphons.find((a) => a.day === 21)!;
    expect(sol.readings).toHaveLength(4); // inclui a alternativa "ou Sofonias"
    expect(sol.readings.some((r) => r.alternative)).toBe(true);
  });

  it('cataloga as comemorações opcionais do calendário (pp. 146–169)', () => {
    expect(getCommemorationCount()).toBe(212);
    const jan2 = getCommemorationsForDate(0, 2);
    expect(jan2).toHaveLength(1);
    expect(jan2[0].name).toBe('Basílio Magno e Gregório de Nazianzo');
    expect(jan2[0].years).toEqual([379, 389]);
    // Fevereiro impresso com 28 dias.
    expect(getCommemorationsForMonth(1).every((c) => c.day <= 28)).toBe(true);
    // Dia santo + antífona no mesmo dia (21 de dezembro).
    const dez21 = getCommemorationsForDate(11, 21);
    expect(dez21.some((c) => c.kind === 'santo' && c.name === 'Tomé Apóstolo')).toBe(true);
    expect(dez21.some((c) => c.kind === 'comemoracao' && c.name === 'O Rex Gentium')).toBe(true);
  });
});
