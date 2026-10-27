/**
 * Gera src/data/lectionaryData.generated.ts a partir do texto extraído do PDF
 * oficial da REB (scripts/out/full-text.txt). Não embarca no app: executado
 * em tempo de desenvolvimento com `npm run build:lectionary`.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const raw = readFileSync('scripts/out/full-text.txt', 'utf8');
const pages = raw.split(/\n===== PÁGINA (\d+) =====\n/).slice(1);
const pageMap = new Map();
for (let i = 0; i < pages.length; i += 2) {
  pageMap.set(Number(pages[i]), pages[i + 1].replace(/\s+/g, ' ').trim());
}

const flex = (s) =>
  s
    .split('')
    .map((ch) => (ch === ' ' ? '\\s+' : ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*'))
    .join('');
const flexRe = (s, flags = 'gu') => new RegExp(flex(s), flags);
// Como flexRe, mas não admite casamento parcial dentro de palavras vizinhas.
const flexWordRe = (s, flags = 'gu') => new RegExp(`${flex(s)}(?![A-Za-zÀ-ÿ])`, flags);

const M_READ = flexRe('Leituras do Domingo');
const M_PREP = flexRe('Preparação para o Domingo');
const M_REFL = flexRe('Reflexão sobre o Domingo');
const M_PSALM = flexRe('Salmo diário');
const M_CANTICLE = flexRe('Cântico diário');
const DAY_MS = [
  ['thu', flexRe('Quinta-feira')],
  ['fri', flexRe('Sexta-feira')],
  ['sat', flexRe('Sábado')],
  ['mon', flexRe('Segunda-feira')],
  ['tue', flexRe('Terça-feira')],
  ['wed', flexRe('Quarta-feira')],
];

const BOOKS = [
  '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas',
  '1 Tessalonicenses', '2 Tessalonicenses', '1 Timóteo', '2 Timóteo',
  '1 Coríntios', '2 Coríntios', '1 Pedro', '2 Pedro', '1 João', '2 João', '3 João',
  'Cântico dos Cânticos', 'Números', 'Deuteronômio', 'Provérbios', 'Eclesiastes',
  'Eclesiástico', 'Lamentações', 'Sofonias', 'Miquéias', 'Miqueias', 'Zacarias', 'Malaquias',
  'Colossenses', 'Filipenses', 'Tessalonicenses', 'Apocalipse', 'Jeremias',
  'Gênesis', 'Êxodo', 'Levítico', 'Neemias', 'Ezequiel', 'Hebreus', 'Filemom',
  'Sabedoria', 'Baruque', 'Isaías', 'Oséias', 'Oseias', 'Obadias', 'Habacuque', 'Ageu',
  'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', 'Gálatas', 'Efésios',
  'Tiago', 'Judas', 'Amós', 'Jonas', 'Naum', 'Daniel', 'Joel', 'Rute', 'Josué',
  'Juízes', 'Esdras', 'Ester', 'Salmos', 'Salmo', 'Jó', 'Tito',
].sort((a, b) => b.length - a.length);

  const refRe = new RegExp(
    `(${BOOKS.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})` +
    `(\\s\\d{1,3}(?:\\([^)]*\\))?(?::(?:\\([^)]*\\)|\\d{1,3}[a-z]?))?` +
    `(?:\\s?[–—-]\\s?\\d{1,3}(?::\\d{1,3}[a-z]?)?[a-z]?)*` +
    `(?:,\\s?\\d{1,3}[a-z]?(?:[–-]\\d{1,3})?)*` +
    `(?:[,\\s]*\\([^)]*\\))*` +
    `(?:;\\s?\\d{1,3}(?::\\d{1,3})?[a-z]?(?:[–-]\\d{1,3})?)*)`,
    'gu',
  );

function clean(t) {
  return t
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(s|c|ou)\s+/, '')
    .replace(/\s+(s|c)$/, '')
    .trim();
}

/** Extrai todas as referências com título e marcador de série (s/c). */
function parseReadings(region) {
  const out = [];
  const matches = [...region.matchAll(refRe)];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const before = region.slice(matches[i - 1] ? matches[i - 1].index + matches[i - 1][0].length : 0, m.index);
    const afterEnd = i + 1 < matches.length ? matches[i + 1].index : region.length;
    let title = clean(region.slice(m.index + m[0].length, afterEnd))
      // Restos de alternativas ("ou") e sufixos de versículo ("a") não são títulos.
      .replace(/^(ou|[a-z])$/u, '');
    const prefix = before.trim();
    const series = /(?:^|\s)(s|c)$/.test(prefix) ? prefix.slice(-1) : undefined;
    const alternative = /\bou$/.test(prefix);
    out.push({
      ref: m[0].replace(/\s+/g, ' ').trim(),
      title: title || 'Leitura designada',
      ...(series ? { series } : {}),
      ...(alternative ? { alternative: true } : {}),
    });
  }
  return out;
}

