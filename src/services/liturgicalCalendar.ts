/**
 * Motor de Cálculo Litúrgico Perpétuo — Rede Episcopal Brasileira.
 *
 * Calcula, para qualquer data do calendário civil (cobertura validada para
 * 2026–2075, conforme a Tábua de Datas Móveis do livro, pp. 137–174):
 *  - Páscoa e datas móveis (Cinzas, Ramos, Ascensão, Pentecostes, Trindade,
 *    Cristo Rei, 1º Domingo do Advento);
 *  - Ano litúrgico (ciclo A, B ou C), tempo litúrgico e Próprio do dia;
 *  - chave `lectionaryKey` que indexa o Lecionário Comum Revisado Expandido.
 *
 * A Páscoa é obtida pelo algoritmo gregoriano de Meeus/Jones/Butcher, que
 * reproduz exatamente a tábua do livro para todos os anos do período.
 */

export type LiturgicalCycle = 'A' | 'B' | 'C';

export type LiturgicalColor = 'purple' | 'white' | 'red' | 'green';

export type Season =
  | 'Advento'
  | 'Natal'
  | 'Epifania'
  | 'Quaresma'
  | 'Semana Santa'
  | 'Tempo Pascal'
  | 'Pentecostes'
  | 'Tempo Comum';

export interface LiturgicalDayInfo {
  date: Date;
  dateFormatted: string;
  season: Season;
  cycle: LiturgicalCycle;
  title: string;
  color: LiturgicalColor;
  colorName: string;
  proprioNumber?: number;
  holyDay?: string;
  isRedLetterDay: boolean;
  collectId?: string;
  /** Chave única para localizar as leituras no lecionário, ex.: "B-tc-25". */
  lectionaryKey: string;
}

export interface MovableDates {
  year: number;
  /** Ciclo do lecionário dominical em uso de janeiro até o sábado anterior ao Advento. */
  cycle: LiturgicalCycle;
  /** Ciclo que se inicia no 1º Domingo do Advento deste ano. */
  cycleAtAdvent: LiturgicalCycle;
  ashWednesday: Date;
  easter: Date;
  ascension: Date;
  pentecost: Date;
  trinitySunday: Date;
  christTheKing: Date;
  firstSundayAdvent: Date;
}

export type CanonicalHourId = 'matutino' | 'meio-dia' | 'vespertino' | 'completas';

const MS_PER_DAY = 86_400_000;

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Páscoa no calendário gregoriano (algoritmo de Meeus/Jones/Butcher).
 * Válido para todos os anos de 1583 em diante.
 */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month0 = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-based: 2 = março
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month0, day);
}

/**
 * Conjunto completo das datas móveis de um ano civil.
 * O ano litúrgico se inicia no 1º Domingo do Advento do ano anterior.
 */
export function getMovableDatesForYear(year: number): MovableDates {
  const easter = calculateEaster(year);
  const ashWednesday = addDays(easter, -46);
  const ascension = addDays(easter, 39);
  const pentecost = addDays(easter, 49);
  const trinitySunday = addDays(pentecost, 7);

  // 1º Domingo do Advento: o domingo mais próximo de 30 de novembro
  // (4º domingo antes do Natal, sempre entre 27 de nov e 3 de dez).
  const nov27 = new Date(year, 10, 27);
  const firstSundayAdvent = addDays(nov27, (7 - nov27.getDay()) % 7);

  // Cristo Rei: domingo imediatamente anterior ao Advento.
  const christTheKing = addDays(firstSundayAdvent, -7);

  // No Advento do ano civil Y começa o ciclo: Y%3 0→A, 1→B, 2→C.
  // De janeiro ao Advento, vale o ciclo iniciado no Advento do ano anterior.
  const cycleAtAdvent: LiturgicalCycle = (['A', 'B', 'C'] as const)[year % 3];
  const cycle: LiturgicalCycle = (['A', 'B', 'C'] as const)[(((year - 1) % 3) + 3) % 3];

  return {
    year,
    cycle,
    cycleAtAdvent,
    ashWednesday,
    easter,
    ascension,
    pentecost,
    trinitySunday,
    christTheKing,
    firstSundayAdvent,
  };
}

