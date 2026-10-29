export interface BookmarkItem {
  id: string;
  officeId: string; // e.g. 'matutino' | 'meio-dia' | 'vespertino' | 'completas' | 'familias' | 'semana'
  officeTitle: string;
  sectionTitle: string;
  snippet: string;
  savedAt: string;
  note?: string;
}
