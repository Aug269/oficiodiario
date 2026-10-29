export type PrayerCategory = 
  | 'saude' 
  | 'familia' 
  | 'igreja' 
  | 'amigos' 
  | 'trabalho' 
  | 'gratidao' 
  | 'outros';

export interface PrayerRequest {
  id: string;
  personOrIntention: string;
  details?: string;
  category: PrayerCategory;
  createdAt: string;
  status: 'ativa' | 'respondida';
  answerNote?: string;
}

export interface CustomPrayer {
  id: string;
  title: string;
  text: string;
  authorOrSource?: string;
  createdAt: string;
}