/**
 * Ciclo litúrgico vigente numa data qualquer (respeita a virada no Advento).
 */
export function getCycleForDate(date: Date): LiturgicalCycle {
  const year = date.getFullYear();
  const { firstSundayAdvent } = getMovableDatesForYear(year);
  const adventYear = date >= firstSundayAdvent ? year : year - 1;
  return (['A', 'B', 'C'] as const)[((adventYear % 3) + 3) % 3];
}

/**
 * Hora canônica conforme a hora real do dia:
 * Matutino 05–11, Meio-Dia 11–15, Vespertino 15–21, Completas 21–05.
 */
export function getCanonicalHourId(date: Date = new Date()): CanonicalHourId {
  const h = date.getHours();
  if (h >= 5 && h < 11) return 'matutino';
  if (h >= 11 && h < 15) return 'meio-dia';
  if (h >= 15 && h < 21) return 'vespertino';
  return 'completas';
}

// Dias santos fixos (chave mês 0-based + dia).
const RED_LETTER_DAYS: Record<string, { title: string; collectId: string; color: LiturgicalColor }> = {
  '0-1': { title: 'Santo Nome e Circuncisão de Nosso Senhor', collectId: 'col-ds-santo-nome', color: 'white' },
  '0-6': { title: 'Epifania de Nosso Senhor Jesus Cristo', collectId: 'col-epif-dia', color: 'white' },
  '0-18': { title: 'Confissão de Pedro', collectId: 'col-ds-confissao-pedro', color: 'white' },
  '0-25': { title: 'Conversão de Paulo', collectId: 'col-ds-conversao-paulo', color: 'red' },
  '1-2': { title: 'Apresentação de Cristo no Templo', collectId: 'col-ds-apresentacao', color: 'white' },
  '1-24': { title: 'Matias, Apóstolo', collectId: 'col-ds-matias', color: 'red' },
  '2-19': { title: 'José de Nazaré, Esposo de Maria e Guardião de Jesus', collectId: 'col-ds-jose', color: 'white' },
  '2-25': { title: 'Anunciação de Nosso Senhor à Maria', collectId: 'col-ds-anunciacao', color: 'white' },
  '3-25': { title: 'Marcos, Evangelista', collectId: 'col-ds-marcos', color: 'red' },
  '4-1': { title: 'Filipe e Tiago Menor, Apóstolos', collectId: 'col-ds-filipe-tiago', color: 'red' },
  '4-31': { title: 'Visitação de Maria, mãe de nosso Senhor', collectId: 'col-ds-visitacao', color: 'white' },
  '5-11': { title: 'Barnabé, Apóstolo', collectId: 'col-ds-barnabe', color: 'red' },
  '5-24': { title: 'Natividade de João Batista', collectId: 'col-ds-nativ-joao-batista', color: 'white' },
  '5-29': { title: 'Pedro e Paulo, Apóstolos', collectId: 'col-ds-pedro-paulo', color: 'red' },
  '6-22': { title: 'Maria Madalena', collectId: 'col-ds-madalena', color: 'white' },
  '6-25': { title: 'Tiago, Apóstolo', collectId: 'col-ds-tiago-maior', color: 'red' },
  '7-15': { title: 'Maria, mãe de nosso Senhor', collectId: 'col-ds-maria-mae', color: 'white' },
  '7-24': { title: 'Bartolomeu, Apóstolo', collectId: 'col-ds-bartolomeu', color: 'red' },
  '8-14': { title: 'Dia da Santa Cruz', collectId: 'col-ds-santa-cruz', color: 'red' },
  '8-21': { title: 'Mateus, Apóstolo e Evangelista', collectId: 'col-ds-mateus', color: 'red' },
  '8-29': { title: 'Arcanjo Miguel e Todos os Anjos', collectId: 'col-ds-arcanjo-miguel', color: 'white' },
  '9-18': { title: 'Lucas, Evangelista', collectId: 'col-ds-lucas', color: 'red' },
  '9-23': { title: 'Tiago de Jerusalém, Irmão do Senhor', collectId: 'col-ds-tiago-jerusalem', color: 'red' },
  '9-28': { title: 'Simão e Judas, Apóstolos', collectId: 'col-ds-simao-judas', color: 'red' },
  '10-1': { title: 'Todos os Santos e Santas', collectId: 'col-ds-todos-santos', color: 'white' },
  '10-30': { title: 'André, Apóstolo', collectId: 'col-ds-andre', color: 'red' },
  '11-21': { title: 'Tomé, Apóstolo', collectId: 'col-ds-tome', color: 'red' },
  '11-24': { title: 'Vigília de Natal', collectId: 'col-nat-vigilia', color: 'white' },
  '11-25': { title: 'Natividade de Nosso Senhor Jesus Cristo', collectId: 'col-nat-dia', color: 'white' },
  '11-26': { title: 'Estêvão, Diácono e Mártir', collectId: 'col-estevao', color: 'red' },
  '11-27': { title: 'João, Apóstolo e Evangelista', collectId: 'col-ds-joao', color: 'white' },
  '11-28': { title: 'Santos Inocentes', collectId: 'col-ds-inocentes', color: 'red' },
};