function mapHeader(deSpaced) {
  let m;
  if ((m = deSpaced.match(/(\d)ºDomingodoAdvento/))) return `adv-${m[1]}`;
  if (deSpaced.includes('BatismodeNossoSenhor')) return 'epif-batismo';
  if ((m = deSpaced.match(/(\d)ºDomingodepoisdaEpifania/))) return `epif-${m[1]}`;
  if (deSpaced.includes('Transfiguração')) return 'epif-transfig';
  if ((m = deSpaced.match(/(\d)ºDomingonaQuaresma/))) return `quar-${m[1]}`;
  if (deSpaced.includes('DomingodeRamos')) return 'sem-ramos';
  if ((m = deSpaced.match(/(\d)ºDomingodaPáscoa/))) return `pasc-${m[1]}`;
  if (deSpaced.includes('AscensãodeNossoSenhor')) return 'pasc-ascensao';
  if (deSpaced.includes('Pentecostes')) return 'pasc-pentecostes';
  if (deSpaced.includes('SantíssimaTrindade')) return 'tc-trindade';
  if ((m = deSpaced.match(/Próprio(\d+)/))) return `tc-${Number(m[1])}`;
  return null;
}

function parseDayRegions(region) {
  const labels = DAY_MS.filter(([, re]) => re.test(region)).map(([id, re]) => {
    const mm = [...region.matchAll(new RegExp(re.source, 'gu'))][0];
    return { id, index: mm.index, len: mm[0].length };
  }).sort((a, b) => a.index - b.index);
  const out = {};
  labels.forEach((lab, i) => {
    const end = i + 1 < labels.length ? labels[i + 1].index : region.length;
    out[lab.id] = parseReadings(region.slice(lab.index + lab.len, end));
  });
  return out;
}

function parsePsalms(region) {
  const out = {};
  const stopRes = [M_PREP, M_REFL, flexRe('Próprio'), ...DAY_MS.map(([, re]) => re)];
  const cutSegment = (text, start) => {
    let stop = text.length;
    for (const re of stopRes) {
      const m = [...text.slice(start).matchAll(new RegExp(re.source, 'gu'))][0];
      if (m) stop = Math.min(stop, start + m.index);
    }
    return text.slice(start, Math.min(stop, start + 220));
  };
  for (const [key, re] of [['pre', M_PSALM], ['post', M_PSALM], ['canticle', M_CANTICLE]]) {
    const mm = [...region.matchAll(new RegExp(re.source, 'gu'))];
    if (!mm.length) continue;
    const hit = key === 'post' ? mm[mm.length - 1] : mm[0];
    const parsed = parseReadings(cutSegment(region, hit.index + hit[0].length));
    if (parsed.length) out[key] = parsed;
  }
  return out;
}

function yearStream(start, end) {
  return [...pageMap.entries()]
    .filter(([n]) => n >= start && n <= end)
    .sort((a, b) => a[0] - b[0])
    .map(([, t]) => t)
    .join(' ');
}

