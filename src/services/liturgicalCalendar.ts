export type LiturgicalCycle = 'A' | 'B' | 'C';

export interface LiturgicalDayInfo {
  date: Date;
  dateFormatted: string;
  season: 'Advento' | 'Natal' | 'Epifania' | 'Quaresma' | 'Semana Santa' | 'Tempo Pascal' | 'Pentecostes' | 'Tempo Comum';
  cycle: LiturgicalCycle;
  title: string;
  color: 'purple' | 'white' | 'red' | 'green';
  colorName: string;
  proprioNumber?: number;
  holyDay?: string;
  isRedLetterDay: boolean;
  collectId?: string;
}

// Table of Movable Dates 2026 to 2040 from REB book (page 173)
interface MovableDatesYear {
  cycle: LiturgicalCycle;
  ashWednesday: { month: number; day: number };
  easter: { month: number; day: number };
  ascension: { month: number; day: number };
  pentecost: { month: number; day: number };
  proprioAfterTrinity: number;
  firstSundayAdvent: { month: number; day: number; nextCycle: LiturgicalCycle };
}

const MOVABLE_TABLE: Record<number, MovableDatesYear> = {
  2025: {
    cycle: 'C',
    ashWednesday: { month: 2, day: 5 },
    easter: { month: 3, day: 20 },
    ascension: { month: 4, day: 29 },
    pentecost: { month: 5, day: 8 },
    proprioAfterTrinity: 6,
    firstSundayAdvent: { month: 10, day: 30, nextCycle: 'A' }
  },
  2026: {
    cycle: 'A',
    ashWednesday: { month: 1, day: 18 },
    easter: { month: 3, day: 5 },
    ascension: { month: 4, day: 14 },
    pentecost: { month: 4, day: 24 },
    proprioAfterTrinity: 5,
    firstSundayAdvent: { month: 10, day: 29, nextCycle: 'B' }
  },
  2027: {
    cycle: 'B',
    ashWednesday: { month: 1, day: 10 },
    easter: { month: 2, day: 28 },
    ascension: { month: 4, day: 6 },
    pentecost: { month: 4, day: 16 },
    proprioAfterTrinity: 4,
    firstSundayAdvent: { month: 10, day: 28, nextCycle: 'C' }
  },
  2028: {
    cycle: 'C',
    ashWednesday: { month: 2, day: 1 },
    easter: { month: 3, day: 16 },
    ascension: { month: 4, day: 25 },
    pentecost: { month: 5, day: 4 },
    proprioAfterTrinity: 6,
    firstSundayAdvent: { month: 11, day: 3, nextCycle: 'A' }
  },
  2029: {
    cycle: 'A',
    ashWednesday: { month: 1, day: 14 },
    easter: { month: 3, day: 1 },
    ascension: { month: 4, day: 10 },
    pentecost: { month: 4, day: 20 },
    proprioAfterTrinity: 4,
    firstSundayAdvent: { month: 11, day: 2, nextCycle: 'B' }
  },
  2030: {
    cycle: 'B',
    ashWednesday: { month: 2, day: 6 },
    easter: { month: 3, day: 21 },
    ascension: { month: 4, day: 30 },
    pentecost: { month: 5, day: 9 },
    proprioAfterTrinity: 7,
    firstSundayAdvent: { month: 11, day: 1, nextCycle: 'C' }
  },
  2031: {
    cycle: 'C',
    ashWednesday: { month: 1, day: 26 },
    easter: { month: 3, day: 13 },
    ascension: { month: 4, day: 22 },
    pentecost: { month: 5, day: 1 },
    proprioAfterTrinity: 6,
    firstSundayAdvent: { month: 10, day: 30, nextCycle: 'A' }
  },
  2032: {
    cycle: 'A',
    ashWednesday: { month: 1, day: 11 },
    easter: { month: 2, day: 28 },
    ascension: { month: 4, day: 6 },
    pentecost: { month: 4, day: 16 },
    proprioAfterTrinity: 4,
    firstSundayAdvent: { month: 10, day: 28, nextCycle: 'B' }
  }
};