const COLOR_NAMES: Record<LiturgicalColor, string> = {
  purple: 'Roxo Litúrgico',
  white: 'Branco / Dourado',
  red: 'Vermelho Litúrgico',
  green: 'Verde da Vida Cristã',
};

const WEEKDAY_NAMES = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

/**
 * Janelas canônicas do Lecionário Comum Revisado para os Próprios 1–29.
 * Cada Próprio corresponde ao domingo que cai no intervalo de datas
 * (dia/mês civil, independente do ano). O Próprio 29 é Cristo Rei.
 */
const PROPER_WINDOWS: { proper: number; startMonth: number; startDay: number; endMonth: number; endDay: number }[] = [
  { proper: 1, startMonth: 4, startDay: 11, endMonth: 4, endDay: 17 }, // 11–17 mai
  { proper: 2, startMonth: 4, startDay: 18, endMonth: 4, endDay: 24 },
  // O Próprio 3 só ocorre antes da Trindade (janelas canônicas do RCL);
  // o Próprio 4 começa em 29 de maio, sem sobreposição.
  { proper: 3, startMonth: 4, startDay: 25, endMonth: 4, endDay: 28 },
  { proper: 4, startMonth: 4, startDay: 29, endMonth: 5, endDay: 4 },
  { proper: 5, startMonth: 5, startDay: 5, endMonth: 5, endDay: 11 },
  { proper: 6, startMonth: 5, startDay: 12, endMonth: 5, endDay: 18 },
  { proper: 7, startMonth: 5, startDay: 19, endMonth: 5, endDay: 25 },
  { proper: 8, startMonth: 5, startDay: 26, endMonth: 6, endDay: 2 },
  { proper: 9, startMonth: 6, startDay: 3, endMonth: 6, endDay: 9 },
  { proper: 10, startMonth: 6, startDay: 10, endMonth: 6, endDay: 16 },
  { proper: 11, startMonth: 6, startDay: 17, endMonth: 6, endDay: 23 },
  { proper: 12, startMonth: 6, startDay: 24, endMonth: 6, endDay: 30 },
  { proper: 13, startMonth: 6, startDay: 31, endMonth: 7, endDay: 6 },
  { proper: 14, startMonth: 7, startDay: 7, endMonth: 7, endDay: 13 },
  { proper: 15, startMonth: 7, startDay: 14, endMonth: 7, endDay: 20 },
  { proper: 16, startMonth: 7, startDay: 21, endMonth: 7, endDay: 27 },
  { proper: 17, startMonth: 7, startDay: 28, endMonth: 8, endDay: 3 },
  { proper: 18, startMonth: 8, startDay: 4, endMonth: 8, endDay: 10 },
  { proper: 19, startMonth: 8, startDay: 11, endMonth: 8, endDay: 17 },
  { proper: 20, startMonth: 8, startDay: 18, endMonth: 8, endDay: 24 },
  { proper: 21, startMonth: 8, startDay: 25, endMonth: 9, endDay: 1 },
  { proper: 22, startMonth: 9, startDay: 2, endMonth: 9, endDay: 8 },
  { proper: 23, startMonth: 9, startDay: 9, endMonth: 9, endDay: 15 },
  { proper: 24, startMonth: 9, startDay: 16, endMonth: 9, endDay: 22 },
  { proper: 25, startMonth: 9, startDay: 23, endMonth: 9, endDay: 29 },
  { proper: 26, startMonth: 9, startDay: 30, endMonth: 10, endDay: 5 },
  { proper: 27, startMonth: 10, startDay: 6, endMonth: 10, endDay: 12 },
  { proper: 28, startMonth: 10, startDay: 13, endMonth: 10, endDay: 19 },
  { proper: 29, startMonth: 10, startDay: 20, endMonth: 10, endDay: 26 }, // 20–26 nov
];

