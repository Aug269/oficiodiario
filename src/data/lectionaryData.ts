export interface LectionaryEntry {
  id: string;
  cycle: 'A' | 'B' | 'C';
  season: string;
  name: string;
  sundayReadings?: {
    firstReading: { ref: string; title: string };
    psalm: { ref: string; title: string };
    secondReading: { ref: string; title: string };
    gospel: { ref: string; title: string };
  };
  dailyReadings: {
    thursday: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
    friday: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
    saturday: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
    dailyPsalmPre: string;
    monday: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
    tuesday: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
    wednesday: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
    dailyPsalmPost: string;
  };
}

export const LECTIONARY_WEEK_SAMPLES: Record<string, LectionaryEntry> = {
  // ANO A - 1º Domingo do Advento (p. 176)
  'A-adv-1': {
    id: 'A-adv-1',
    cycle: 'A',
    season: 'Advento',
    name: '1º Domingo do Advento',
    sundayReadings: {
      firstReading: { ref: 'Isaías 2:1–5', title: 'Guerra transformada em paz' },
      psalm: { ref: 'Salmo 122', title: 'Alegria na casa de Deus' },
      secondReading: { ref: 'Romanos 13:11–14', title: 'A salvação está próxima; despertai do sono' },
      gospel: { ref: 'Mateus 24:36–44', title: 'A vinda repentina da salvação' }
    },
    dailyReadings: {
      thursday: { ot: 'Daniel 9:15–19', otTitle: 'Um pedido de perdão', nt: 'Tiago 4:1–10', ntTitle: 'Graça de Deus e humildade', gospel: 'Mateus 24:1–14', gospelTitle: 'O dia do Senhor está chegando' },
      friday: { ot: 'Gênesis 6:1–10', otTitle: 'A justiça de Noé', nt: 'Hebreus 11:1–7', ntTitle: 'Noé age com fé', gospel: 'Mateus 24:15–28', gospelTitle: 'O sacrilégio desolador' },
      saturday: { ot: 'Gênesis 6:11–22', otTitle: 'A arca e obediência', nt: 'Hebreus 11:8–16', ntTitle: 'Promessas à distância', gospel: 'Marcos 13:32–37', gospelTitle: 'A necessidade de vigilância' },
      dailyPsalmPre: 'Salmo 122',
      monday: { ot: 'Gênesis 8:1–19', otTitle: 'As águas do dilúvio baixam', nt: 'Romanos 6:1–11', ntTitle: 'Morrendo e ressuscitando em Cristo', gospel: 'Lucas 17:22–37', gospelTitle: 'A vinda do reino' },
      tuesday: { ot: 'Gênesis 9:1–17', otTitle: 'O sinal do arco-íris', nt: 'Hebreus 11:32–40', ntTitle: 'Os heróis da fé', gospel: 'Lucas 12:49–56', gospelTitle: 'Jesus, causa de divisão' },
      wednesday: { ot: 'Isaías 54:1–10', otTitle: 'Deus salvará o povo', nt: 'Romanos 6:12–23', ntTitle: 'Não deixeis o pecado reinar', gospel: 'Mateus 24:23–35', gospelTitle: 'O fim está chegando' },
      dailyPsalmPost: 'Salmo 124'
    }
  },

  // ANO B - Próprio 25 (p. 316)
  'B-proprio-25': {
    id: 'B-proprio-25',
    cycle: 'B',
    season: 'Tempo Comum',
    name: 'Próprio 25 (Domingo entre 23 e 29 de outubro)',
    sundayReadings: {
      firstReading: { ref: 'Jó 42:1–6, 10–17', title: 'A restauração de Jó' },
      psalm: { ref: 'Salmo 34:1–8, (19–22)', title: 'Provai e vede' },
      secondReading: { ref: 'Hebreus 7:23–28', title: 'Cristo, o sumo sacerdote misericordioso' },
      gospel: { ref: 'Marcos 10:46–52', title: 'Cristo cura o cego Bartimeu' }
    },
    dailyReadings: {
      thursday: { ot: '2 Reis 20:12–19', otTitle: 'A palavra vem a Ezequias', nt: 'Hebreus 7:1–10', ntTitle: 'A ordem de Melquisedeque', gospel: 'Mateus 9:27–31', gospelTitle: 'Jesus cura dois na Galileia' },
      friday: { ot: 'Neemias 1:1–11', otTitle: 'Neemias ora pela restauração', nt: 'Hebreus 7:11–22', ntTitle: 'Jesus é como Melquisedeque', gospel: 'João 9:1–11', gospelTitle: 'Jesus dá vista ao cego' },
      saturday: { ot: 'Jó 42:7–9', otTitle: 'Deus corrige os amigos de Jó', nt: 'Romanos 8:28–34', ntTitle: 'Cristo intercede por nós', gospel: 'Marcos 8:22–26', gospelTitle: 'Jesus cura um cego' },
      dailyPsalmPre: 'Salmo 34:1–8',
      monday: { ot: 'Isaías 59:9–19', otTitle: 'O povo confessa os seus pecados', nt: '1 Pedro 2:1–10', ntTitle: 'Chamados a um sacerdócio santo', gospel: 'Mateus 20:29–34', gospelTitle: 'Jesus cura dois cegos' },
      tuesday: { ot: 'Ezequiel 18:1–32', otTitle: 'Os justos não são culpados', nt: 'Atos 9:32–35', ntTitle: 'A cura de Enéias', gospel: 'Lucas 18:35–43', gospelTitle: 'Uma cura em Jericó' },
      wednesday: { ot: 'Ezequiel 14:12–23', otTitle: 'Jó, um exemplo de justiça', nt: 'Romanos 6:5–11', ntTitle: 'Cristo morreu para o pecado de uma vez por todas', gospel: 'Marcos 8:14–21', gospelTitle: 'Os que veem e não conseguem ver' },
      dailyPsalmPost: 'Salmo 28'
    }
  },

  // ANO C - Próprio 25 (p. 390)
  'C-proprio-25': {
    id: 'C-proprio-25',
    cycle: 'C',
    season: 'Tempo Comum',
    name: 'Próprio 25 (Domingo entre 23 e 29 de outubro)',
    sundayReadings: {
      firstReading: { ref: 'Joel 2:23–32', title: 'A promessa de restaurar Israel' },
      psalm: { ref: 'Salmo 65', title: 'Os teus caminhos transbordam de fartura' },
      secondReading: { ref: '2 Timóteo 4:6–8, 16–18', title: 'O bom combate da fé' },
      gospel: { ref: 'Lucas 18:9–14', title: 'Um fariseu e um publicano oram' }
    },
    dailyReadings: {
      thursday: { ot: 'Joel 1:1–20', otTitle: 'Lamento e chamado ao arrependimento', nt: 'Colossenses 4:7–18', ntTitle: 'Paulo fala das suas cadeias', gospel: 'Lucas 1:46b–55', gospelTitle: 'O cântico de Maria' },
      friday: { ot: 'Joel 2:1–11', otTitle: 'O dia do Senhor', nt: '2 Timóteo 3:1–9', ntTitle: 'A impiedade nos últimos dias', gospel: 'Lucas 7:28–29', gospelTitle: 'João batiza cobradores de impostos' },
      saturday: { ot: 'Joel 2:12–22', otTitle: 'Volta para o teu Deus', nt: '2 Timóteo 3:10–15', ntTitle: 'A perseguição dos piedosos', gospel: 'Marcos 2:13–17', gospelTitle: 'Jantar com o cobrador de impostos Levi' },
      dailyPsalmPre: 'Salmo 65',
      monday: { ot: 'Joel 3:1–8', otTitle: 'Deus restaurará Israel e Judá', nt: '1 Pedro 4:12–19', ntTitle: 'O sofrimento dos justos', gospel: 'Mateus 18:1–5', gospelTitle: 'Humildade como a de uma criança' },
      tuesday: { ot: 'Joel 3:9–16', otTitle: 'O vale de Josafá', nt: '1 Pedro 5:1–11', ntTitle: 'A coroa incorruptível da glória', gospel: 'Mateus 21:28–32', gospelTitle: 'A fé de cobradores de impostos e prostitutas' },
      wednesday: { ot: 'Joel 3:17–20', otTitle: 'O futuro glorioso de Judá', nt: '2 Timóteo 4:9–15, 19–22', ntTitle: 'Palavras de despedida', gospel: 'Lucas 6:35–37', gospelTitle: 'Sede misericordiosos como Deus é misericordioso' },
      dailyPsalmPost: 'Salmo 87'
    }
  }
};