function buildYear(cycle, start, end) {
  const stream = yearStream(start, end);
  const reads = [...stream.matchAll(new RegExp(M_READ.source, 'gu'))];
  const result = {};

  reads.forEach((match, k) => {
    const blockStart = k === 0 ? 0 : reads[k - 1].index + reads[k - 1][0].length;
    const nextStart = k + 1 < reads.length ? reads[k + 1].index : stream.length;
    const before = stream.slice(blockStart, match.index);
    const after = stream.slice(match.index + match[0].length, nextStart);

    const reflMatch = [...after.matchAll(new RegExp(M_REFL.source, 'gu'))][0];
    const sundayRegion = reflMatch ? after.slice(0, reflMatch.index) : after.slice(0, 600);
    const sunday = parseReadings(sundayRegion);

    const prepMatch = [...before.matchAll(new RegExp(M_PREP.source, 'gu'))].pop();
    const headerRegion = prepMatch ? before.slice(0, prepMatch.index) : before;
    const deSpaced = headerRegion.replace(/\s+/g, '');
    const suffix = mapHeader(deSpaced);
    if (!suffix) {
      console.warn(`[${cycle}] cabeçalho não reconhecido: ${deSpaced.slice(-70)}`);
      return;
    }
    const key = `${cycle.toLowerCase()}-${suffix}`;
    if (result[key]) console.warn(`[${cycle}] chave duplicada: ${key}`);

    const entry = { key, name: headerRegion.trim().split(/\s{2,}/).filter(Boolean).pop() || suffix, sunday };

    // Leituras diárias (séries expandidas)
    const prepRegion = prepMatch ? before.slice(prepMatch.index + prepMatch[0].length) : '';
    const reflRegion = reflMatch ? after.slice(reflMatch.index + reflMatch[0].length) : '';
    const daily = { ...parseDayRegions(prepRegion), ...parseDayRegions(reflRegion) };
    const psalmPre = parsePsalms(prepRegion).pre ?? parsePsalms(prepRegion).canticle;
    const psalmPost = parsePsalms(reflRegion).pre ?? parsePsalms(reflRegion).canticle;
    const psalms = {};
    if (psalmPre) psalms.pre = psalmPre;
    if (psalmPost) psalms.post = psalmPost;
    if (Object.keys(daily).length) entry.daily = daily;
    if (Object.keys(psalms).length) entry.psalms = psalms;
    result[key] = entry;
  });

  // Blocos especiais sem marcador "Leituras do Domingo"
  const specials = [
    ['quar-cinzas', 'Quarta-feira de Cinzas', '1º Domingo na Quaresma'],
    ['sem-quinta', 'Quinta-feira Santa', 'Sexta-feira Santa'],
    ['sem-sexta', 'Sexta-feira Santa', 'Sábado Santo'],
    ['sem-sabado', 'Sábado Santo', 'Ressurreição do Senhor'],
    ['pasc-ascensao', 'Ascensão de Nosso Senhor Jesus Cristo', '7º Domingo da Páscoa'],
  ];
  // Stop words que precisam de limite de palavra (evita "III" casando "II Isaías").
  const wordBoundStops = new Set(['Próprio III', 'Vigília Pascal', 'Ressurreição do Senhor']);
  for (const [suffix, begin, stop] of specials) {
    const b = [...stream.matchAll(new RegExp(flexRe(begin).source, 'gu'))][0];
    const stopRe = wordBoundStops.has(stop) ? flexWordRe(stop) : flexRe(stop);
    const s = [...stream.matchAll(new RegExp(stopRe.source, 'gu'))].find((m) => !b || m.index > b.index);
    if (!b) continue;
    const region = stream.slice(b.index + b[0].length, s ? s.index : b.index + 700);
    result[`${cycle.toLowerCase()}-${suffix}`] = {
      key: `${cycle.toLowerCase()}-${suffix}`,
      name: begin,
      sunday: parseReadings(region),
    };
  }

  // Domingo de Ramos: apenas as duas liturgias dominicais (Ramos e Paixão)
  const ramosBegin = [...stream.matchAll(new RegExp(flexRe('Liturgia dos Ramos').source, 'gu'))][0];
  const ramosEnd = [...stream.matchAll(new RegExp(flexRe('Segunda-feira Santa').source, 'gu'))][0];
  if (ramosBegin && ramosEnd) {
    result[`${cycle.toLowerCase()}-sem-ramos`] = {
      key: `${cycle.toLowerCase()}-sem-ramos`,
      name: 'Domingo de Ramos e da Paixão',
      sunday: parseReadings(stream.slice(ramosBegin.index + ramosBegin[0].length, ramosEnd.index)),
    };
  }

  // Vigília Pascal: apenas epístola, salmo e evangelho (corta no próximo bloco)
  const vp = [...stream.matchAll(new RegExp(flexRe('Epístola, salmo e Evangelho').source, 'gu'))][0];
  if (vp) {
    const nextRead = [...stream.matchAll(new RegExp(M_READ.source, 'gu'))].find((m) => m.index > vp.index);
    const end = nextRead ? nextRead.index : vp.index + 350;
    result[`${cycle.toLowerCase()}-pasc-vigilia`] = {
      key: `${cycle.toLowerCase()}-pasc-vigilia`,
      name: 'Vigília Pascal',
      sunday: parseReadings(stream.slice(vp.index + vp[0].length, end)),
    };
  }

  // Páscoa (Domingo da Ressurreição) — bloco com "ou"
  const pasc = [...stream.matchAll(new RegExp(flexRe('Páscoa Domingo da Ressurreição').source, 'gu'))][0];
  if (pasc) {
    const reflAll = [...stream.matchAll(new RegExp(M_REFL.source, 'gu'))].filter((m) => m.index > pasc.index);
    const refl = reflAll[0];
    const tail = stream.slice(pasc.index, refl ? refl.index : pasc.index + 900);
    const region = tail.slice(pasc[0].length);
    const afterMarker = region.split(new RegExp(M_READ.source, 'gu'))[1] ?? region;
    result[`${cycle.toLowerCase()}-pasc-dia`] = {
      key: `${cycle.toLowerCase()}-pasc-dia`,
      name: 'Domingo da Ressurreição — Páscoa',
      sunday: parseReadings(afterMarker.split(new RegExp(flexRe('Tarde de Páscoa').source, 'gu'))[0]),
    };
  }

  // Natal e Epifania (páginas iniciais de cada ano)
  const festivalAnchors = [
    ['nat-vigilia', 'Vigília de Natal', 'Natividade de Nosso Senhor Jesus Cristo'],
    ['nat-dia', 'Natividade de Nosso Senhor Jesus Cristo', 'Próprio III'],
    ['epif-dia', 'Epifania de Nosso Senhor Jesus Cristo', '7 de janeiro'],
  ];
  for (const [suffix, begin, stop] of festivalAnchors) {
    const b = [...stream.matchAll(new RegExp(flexRe(begin).source, 'gu'))][0];
    const stopRe = wordBoundStops.has(stop) ? flexWordRe(stop) : flexRe(stop);
    const s = [...stream.matchAll(new RegExp(stopRe.source, 'gu'))].find((m) => !b || m.index > b.index);
    if (!b) continue;
    const region = stream.slice(b.index + b[0].length, s ? s.index : b.index + 500);
    result[`${cycle.toLowerCase()}-${suffix}`] = {
      key: `${cycle.toLowerCase()}-${suffix}`,
      name: begin,
      sunday: parseReadings(region),
    };
  }
  // 1º e 2º domingos após o Natal
  const cutMarkers = [
    'Salmo diário', 'Cântico diário', 'Ano Novo', 'Dias do Natal',
    'Dias em torno', 'Epifania de Nosso Senhor Jesus Cristo', 'Dias em torno da Epifania',
  ].map((m) => new RegExp(flexRe(m).source, 'gu'));
  const cutAtNextSection = (r) => {
    let stop = r.length;
    for (const re of cutMarkers) {
      const m = [...r.matchAll(re)][0];
      if (m) stop = Math.min(stop, m.index);
    }
    return r.slice(0, stop);
  };
  const nat1 = [...stream.matchAll(new RegExp(flexRe('1º Domingo depois do Natal').source, 'gu'))][0];
  if (nat1) {
    result[`${cycle.toLowerCase()}-nat-1`] = {
      key: `${cycle.toLowerCase()}-nat-1`,
      name: '1º Domingo depois do Natal',
      sunday: parseReadings(cutAtNextSection(stream.slice(nat1.index + nat1[0].length, nat1.index + nat1[0].length + 450))),
    };
  }
  const nat2 = [...stream.matchAll(new RegExp(flexRe('Domingo entre 2 e 5 de janeiro').source, 'gu'))][0];
  if (nat2) {
    result[`${cycle.toLowerCase()}-nat-2`] = {
      key: `${cycle.toLowerCase()}-nat-2`,
      name: 'Domingo entre 2 e 5 de janeiro',
      sunday: parseReadings(cutAtNextSection(stream.slice(nat2.index + nat2[0].length, nat2.index + nat2[0].length + 450))),
    };
  }

  return result;
}

