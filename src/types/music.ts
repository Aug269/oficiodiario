export interface ChantNote {
  note: string; // e.g. "F4", "G4", "A4", "Bb4", "C5"
  duration: number; // in seconds (e.g. 0.8, 1.2)
  label: string; // "Entonação", "Corda de Recitação", "Mediação (*)", "Terminação"
}

export interface CanticleMusicMetadata {
  canticleId: string;
  toneName: string; // e.g. "Tom Salmódico VIII (Solene)", "Modo Ambrosiano / Te Deum"
  tradition: 'Canto Gregoriano' | 'Canto Anglicano' | 'Música Primitiva' | 'Hino Litúrgico';
  musicalKey: string; // e.g. "Fá Maior", "Sol Maior", "Ré Menor"
  recitingTone: string; // Note on which the verse is chanted, e.g. "Lá (A4)" or "Dó (C5)"
  suggestedChord: string; // e.g. "F", "Dm", "G", "C"
  chordFrequencies: number[]; // e.g. [174.61, 220.0, 261.63, 349.23] for F major church organ
  melodyNotes: ChantNote[];
  guideInstructions: string;
  externalAudioUrl?: string; // Optional custom audio URL
}