/**
 * Próprio do Tempo Comum (1–29) para uma data, usando o domingo da semana
 * (domingo precedente) e as janelas canônicas do RCL. Fora das janelas,
 * limita ao Próprio mais próximo.
 */
export function calculateProprioNumber(date: Date): number {
  const sunday = addDays(date, -date.getDay()); // domingo da semana corrente
  const cmp = sunday.getFullYear() * 10000 + (sunday.getMonth() + 1) * 100 + sunday.getDate();

  for (const window of PROPER_WINDOWS) {
    const start = sunday.getFullYear() * 10000 + (window.startMonth + 1) * 100 + window.startDay;
    const end = sunday.getFullYear() * 10000 + (window.endMonth + 1) * 100 + window.endDay;
    if (cmp >= start && cmp <= end) return window.proper;
  }
  return cmp < 20260511 ? 1 : 29;
}

export function getLiturgicalInfo(targetDate: Date = new Date()): LiturgicalDayInfo {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  const dayOfWeek = targetDate.getDay();

  const movable = getMovableDatesForYear(year);
  const {
    ashWednesday,
    easter,
    ascension,
    pentecost,
    trinitySunday,
    christTheKing,
    firstSundayAdvent,
  } = movable;

  const cycle = getCycleForDate(targetDate);
  const prefix = cycle.toLowerCase();

  const dateKey = `${month}-${day}`;
  const holyDayInfo = RED_LETTER_DAYS[dateKey];

  let season: Season = 'Tempo Comum';
  let title = '';
  let color: LiturgicalColor = 'green';
  let proprioNumber: number | undefined;
  let collectId: string | undefined;
  let lectionaryKey = '';

  const palmSunday = addDays(easter, -7);
  const holySaturday = addDays(easter, -1);
  // Natal: início da vigília às 18h do dia 24.
  const christmasVigilStart = new Date(year, 11, 24, 18, 0, 0);

  // 1. ADVENTO
  if (targetDate >= firstSundayAdvent && targetDate < christmasVigilStart) {
    season = 'Advento';
    color = 'purple';
    const weekOfAdvent = Math.min(
      4,
      Math.floor((targetDate.getTime() - firstSundayAdvent.getTime()) / (7 * MS_PER_DAY)) + 1,
    );
    title =
      dayOfWeek === 0
        ? `${weekOfAdvent}º Domingo do Advento`
        : `${WEEKDAY_NAMES[dayOfWeek]} da ${weekOfAdvent}ª Semana do Advento`;
    collectId = `col-adv-${weekOfAdvent}`;
    lectionaryKey = `${prefix}-adv-${weekOfAdvent}`;
  }
  // 2. NATAL (véspera, 25 de dezembro e dias até 5 de janeiro)
  else if ((month === 11 && day >= 24) || (month === 0 && day <= 5)) {
    season = 'Natal';
    color = 'white';
    if (month === 11 && day === 24) {
      title = 'Vigília de Natal';
      collectId = 'col-nat-vigilia';
      lectionaryKey = `${prefix}-nat-vigilia`;
    } else if (month === 11 && day === 25) {
      title = 'Natividade de Nosso Senhor Jesus Cristo';
      collectId = 'col-nat-dia';
      lectionaryKey = `${prefix}-nat-dia`;
    } else {
      // Domingos depois do Natal: 1º e 2º Domingo após o Natal.
      const sundayAfterChristmas = addDays(new Date(year, 11, 25), 7 - new Date(year, 11, 25).getDay());
      const isFirstSunday = targetDate >= sundayAfterChristmas && targetDate < addDays(sundayAfterChristmas, 7);
      title = isFirstSunday
        ? '1º Domingo após o Natal'
        : `Tempo do Natal (${day} de ${month === 11 ? 'dezembro' : 'janeiro'})`;
      collectId = isFirstSunday ? 'col-nat-1' : 'col-nat-1';
      lectionaryKey = isFirstSunday ? `${prefix}-nat-1` : `${prefix}-nat-dia`;
    }
  }
  // 3. EPIFANIA (6 de janeiro até a Quarta de Cinzas)
  else if (targetDate < ashWednesday && (month > 0 || (month === 0 && day >= 6))) {
    season = 'Epifania';
    color = 'green';
    const epiphany = new Date(year, 0, 6);
    const baptismSunday = addDays(epiphany, 7 - epiphany.getDay()); // 1º dom após a Epifania
    const transfiguration = addDays(ashWednesday, -4); // último domingo antes da Quaresma

    if (month === 0 && day === 6) {
      color = 'white';
      title = 'Epifania de Nosso Senhor Jesus Cristo';
      collectId = 'col-epif-dia';
      lectionaryKey = `${prefix}-epif-dia`;
    } else if (isSameDay(targetDate, baptismSunday)) {
      color = 'white';
      title = 'Batismo de Nosso Senhor Jesus Cristo';
      collectId = 'col-epif-batismo';
      lectionaryKey = `${prefix}-epif-batismo`;
    } else if (isSameDay(targetDate, transfiguration)) {
      color = 'white';
      title = 'Domingo da Transfiguração';
      collectId = 'col-epif-transfig';
      lectionaryKey = `${prefix}-epif-transfig`;
    } else {
      const sundaysAfterEpiphany = Math.max(
        2,
        Math.round((targetDate.getTime() - epiphany.getTime()) / (7 * MS_PER_DAY)),
      );
      const epiphanyWeek = Math.min(8, sundaysAfterEpiphany);
      title =
        dayOfWeek === 0
          ? `${epiphanyWeek}º Domingo após a Epifania`
          : `${WEEKDAY_NAMES[dayOfWeek]} após a Epifania`;
      collectId = `col-epif-${Math.min(epiphanyWeek, 8)}`;
      lectionaryKey = `${prefix}-epif-${Math.min(epiphanyWeek, 8)}`;
    }
  }
  // 4. QUARESMA E SEMANA SANTA (Cinzas até o Sábado Santo)
  else if (targetDate >= ashWednesday && targetDate <= holySaturday) {
    if (isSameDay(targetDate, ashWednesday)) {
      season = 'Quaresma';
      color = 'purple';
      title = 'Quarta-feira de Cinzas';
      collectId = 'col-quar-cinzas';
      lectionaryKey = `${prefix}-quar-cinzas`;
    } else if (targetDate >= palmSunday) {
      season = 'Semana Santa';
      color = 'red';
      if (dayOfWeek === 0) {
        title = 'Domingo de Ramos e da Paixão';
        collectId = 'col-sem-ramos';
        lectionaryKey = `${prefix}-sem-ramos`;
      } else if (dayOfWeek === 4) {
        title = 'Quinta-feira Santa (Instituição da Ceia do Senhor)';
        collectId = 'col-sem-quinta';
        lectionaryKey = `${prefix}-sem-quinta`;
      } else if (dayOfWeek === 5) {
        title = 'Sexta-feira Santa (Paixão do Senhor)';
        collectId = 'col-sem-sexta';
        lectionaryKey = `${prefix}-sem-sexta`;
      } else if (dayOfWeek === 6) {
        title = 'Sábado Santo';
        collectId = 'col-sem-sabado';
        lectionaryKey = `${prefix}-sem-sabado`;
      } else {
        title = `${WEEKDAY_NAMES[dayOfWeek]} da Semana Santa`;
        collectId = 'col-sem-ramos';
        lectionaryKey = `${prefix}-sem-ramos`;
      }
    } else {
      season = 'Quaresma';
      color = 'purple';
      const lentWeek = Math.min(
        5,
        Math.floor((targetDate.getTime() - ashWednesday.getTime()) / (7 * MS_PER_DAY)) + 1,
      );
      title =
        dayOfWeek === 0
          ? `${lentWeek}º Domingo na Quaresma`
          : `${WEEKDAY_NAMES[dayOfWeek]} da ${lentWeek}ª Semana da Quaresma`;
      collectId = `col-quar-${lentWeek}`;
      lectionaryKey = `${prefix}-quar-${lentWeek}`;
    }
  }
  // 5. TEMPO PASCAL (Páscoa até a véspera de Pentecostes)
  else if (targetDate >= easter && targetDate < pentecost) {
    season = 'Tempo Pascal';
    color = 'white';
    if (isSameDay(targetDate, easter)) {
      title = 'Domingo da Ressurreição — Páscoa';
      collectId = 'col-pasc-dia';
      lectionaryKey = `${prefix}-pasc-dia`;
    } else if (isSameDay(targetDate, ascension)) {
      title = 'Ascensão de Nosso Senhor Jesus Cristo';
      collectId = 'col-pasc-ascensao';
      lectionaryKey = `${prefix}-pasc-ascensao`;
    } else {
      const easterWeek = Math.min(
        7,
        Math.floor((targetDate.getTime() - easter.getTime()) / (7 * MS_PER_DAY)) + 1,
      );
      title =
        dayOfWeek === 0
          ? `${easterWeek}º Domingo da Páscoa`
          : `${WEEKDAY_NAMES[dayOfWeek]} da ${easterWeek}ª Semana da Páscoa`;
      collectId = easterWeek === 1 ? 'col-pasc-dia' : `col-pasc-${easterWeek}`;
      lectionaryKey = `${prefix}-pasc-${easterWeek}`;
    }
  }
  // 6. PENTECOSTES
  else if (isSameDay(targetDate, pentecost)) {
    season = 'Pentecostes';
    color = 'red';
    title = 'Dia de Pentecostes';
    collectId = 'col-pasc-pentecostes';
    lectionaryKey = `${prefix}-pasc-pentecostes`;
  }
  // 7. TEMPO COMUM (depois de Pentecostes até o Advento)
  else {
    season = 'Tempo Comum';
    color = 'green';

    if (isSameDay(targetDate, trinitySunday)) {
      title = 'Domingo da Santíssima Trindade';
      color = 'white';
      collectId = 'col-tc-trindade';
      lectionaryKey = `${prefix}-tc-trindade`;
    } else if (isSameDay(targetDate, christTheKing) || isSameDay(addDays(targetDate, -dayOfWeek), christTheKing)) {
      proprioNumber = 29;
      title =
        dayOfWeek === 0
          ? 'Domingo de Cristo Rei do Universo'
          : `${WEEKDAY_NAMES[dayOfWeek]} · Semana de Cristo Rei`;
      color = 'white';
      collectId = 'col-tc-cristo-rei';
      lectionaryKey = `${prefix}-tc-29`;
    } else {
      proprioNumber = calculateProprioNumber(targetDate);
      title =
        dayOfWeek === 0
          ? `Domingo do Tempo Comum (Próprio ${proprioNumber})`
          : `${WEEKDAY_NAMES[dayOfWeek]} · Próprio ${proprioNumber}`;
      collectId = `col-tc-proprio-${proprioNumber}`;
      lectionaryKey = `${prefix}-tc-${proprioNumber}`;
    }
  }

  // Dias santos de letra vermelha: prevalecem sobre o título do dia comum.
  if (holyDayInfo) {
    title = `${holyDayInfo.title} · ${title}`;
    collectId = holyDayInfo.collectId;
    color = holyDayInfo.color;
  }

  return {
    date: targetDate,
    dateFormatted: targetDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    season,
    cycle,
    title,
    color,
    colorName: COLOR_NAMES[color],
    proprioNumber,
    holyDay: holyDayInfo?.title,
    isRedLetterDay: !!holyDayInfo,
    collectId,
    lectionaryKey,
  };
}