const all = {
  ...buildYear('A', 176, 248),
  ...buildYear('B', 249, 322),
  ...buildYear('C', 323, 396),
};

// ---------- Dias Santos, Comuns e Ocasiões (pp. 398–410) ----------
const MONTHS = {
  janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
  julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
};
const holyStream = [398, 399, 400, 401, 402, 404, 406, 408, 410].map((p) => pageMap.get(p) ?? '').join(' ');
const dateRe = /(\d{1,2})º?\s+de\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/gu;
const holyDays = {};
const dateMatches = [...holyStream.matchAll(dateRe)];
dateMatches.forEach((m, i) => {
  const start = m.index + m[0].length;
  const end = i + 1 < dateMatches.length ? dateMatches[i + 1].index : start + 450;
  const key = `${MONTHS[m[2]]}-${Number(m[1])}`;
  const readings = parseReadings(holyStream.slice(start, end));
  if (readings.length >= 2) holyDays[key] = readings;
});

// ---------- Comuns dos Santos, Ocasiões e O Antifonas (pp. 405–410) ----------

/** Remove cabeçalhos corridos e números de página das páginas de ocasiões. */
function stripRunningHeaders(text) {
  return text
    .replace(new RegExp(flex('Lecionário · Dias Santos e Ocasiões'), 'gu'), ' ')
    .replace(new RegExp(flex('Comuns dos Santos'), 'gu'), ' ')
    .replace(new RegExp(flex('Comemorações e Ocasiões Especiais'), 'gu'), ' ')
    .replace(/\s+(?:40[5-9]|410)\s+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Divide um fluxo de texto em seções por âncoras de título (com tolerância
 * ao espaçamento flexível do PDF) e extrai as referências de cada uma.
 * `expected` falha o build se a contagem de leituras divergir do livro.
 */
function parseAnchorSections(stream, anchors) {
  const located = anchors.map(([id, heading, expected, name, note]) => {
    const re = flexRe(heading);
    const m = [...stream.matchAll(new RegExp(re.source, 'gu'))][0];
    if (!m) throw new Error(`Âncora não encontrada: ${heading}`);
    return { id, heading, expected, name, note, index: m.index, len: m[0].length };
  });
  const out = {};
  located.forEach((sec, i) => {
    const start = sec.index + sec.len;
    const end = i + 1 < located.length ? located[i + 1].index : stream.length;
    const readings = parseReadings(stream.slice(start, end))
      .map((r) => ({ ...r, title: r.title.replace(/\s*A\s*n\s*o\s+[ABC]\s*$/u, '').trim() || 'Leitura designada' }));
    if (readings.length !== sec.expected) {
      throw new Error(`${sec.name}: esperava ${sec.expected} leituras, obteve ${readings.length} (${readings.map((r) => r.ref).join(' | ')})`);
    }
    out[sec.id] = {
      id: sec.id,
      name: sec.name,
      ...(sec.note ? { note: sec.note } : {}),
      readings,
    };
  });
  return out;
}

const COMMON_ANCHORS = [
  ['comum-martires', 'Comum dos Mártires', 3, 'Comum dos Mártires'],
  ['comum-missionarios', 'Comum dos Missionários', 4, 'Comum dos Missionários'],
  ['comum-pastores', 'Comum dos Pastores / Bispos', 4, 'Comum dos Pastores / Bispos'],
  ['comum-teologos', 'Comum dos Teólogos, Mestres e Confessores', 4, 'Comum dos Teólogos, Mestres e Confessores'],
  ['comum-comunidade', 'Comum dos Membros de Comunidade ou Ordem Religiosa', 4, 'Comum dos Membros de Comunidade ou Ordem Religiosa'],
  ['comum-reformadores', 'Comum dos Reformadores', 4, 'Comum dos Reformadores'],
  ['comum-santos', 'Comum dos Santos e Santas', 4, 'Comum dos Santos e Santas'],
];
const commons = parseAnchorSections(
  stripRunningHeaders([405, 406].map((p) => pageMap.get(p) ?? '').join(' ')),
  COMMON_ANCHORS,
);

const OCCASION_ANCHORS = [
  ['ocas-almas', 'Memorial de Todas as Almas', 7, 'Memorial de Todas as Almas', '2 de novembro'],
  ['ocas-natividade-maria', 'Natividade de Maria, mãe de nosso Senhor', 4, 'Natividade de Maria, mãe de nosso Senhor', '8 de setembro'],
  ['ocas-temporas-dezembro', 'Dias de Têmporas de dezembro', 4, 'Dias de Têmporas de dezembro', 'Depois do Dia de Santa Luzia'],
  ['ocas-temporas-quaresma', 'Dias de Têmporas da Quaresma', 4, 'Dias de Têmporas da Quaresma', 'Depois do 1º Domingo da Quaresma'],
  ['ocas-temporas-pentecostes', 'Dias de Têmporas de Pentecostes', 4, 'Dias de Têmporas de Pentecostes', 'Depois do Dia de Pentecostes'],
  ['ocas-temporas-setembro', 'Dias de Têmporas de setembro', 4, 'Dias de Têmporas de setembro', 'Depois do Dia da Santa Cruz'],
  ['ocas-rogacao', 'Dias de Rogação', 4, 'Dias de Rogação', 'Os três dias antes da Ascensão'],
  ['ocas-acao-gracas-a', 'Dia de Ação de Graças Ano A', 4, 'Dia de Ação de Graças — Ano A'],
  ['ocas-acao-gracas-b', 'Ano B', 4, 'Dia de Ação de Graças — Ano B'],
  ['ocas-acao-gracas-c', 'Ano C', 4, 'Dia de Ação de Graças — Ano C'],
  ['ocas-colheita', 'Ação de Graças pela Colheita', 4, 'Ação de Graças pela Colheita'],
  ['ocas-paz', 'Pela Paz', 4, 'Pela Paz'],
  ['ocas-missao', 'Pela Missão da Igreja', 4, 'Pela Missão da Igreja'],
  ['ocas-unidade', 'Pela Unidade da Igreja', 4, 'Pela Unidade da Igreja'],
  ['ocas-justica-social', 'Pela Justiça Social', 4, 'Pela Justiça Social'],
];
const occasionStream = stripRunningHeaders([407, 408, 409].map((p) => pageMap.get(p) ?? '').join(' '));
const oIntro = [...occasionStream.matchAll(new RegExp(flexRe('Antífonas Ó').source, 'gu'))][0];
const occasions = parseAnchorSections(
  oIntro ? occasionStream.slice(0, oIntro.index) : occasionStream,
  OCCASION_ANCHORS,
);

// O Antifonas (17 a 23 de dezembro). As datas chegam com dígitos e nomes de
// mês espaçados letra a letra; cada data real é seguida de "·".
const O_ANTIPHON_NAMES = {
  17: 'Ó Sabedoria',
  18: 'Ó Senhor do Poder',
  19: 'Ó Raiz de Jessé',
  20: 'Ó Chave de Davi',
  21: 'Ó Sol Nascente',
  22: 'Ó Desejado das Nações',
  23: 'Ó Emanuel',
};
const O_ANTIPHON_EXPECTED = { 17: 3, 18: 3, 19: 3, 20: 3, 21: 4, 22: 3, 23: 3 };
const flexWord = (w) =>
  w
    .split('')
    .map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*')
    .join('');
const oStream = stripRunningHeaders([409, 410].map((p) => pageMap.get(p) ?? '').join(' '));
const oDateRe = new RegExp(`(\\d)\\s*(\\d)?\\s*d\\s*e\\s+${flexWord('dezembro')}\\s*[·•]`, 'gu');
const oDates = [...oStream.matchAll(oDateRe)];
if (oDates.length !== 7) {
  throw new Error(`O Antifonas: esperava 7 datas, obteve ${oDates.length}`);
}
const oAntiphons = oDates.map((m, i) => {
  const day = Number(m[2] ? `${m[1]}${m[2]}` : m[1]);
  const start = m.index + m[0].length;
  const end = i + 1 < oDates.length ? oDates[i + 1].index : oStream.length;
  const readings = parseReadings(oStream.slice(start, end));
  if (readings.length !== O_ANTIPHON_EXPECTED[day]) {
    throw new Error(`O Antifona ${day}: esperava ${O_ANTIPHON_EXPECTED[day]} leituras, obteve ${readings.length}`);
  }
  if (!O_ANTIPHON_NAMES[day]) throw new Error(`Dia ${day} fora do intervalo 17–23 de dezembro`);
  return { day, name: O_ANTIPHON_NAMES[day], readings };
});

// ---------- Emissão ----------
const header = `/* GERADO AUTOMATICAMENTE por scripts/build-lectionary.mjs a partir do
 * Ofício Diário & Lecionário oficial da REB (PDF, pp. 175–410).
 * Não editar manualmente; atualize o extrator e rode: npm run build:lectionary
 */
`;
const payload = { lectionary: all, holyDays, commons, occasions, oAntiphons };
writeFileSync(
  'src/data/lectionaryData.generated.ts',
  `${header}export const LECTIONARY_GENERATED = ${JSON.stringify(payload, null, 1)} as const;\n`,
);

const counts = {};
for (const k of Object.keys(all)) counts[k[0]] = (counts[k[0]] || 0) + 1;
console.log('entradas por ano:', counts, 'total:', Object.keys(all).length);
console.log('dias santos:', Object.keys(holyDays).length);
console.log('comuns:', Object.keys(commons).length, 'ocasiões:', Object.keys(occasions).length, 'O antifonas:', oAntiphons.length);
console.log('amostra B-tc-25:', JSON.stringify(all['b-tc-25']?.sunday?.slice(0, 4), null, 1));
