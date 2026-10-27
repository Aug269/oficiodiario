export interface LiturgicalItem {
  id: string;
  type: 'rubric' | 'leader' | 'people' | 'together' | 'heading' | 'subheading' | 'scripture' | 'silence' | 'versicle' | 'collect';
  text: string;
  speaker?: string; // e.g., "Quem oficia", "Povo", "Todos", "Leitor(a)"
  reference?: string; // e.g. "Salmo 95:1-7"
  note?: string;
  options?: {
    label: string;
    items: LiturgicalItem[];
  }[];
}

export interface CanonicalHour {
  id: 'matutino' | 'meio-dia' | 'vespertino' | 'completas';
  name: string;
  subtitle: string;
  traditionalTime: string;
  iconName: string;
  items: LiturgicalItem[];
}

export interface FamilyOffice {
  id: 'manha' | 'meio-dia' | 'entardecer' | 'anoitecer' | 'fim-do-dia';
  name: string;
  subtitle: string;
  items: LiturgicalItem[];
}

export interface WeeklyOffice {
  dayOfWeek: number; // 0 = Domingo, 1 = Segunda, ... 6 = Sábado
  name: string;
  theme: string;
  opening: string;
  openingResponse: string;
  openingRef?: string;
  prayer: string;
}

export interface Canticle {
  id: string;
  latinTitle: string;
  portugueseTitle: string;
  seasonRecommendation: string;
  reference: string;
  verses: { call: string; response: string }[];
}