// Fixed Red Letter Holy Days (month is 0-indexed)
const RED_LETTER_DAYS: Record<string, { title: string; collectId: string }> = {
  '0-1': { title: 'Santo Nome e Circuncisão de Nosso Senhor', collectId: 'col-ds-santo-nome' },
  '0-6': { title: 'Epifania de Nosso Senhor Jesus Cristo', collectId: 'col-epif-dia' },
  '0-18': { title: 'Confissão de Pedro', collectId: 'col-ds-confissao-pedro' },
  '0-25': { title: 'Conversão de Paulo', collectId: 'col-ds-conversao-paulo' },
  '1-2': { title: 'Apresentação de Cristo no Templo', collectId: 'col-ds-apresentacao' },
  '1-24': { title: 'Matias, Apóstolo', collectId: 'col-ds-matias' },
  '2-19': { title: 'José de Nazaré, Esposo de Maria e Guardião de Jesus', collectId: 'col-ds-jose' },
  '2-25': { title: 'Anunciação de Nosso Senhor à Maria', collectId: 'col-ds-anunciacao' },
  '3-25': { title: 'Marcos, Evangelista', collectId: 'col-ds-marcos' },
  '4-1': { title: 'Filipe e Tiago Menor, Apóstolos', collectId: 'col-ds-filipe-tiago' },
  '4-31': { title: 'Visitação de Maria, mãe de nosso Senhor', collectId: 'col-ds-visitacao' },
  '5-11': { title: 'Barnabé, Apóstolo', collectId: 'col-ds-barnabe' },
  '5-24': { title: 'Natividade de João Batista', collectId: 'col-ds-nativ-joao-batista' },
  '5-29': { title: 'Pedro e Paulo, Apóstolos', collectId: 'col-ds-pedro-paulo' },
  '6-22': { title: 'Maria Madalena', collectId: 'col-ds-madalena' },
  '6-25': { title: 'Tiago, Apóstolo', collectId: 'col-ds-tiago-maior' },
  '7-15': { title: 'Maria, mãe de nosso Senhor', collectId: 'col-ds-maria-mae' },
  '7-24': { title: 'Bartolomeu, Apóstolo', collectId: 'col-ds-bartolomeu' },
  '8-14': { title: 'Dia da Santa Cruz', collectId: 'col-ds-santa-cruz' },
  '8-21': { title: 'Mateus, Apóstolo e Evangelista', collectId: 'col-ds-mateus' },
  '8-29': { title: 'Arcanjo Miguel e Todos os Anjos', collectId: 'col-ds-arcanjo-miguel' },
  '9-18': { title: 'Lucas, Evangelista', collectId: 'col-ds-lucas' },
  '9-23': { title: 'Tiago de Jerusalém, Irmão do Senhor', collectId: 'col-ds-tiago-jerusalem' },
  '9-28': { title: 'Simão e Judas, Apóstolos', collectId: 'col-ds-simao-judas' },
  '10-1': { title: 'Todos os Santos e Santas', collectId: 'col-ds-todos-santos' },
  '10-30': { title: 'André, Apóstolo', collectId: 'col-ds-andre' },
  '11-21': { title: 'Tomé, Apóstolo', collectId: 'col-ds-tome' },
  '11-24': { title: 'Vigília de Natal', collectId: 'col-nat-vigilia' },
  '11-25': { title: 'Natividade de Nosso Senhor Jesus Cristo', collectId: 'col-nat-dia' },
  '11-26': { title: 'Estêvão, Diácono e Mártir', collectId: 'col-ds-estevao' },
  '11-27': { title: 'João, Apóstolo e Evangelista', collectId: 'col-ds-joao' },
  '11-28': { title: 'Santos Inocentes', collectId: 'col-ds-inocentes' }
};