export function getTodayLectionary(cycle: 'A' | 'B' | 'C', season: string, proprio?: number, dayOfWeek: number = new Date().getDay()) {
  const key = `${cycle}-${season === 'Advento' ? 'adv-1' : `proprio-${proprio || 25}`}`;
  const entry = LECTIONARY_WEEK_SAMPLES[key] || LECTIONARY_WEEK_SAMPLES[`${cycle}-proprio-25`] || LECTIONARY_WEEK_SAMPLES['B-proprio-25'];
  
  if (dayOfWeek === 0 && entry.sundayReadings) {
    return {
      dayType: 'Domingo',
      title: entry.name,
      readings: [
        { type: 'Primeira Leitura', ...entry.sundayReadings.firstReading },
        { type: 'Salmo', ...entry.sundayReadings.psalm },
        { type: 'Segunda Leitura', ...entry.sundayReadings.secondReading },
        { type: 'Santo Evangelho', ...entry.sundayReadings.gospel }
      ]
    };
  }

  // Weekday selection
  const daily = entry.dailyReadings;
  let dayData: { ot: string; otTitle: string; nt: string; ntTitle: string; gospel: string; gospelTitle: string };
  let psalm = daily.dailyPsalmPre;
  let dayLabel = 'Dia de Semana';

  if (dayOfWeek === 4) { // Quinta
    dayData = daily.thursday;
    dayLabel = 'Quinta-feira (Preparação para o Domingo)';
  } else if (dayOfWeek === 5) { // Sexta
    dayData = daily.friday;
    dayLabel = 'Sexta-feira (Preparação para o Domingo)';
  } else if (dayOfWeek === 6) { // Sábado
    dayData = daily.saturday;
    dayLabel = 'Sábado (Preparação para o Domingo)';
  } else if (dayOfWeek === 1) { // Segunda
    dayData = daily.monday;
    psalm = daily.dailyPsalmPost;
    dayLabel = 'Segunda-feira (Reflexão sobre o Domingo)';
  } else if (dayOfWeek === 2) { // Terça
    dayData = daily.tuesday;
    psalm = daily.dailyPsalmPost;
    dayLabel = 'Terça-feira (Reflexão sobre o Domingo)';
  } else { // Quarta
    dayData = daily.wednesday;
    psalm = daily.dailyPsalmPost;
    dayLabel = 'Quarta-feira (Reflexão sobre o Domingo)';
  }

  return {
    dayType: dayLabel,
    title: entry.name,
    readings: [
      { type: 'Salmo Diário', ref: psalm, title: 'Salmo do Dia' },
      { type: 'Antigo Testamento', ref: dayData.ot, title: dayData.otTitle },
      { type: 'Epístola / Novo Testamento', ref: dayData.nt, title: dayData.ntTitle },
      { type: 'Evangelho', ref: dayData.gospel, title: dayData.gospelTitle }
    ]
  };
}
