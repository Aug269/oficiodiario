import { CanticleMusicMetadata } from '../types/music';

// Frequency table for note names
export const NOTE_FREQUENCIES: Record<string, number> = {
  'C3': 130.81,
  'D3': 146.83,
  'E3': 164.81,
  'F3': 174.61,
  'G3': 196.00,
  'A3': 220.00,
  'Bb3': 233.08,
  'B3': 246.94,
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'Bb4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'D5': 587.33,
  'E5': 659.25,
  'F5': 698.46,
  'G5': 783.99,
};

export const CANTICLE_MUSIC_MAP: Record<string, CanticleMusicMetadata> = {
  // 1. Te Deum laudamus
  'te-deum': {
    canticleId: 'te-deum',
    toneName: 'Modo Ambrosiano / Solene',
    tradition: 'Música Primitiva',
    musicalKey: 'Fá Maior / Modo Lídio',
    recitingTone: 'Lá (A4)',
    suggestedChord: 'F (Fá - Lá - Dó)',
    chordFrequencies: [174.61, 261.63, 349.23, 440.00], // F3, C4, F4, A4
    melodyNotes: [
      { note: 'F4', duration: 0.6, label: 'Entonação' },
      { note: 'G4', duration: 0.6, label: 'Subida' },
      { note: 'A4', duration: 1.6, label: 'Corda de Recitação (1ª parte)' },
      { note: 'G4', duration: 0.8, label: 'Flexa' },
      { note: 'A4', duration: 1.2, label: 'Mediação no asterisco (*)' },
      { note: 'A4', duration: 1.6, label: 'Corda de Recitação (2ª parte)' },
      { note: 'G4', duration: 0.7, label: 'Cadência' },
      { note: 'F4', duration: 1.4, label: 'Terminação Final' }
    ],
    guideInstructions: 'Canta-se com solenidade e ritmo livre. Entoa-se a primeira metade de cada versículo no Lá; faz-se uma pausa de respiração no asterisco (*) e conclui-se a segunda metade descendo suavemente para o Fá.',
    externalAudioUrl: ''
  },

  // 2. Benedictus Dominus Deus (Cântico de Zacarias)
  'benedictus-dominus': {
    canticleId: 'benedictus-dominus',
    toneName: 'Tom Salmódico I (com mediação solene)',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Ré Menor / Modo Dórico',
    recitingTone: 'Lá (A4)',
    suggestedChord: 'Dm (Ré - Fá - Lá)',
    chordFrequencies: [146.83, 220.00, 293.66, 349.23, 440.00], // D3, A3, D4, F4, A4
    melodyNotes: [
      { note: 'F4', duration: 0.5, label: 'Entonação' },
      { note: 'G4', duration: 0.5, label: 'Entonação' },
      { note: 'A4', duration: 1.6, label: 'Recitação' },
      { note: 'Bb4', duration: 0.7, label: 'Inflexão' },
      { note: 'A4', duration: 1.2, label: 'Pausa no (*)' },
      { note: 'A4', duration: 1.4, label: 'Recitação (2ª parte)' },
      { note: 'G4', duration: 0.6, label: 'Cadência' },
      { note: 'F4', duration: 0.6, label: 'Cadência' },
      { note: 'D4', duration: 1.5, label: 'Terminação Final' }
    ],
    guideInstructions: 'O Cântico Evangélico da Manhã possui início solene com fórmula enriquecida nos dois primeiros versos. Cada frase apoia-se no tom Lá, com descanso no Ré final.',
    externalAudioUrl: ''
  },

  // 3. Magna et mirabilia (Cântico dos Redimidos)
  'magna-et-mirabilia': {
    canticleId: 'magna-et-mirabilia',
    toneName: 'Tom Salmódico IV',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Mi / Modo Frígio',
    recitingTone: 'Lá (A4)',
    suggestedChord: 'Am / Em',
    chordFrequencies: [164.81, 220.00, 329.63, 440.00], // E3, A3, E4, A4
    melodyNotes: [
      { note: 'C4', duration: 0.6, label: 'Entonação' },
      { note: 'D4', duration: 0.6, label: 'Entonação' },
      { note: 'E4', duration: 0.6, label: 'Entonação' },
      { note: 'A4', duration: 1.8, label: 'Corda de Recitação' },
      { note: 'G4', duration: 0.8, label: 'Mediação no (*)' },
      { note: 'A4', duration: 1.6, label: 'Segunda Metade' },
      { note: 'G4', duration: 0.7, label: 'Cadência' },
      { note: 'F4', duration: 0.7, label: 'Preparação' },
      { note: 'E4', duration: 1.4, label: 'Resolução Frígia' }
    ],
    guideInstructions: 'Ideal para os tempos do Advento e Páscoa. Tom contemplativo de majestade com terminação típica do quarto modo no Mi.',
    externalAudioUrl: ''
  },

  // 4. Surge, illuminare (Levanta-te, resplandece)
  'surge-illuminare': {
    canticleId: 'surge-illuminare',
    toneName: 'Tom Salmódico V (Epifania)',
    tradition: 'Canto Anglicano',
    musicalKey: 'Dó Maior / Modo Lídio',
    recitingTone: 'Dó (C5)',
    suggestedChord: 'C (Dó - Mi - Sol)',
    chordFrequencies: [130.81, 196.00, 261.63, 329.63, 523.25], // C3, G3, C4, E4, C5
    melodyNotes: [
      { note: 'F4', duration: 0.5, label: 'Entonação' },
      { note: 'A4', duration: 0.5, label: 'Subida' },
      { note: 'C5', duration: 1.8, label: 'Recitação Radiante' },
      { note: 'D5', duration: 0.8, label: 'Mediação no (*)' },
      { note: 'C5', duration: 1.5, label: 'Recitação (2ª parte)' },
      { note: 'Bb4', duration: 0.7, label: 'Descida' },
      { note: 'A4', duration: 0.7, label: 'Cadência' },
      { note: 'F4', duration: 1.5, label: 'Terminação Iluminada' }
    ],
    guideInstructions: 'Cântico festivo e brilhante da luz divina. As notas altas no Dó simbolizam a estrela da Epifania e a aurora da salvação.',
    externalAudioUrl: ''
  },

  // 5. Kyrie Pantokrator (Cântico de Penitência - Manassés)
  'kyrie-pantokrator': {
    canticleId: 'kyrie-pantokrator',
    toneName: 'Tom Salmódico II (Penitencial)',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Ré Menor / Modo Hipodórico',
    recitingTone: 'Fá (F4)',
    suggestedChord: 'Dm (Profundo e suave)',
    chordFrequencies: [146.83, 220.00, 293.66, 349.23], // D3, A3, D4, F4
    melodyNotes: [
      { note: 'C4', duration: 0.6, label: 'Humildade' },
      { note: 'D4', duration: 0.6, label: 'Entonação' },
      { note: 'F4', duration: 1.8, label: 'Recitação Súplica' },
      { note: 'E4', duration: 0.8, label: 'Mediação no (*)' },
      { note: 'F4', duration: 1.5, label: 'Recitação (2ª parte)' },
      { note: 'E4', duration: 0.7, label: 'Súplica' },
      { note: 'C4', duration: 0.7, label: 'Cadência' },
      { note: 'D4', duration: 1.6, label: 'Repouso Penitencial' }
    ],
    guideInstructions: 'Canto sóbrio e contrito da Quaresma. O andamento deve ser lento e orante, enfatizando o pedido sincero de perdão.',
    externalAudioUrl: ''
  },

  // 6. Cantate Domino (Salmo 98)
  'cantate-domino': {
    canticleId: 'cantate-domino',
    toneName: 'Tom Salmódico VI (Triunfal)',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Fá Maior',
    recitingTone: 'Lá (A4)',
    suggestedChord: 'F (Alegre e sonoro)',
    chordFrequencies: [174.61, 261.63, 349.23, 440.00, 523.25], // F3, C4, F4, A4, C5
    melodyNotes: [
      { note: 'F4', duration: 0.5, label: 'Entonação Viva' },
      { note: 'G4', duration: 0.5, label: 'Entonação' },
      { note: 'A4', duration: 1.6, label: 'Recitação' },
      { note: 'Bb4', duration: 0.6, label: 'Inflexão' },
      { note: 'A4', duration: 1.2, label: 'Mediação no (*)' },
      { note: 'A4', duration: 1.4, label: 'Segunda Metade' },
      { note: 'G4', duration: 0.6, label: 'Cadência' },
      { note: 'Bb4', duration: 0.6, label: 'Júbilo' },
      { note: 'A4', duration: 0.6, label: 'Preparação' },
      { note: 'F4', duration: 1.5, label: 'Terminação Festiva' }
    ],
    guideInstructions: 'Cântico pascal de vitória e exultação. As palmas dos rios e o canto das montanhas pedem vigor rítmico alegre.',
    externalAudioUrl: ''
  },

  // 7. Benedicite, omnia opera Domini (Cântico da Criação)
  'benedicite': {
    canticleId: 'benedicite',
    toneName: 'Tom Salmódico VIII (Solenidade Cósmica)',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Sol Maior / Modo Mixolídio',
    recitingTone: 'Dó (C5)',
    suggestedChord: 'G (Sol - Si - Ré)',
    chordFrequencies: [196.00, 246.94, 293.66, 392.00, 523.25], // G3, B3, D4, G4, C5
    melodyNotes: [
      { note: 'G4', duration: 0.5, label: 'Início' },
      { note: 'A4', duration: 0.5, label: 'Subida' },
      { note: 'C5', duration: 1.8, label: 'Recitação da Obra' },
      { note: 'D5', duration: 0.8, label: 'Mediação no (*)' },
      { note: 'C5', duration: 1.6, label: 'Resposta: louvai-o e exaltai-o' },
      { note: 'B4', duration: 0.7, label: 'Cadência' },
      { note: 'A4', duration: 0.7, label: 'Preparação' },
      { note: 'G4', duration: 1.6, label: 'Para sempre. Amém.' }
    ],
    guideInstructions: 'Estrutura responsorial com estribilho cósmico repetido. O tom sustenta a chamada e a resposta universal de louvor.',
    externalAudioUrl: ''
  },

  // 8. Magnificat (Ofício Vespertino - Lucas 1:46-55)
  'magnificat': {
    canticleId: 'magnificat',
    toneName: 'Tom Salmódico VIII (Solene)',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Sol Maior / Modo Mixolídio',
    recitingTone: 'Dó (C5)',
    suggestedChord: 'G / C',
    chordFrequencies: [196.00, 261.63, 392.00, 523.25], // G3, C4, G4, C5
    melodyNotes: [
      { note: 'G4', duration: 0.6, label: 'Entonação Magna' },
      { note: 'A4', duration: 0.6, label: 'Subida' },
      { note: 'C5', duration: 1.8, label: 'Recitação' },
      { note: 'D5', duration: 0.8, label: 'Mediação no (*)' },
      { note: 'C5', duration: 1.6, label: 'Recitação (2ª parte)' },
      { note: 'B4', duration: 0.7, label: 'Cadência' },
      { note: 'A4', duration: 0.7, label: 'Preparação' },
      { note: 'G4', duration: 1.5, label: 'Repouso Final' }
    ],
    guideInstructions: 'O grande Cântico da Virgem Maria na Oração da Tarde. Entoa-se com reverência e profunda alegria na encarnação.',
    externalAudioUrl: ''
  },

  // 9. Nunc Dimittis (Ofício Vespertino e Completas - Lucas 2:29-32)
  'nunc-dimittis': {
    canticleId: 'nunc-dimittis',
    toneName: 'Tom Salmódico III (Paz Noturna)',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Lá Menor / Modo Frígio',
    recitingTone: 'Dó (C5)',
    suggestedChord: 'Am (Lá - Dó - Mi)',
    chordFrequencies: [164.81, 220.00, 261.63, 329.63], // E3, A3, C4, E4
    melodyNotes: [
      { note: 'A4', duration: 0.6, label: 'Entonação Serena' },
      { note: 'C5', duration: 1.8, label: 'Recitação em Paz' },
      { note: 'B4', duration: 0.7, label: 'Mediação no (*)' },
      { note: 'C5', duration: 1.6, label: 'Recitação (2ª parte)' },
      { note: 'B4', duration: 0.7, label: 'Cadência' },
      { note: 'A4', duration: 1.4, label: 'Paz do Senhor' }
    ],
    guideInstructions: 'Cântico do idoso Simeão ao despedir o dia em paz. Melodia doce, calma e propícia para a hora de dormir.',
    externalAudioUrl: ''
  },

  // 10. Phos Hilaron (Alegre Luz - Ofício Vespertino)
  'phos-hilaron': {
    canticleId: 'phos-hilaron',
    toneName: 'Hino Tradicional da Luz / Lucernário',
    tradition: 'Música Primitiva',
    musicalKey: 'Ré / Modo Hipodórico',
    recitingTone: 'Fá (F4)',
    suggestedChord: 'Dm / F',
    chordFrequencies: [146.83, 220.00, 293.66, 349.23, 440.00], // D3, A3, D4, F4, A4
    melodyNotes: [
      { note: 'D4', duration: 0.6, label: 'Ao acender da luz' },
      { note: 'F4', duration: 1.6, label: 'Alegre luz pura' },
      { note: 'G4', duration: 0.8, label: 'Resplendor' },
      { note: 'A4', duration: 1.2, label: 'Glória imortal (*)' },
      { note: 'F4', duration: 1.6, label: 'Pai Santo e bendito' },
      { note: 'E4', duration: 0.8, label: 'Jesus Cristo' },
      { note: 'D4', duration: 1.5, label: 'Amém' }
    ],
    guideInstructions: 'Um dos hinos cristãos mais antigos da Igreja (século III). Entoado ao pôr do sol quando as lâmpadas são acesas na igreja.',
    externalAudioUrl: ''
  }
};