// Calculate Easter using standard Butcher's algorithm as fallback
function calculateEaster(year: number): { month: number; day: number } {
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
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed: 2=March, 3=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

export function getLiturgicalInfo(targetDate: Date = new Date()): LiturgicalDayInfo {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  const dayOfWeek = targetDate.getDay();

  // Find movable data or compute
  const tableData = MOVABLE_TABLE[year];
  let easterDate: Date;
  let ashWednesday: Date;
  let pentecostDate: Date;
  let firstAdvent: Date;
  let cycle: LiturgicalCycle;

  if (tableData) {
    easterDate = new Date(year, tableData.easter.month, tableData.easter.day);
    ashWednesday = new Date(year, tableData.ashWednesday.month, tableData.ashWednesday.day);
    pentecostDate = new Date(year, tableData.pentecost.month, tableData.pentecost.day);
    firstAdvent = new Date(year, tableData.firstSundayAdvent.month, tableData.firstSundayAdvent.day);
    cycle = tableData.cycle;
  } else {
    const e = calculateEaster(year);
    easterDate = new Date(year, e.month, e.day);
    ashWednesday = new Date(easterDate.getTime() - 46 * 86400000);
    pentecostDate = new Date(easterDate.getTime() + 49 * 86400000);
    // 4th Sunday before Christmas
    const xmas = new Date(year, 11, 25);
    const xmasDay = xmas.getDay();
    const daysBefore = xmasDay === 0 ? 28 : 21 + xmasDay;
    firstAdvent = new Date(xmas.getTime() - daysBefore * 86400000);
    // Cycle A in 2025/2026/2028, etc.
    const remainder = year % 3;
    cycle = remainder === 0 ? 'B' : remainder === 1 ? 'C' : 'A';
  }

  // If date is on or after 1st Sunday of Advent, switch to next year's cycle
  if (targetDate >= firstAdvent) {
    cycle = cycle === 'A' ? 'B' : cycle === 'B' ? 'C' : 'A';
  }

  const dateKey = `${month}-${day}`;
  const isRedLetter = !!RED_LETTER_DAYS[dateKey];
  const holyDayInfo = RED_LETTER_DAYS[dateKey];

  // Determine season
  let season: LiturgicalDayInfo['season'] = 'Tempo Comum';
  let title = '';
  let color: LiturgicalDayInfo['color'] = 'green';
  let colorName = 'Verde';
  let proprioNumber: number | undefined;
  let collectId: string | undefined;

  const palmSunday = new Date(easterDate.getTime() - 7 * 86400000);
  const holySaturday = new Date(easterDate.getTime() - 86400000);
  const trinitySunday = new Date(pentecostDate.getTime() + 7 * 86400000);

  // 1. ADVENTO
  if (targetDate >= firstAdvent && targetDate < new Date(year, 11, 24, 18, 0, 0)) {
    season = 'Advento';
    color = 'purple';
    colorName = 'Roxo Litúrgico';
    const weekOfAdvent = Math.floor((targetDate.getTime() - firstAdvent.getTime()) / (7 * 86400000)) + 1;
    title = dayOfWeek === 0 ? `${weekOfAdvent}º Domingo do Advento` : `${getDiaSemanaNome(dayOfWeek)} da ${weekOfAdvent}ª Semana do Advento`;
    collectId = `col-adv-${Math.min(weekOfAdvent, 4)}`;
  }
  // 2. NATAL (24 dez noite a 5 jan)
  else if ((month === 11 && day >= 24) || (month === 0 && day <= 5)) {
    season = 'Natal';
    color = 'white';
    colorName = 'Branco / Dourado';
    if (month === 11 && day === 24) {
      title = 'Vigília de Natal';
      collectId = 'col-nat-vigilia';
    } else if (month === 11 && day === 25) {
      title = 'Natividade de Nosso Senhor Jesus Cristo';
      collectId = 'col-nat-dia';
    } else {
      title = `Tempo do Natal (${day} de ${month === 11 ? 'dezembro' : 'janeiro'})`;
      collectId = 'col-nat-1';
    }
  }
  // 3. EPIFANIA (6 jan até Quarta de Cinzas)
  else if (targetDate < ashWednesday && (month > 0 || (month === 0 && day >= 6))) {
    season = 'Epifania';
    color = 'green';
    colorName = 'Verde (com Branco na Epifania e Batismo)';
    if (month === 0 && day === 6) {
      color = 'white';
      title = 'Epifania de Nosso Senhor Jesus Cristo';
      collectId = 'col-epif-dia';
    } else {
      title = `${getDiaSemanaNome(dayOfWeek)} após a Epifania`;
      collectId = 'col-epif-2';
    }
  }
  // 4. QUARESMA (Cinzas até véspera da Páscoa)
  else if (targetDate >= ashWednesday && targetDate <= holySaturday) {
    if (targetDate >= palmSunday) {
      season = 'Semana Santa';
      color = 'red';
      colorName = 'Vermelho da Paixão';
      if (dayOfWeek === 0) {
        title = 'Domingo de Ramos e da Paixão';
        collectId = 'col-sem-ramos';
      } else if (dayOfWeek === 4) {
        title = 'Quinta-feira Santa (Instituição da Ceia)';
        collectId = 'col-sem-quinta';
      } else if (dayOfWeek === 5) {
        title = 'Sexta-feira Santa (Paixão do Senhor)';
        collectId = 'col-sem-sexta';
      } else if (dayOfWeek === 6) {
        title = 'Sábado Santo';
        collectId = 'col-sem-sabado';
      } else {
        title = `${getDiaSemanaNome(dayOfWeek)} Santa`;
        collectId = 'col-sem-ramos';
      }
    } else {
      season = 'Quaresma';
      color = 'purple';
      colorName = 'Roxo Penitencial';
      if (targetDate.toDateString() === ashWednesday.toDateString()) {
        title = 'Quarta-feira de Cinzas';
        collectId = 'col-quar-cinzas';
      } else {
        const weeksSinceAsh = Math.floor((targetDate.getTime() - ashWednesday.getTime()) / (7 * 86400000)) + 1;
        title = dayOfWeek === 0 ? `${weeksSinceAsh}º Domingo na Quaresma` : `${getDiaSemanaNome(dayOfWeek)} da ${weeksSinceAsh}ª Semana da Quaresma`;
        collectId = `col-quar-${Math.min(weeksSinceAsh, 5)}`;
      }
    }
  }
  // 5. TEMPO PASCAL (Páscoa até Pentecostes)
  else if (targetDate >= easterDate && targetDate < pentecostDate) {
    season = 'Tempo Pascal';
    color = 'white';
    colorName = 'Branco Pascal';
    const ascensionDate = new Date(easterDate.getTime() + 39 * 86400000);
    if (targetDate.toDateString() === easterDate.toDateString()) {
      title = 'Domingo da Ressurreição — Páscoa';
      collectId = 'col-pasc-dia';
    } else if (targetDate.toDateString() === ascensionDate.toDateString()) {
      title = 'Ascensão de Nosso Senhor Jesus Cristo';
      collectId = 'col-pasc-ascensao';
    } else {
      const easterWeek = Math.floor((targetDate.getTime() - easterDate.getTime()) / (7 * 86400000)) + 1;
      title = dayOfWeek === 0 ? `${easterWeek}º Domingo da Páscoa` : `${getDiaSemanaNome(dayOfWeek)} da ${easterWeek}ª Semana da Páscoa`;
      collectId = `col-pasc-${Math.min(easterWeek, 7)}`;
    }
  }
  // 6. PENTECOSTES
  else if (targetDate.toDateString() === pentecostDate.toDateString()) {
    season = 'Pentecostes';
    color = 'red';
    colorName = 'Vermelho do Espírito Santo';
    title = 'Dia de Pentecostes';
    collectId = 'col-pasc-pentecostes';
  }
  // 7. TEMPO COMUM (Após Pentecostes até Advento)
  else {
    season = 'Tempo Comum';
    color = 'green';
    colorName = 'Verde da Vida Cristã';

    if (targetDate.toDateString() === trinitySunday.toDateString()) {
      title = 'Domingo da Santíssima Trindade';
      color = 'white';
      collectId = 'col-tc-trindade';
    } else {
      // Determine Proprio based on calendar date of Sunday
      proprioNumber = calculateProprioNumber(targetDate);
      if (proprioNumber === 29) {
        title = 'Domingo de Cristo Rei do Universo';
        color = 'white';
        collectId = 'col-tc-cristo-rei';
      } else {
        title = dayOfWeek === 0 ? `Domingo do Tempo Comum (Próprio ${proprioNumber})` : `${getDiaSemanaNome(dayOfWeek)} · Próprio ${proprioNumber}`;
        collectId = `col-tc-proprio-${proprioNumber}`;
      }
    }
  }

  // Red letter day takes precedence in title unless major season festival
  if (holyDayInfo) {
    title = `${holyDayInfo.title} · ${title}`;
    collectId = holyDayInfo.collectId || collectId;
    if (['col-ds-todos-santos', 'col-ds-santo-nome', 'col-ds-apresentacao', 'col-ds-anunciacao', 'col-ds-visitacao', 'col-ds-nativ-joao-batista', 'col-ds-madalena', 'col-ds-maria-mae'].includes(holyDayInfo.collectId)) {
      color = 'white';
      colorName = 'Branco';
    } else if (['col-ds-matias', 'col-ds-marcos', 'col-ds-pedro-paulo', 'col-ds-tiago-maior', 'col-ds-bartolomeu', 'col-ds-santa-cruz', 'col-ds-mateus', 'col-ds-lucas', 'col-ds-simao-judas', 'col-ds-andre', 'col-ds-tome', 'col-ds-estevao', 'col-ds-inocentes'].includes(holyDayInfo.collectId)) {
      color = 'red';
      colorName = 'Vermelho dos Mártires e Apóstolos';
    }
  }

  return {
    date: targetDate,
    dateFormatted: targetDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    season,
    cycle,
    title,
    color,
    colorName,
    proprioNumber,
    holyDay: holyDayInfo ? holyDayInfo.title : undefined,
    isRedLetterDay: isRedLetter,
    collectId
  };
}

// Calculate REB Proprio (1 to 29) according to Sunday dates in Tempo Comum (pp. 118-125)
function calculateProprioNumber(date: Date): number {
  const m = date.getMonth();
  const d = date.getDate();

  if (m === 4 && d >= 8 && d <= 14) return 1;
  if (m === 4 && d >= 15 && d <= 21) return 2;
  if (m === 4 && d >= 22 && d <= 28) return 3;
  if ((m === 4 && d >= 29) || (m === 5 && d <= 4)) return 4;
  if (m === 5 && d >= 5 && d <= 11) return 5;
  if (m === 5 && d >= 12 && d <= 18) return 6;
  if (m === 5 && d >= 19 && d <= 25) return 7;
  if ((m === 5 && d >= 26) || (m === 6 && d <= 2)) return 8;
  if (m === 6 && d >= 3 && d <= 9) return 9;
  if (m === 6 && d >= 10 && d <= 16) return 10;
  if (m === 6 && d >= 17 && d <= 23) return 11;
  if (m === 6 && d >= 24 && d <= 30) return 12;
  if ((m === 6 && d >= 31) || (m === 7 && d <= 6)) return 13;
  if (m === 7 && d >= 7 && d <= 13) return 14;
  if (m === 7 && d >= 14 && d <= 20) return 15;
  if (m === 7 && d >= 21 && d <= 27) return 16;
  if ((m === 7 && d >= 28) || (m === 8 && d <= 3)) return 17;
  if (m === 8 && d >= 4 && d <= 10) return 18;
  if (m === 8 && d >= 11 && d <= 17) return 19;
  if (m === 8 && d >= 18 && d <= 24) return 20;
  if ((m === 8 && d >= 25) || (m === 9 && d <= 1)) return 21;
  if (m === 9 && d >= 2 && d <= 8) return 22;
  if (m === 9 && d >= 9 && d <= 15) return 23;
  if (m === 9 && d >= 16 && d <= 22) return 24;
  if (m === 9 && d >= 23 && d <= 29) return 25;
  if ((m === 9 && d >= 30) || (m === 10 && d <= 5)) return 26;
  if (m === 10 && d >= 6 && d <= 12) return 27;
  if (m === 10 && d >= 13 && d <= 19) return 28;
  if (m === 10 && d >= 20 && d <= 26) return 29; // Cristo Rei
  
  // Default fallback estimation based on week
  if (m >= 5 && m <= 10) {
    const approx = Math.min(29, Math.max(1, Math.floor((m - 4) * 4.3 + (d / 7))));
    return approx;
  }
  return 25;
}

function getDiaSemanaNome(dayIndex: number): string {
  const nomes = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return nomes[dayIndex] || '';
}
