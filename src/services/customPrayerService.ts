import { PrayerRequest, CustomPrayer } from '../types/customPrayers';
import { BookmarkItem } from '../types/bookmark';
import { getBookmarks } from './bookmarkService';

const REQUESTS_STORAGE_KEY = 'oficio_reb_prayer_requests';
const CUSTOM_PRAYERS_STORAGE_KEY = 'oficio_reb_custom_prayers';
const BOOKMARKS_STORAGE_KEY = 'oficio_reb_bookmarks';

const INITIAL_REQUESTS: PrayerRequest[] = [
  {
    id: 'req-sample-1',
    personOrIntention: 'Pela paz e harmonia em nossa família',
    details: 'Que o Senhor abençoe nosso lar com paciência, amor e união.',
    category: 'familia',
    createdAt: new Date().toLocaleDateString('pt-BR'),
    status: 'ativa'
  },
  {
    id: 'req-sample-2',
    personOrIntention: 'Pelos enfermos e necessitados de nossa comunidade',
    details: 'Que Deus derrame restauração e consolo aos que sofrem.',
    category: 'saude',
    createdAt: new Date().toLocaleDateString('pt-BR'),
    status: 'ativa'
  }
];

const INITIAL_CUSTOM_PRAYERS: CustomPrayer[] = [
  {
    id: 'prayer-sample-1',
    title: 'Oração de Entrega Matutina',
    text: 'Senhor meu Deus, coloco este dia sob a tua graça. Que em cada palavra, gesto e pensamento, eu reflita a tua compaixão e fidelidade. Protege a mim e aos que amo, e faz da nossa casa um lugar de bênção. Por Jesus Cristo, nosso Salvador. Amém.',
    authorOrSource: 'Oração Pessoal',
    createdAt: new Date().toLocaleDateString('pt-BR')
  }
];

export function getPrayerRequests(): PrayerRequest[] {
  try {
    const raw = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REQUESTS;
  }
}

export function savePrayerRequest(req: PrayerRequest): void {
  try {
    const current = getPrayerRequests();
    const idx = current.findIndex(r => r.id === req.id);
    let updated: PrayerRequest[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = req;
    } else {
      updated = [req, ...current];
    }
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_prayers_updated'));
  } catch (err) {
    console.error('Erro ao salvar pedido de oração:', err);
  }
}

export function removePrayerRequest(id: string): void {
  try {
    const current = getPrayerRequests();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_prayers_updated'));
  } catch (err) {
    console.error('Erro ao remover pedido de oração:', err);
  }
}

export function togglePrayerRequestStatus(id: string): void {
  try {
    const current = getPrayerRequests();
    const updated = current.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: r.status === 'ativa' ? ('respondida' as const) : ('ativa' as const)
        };
      }
      return r;
    });
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_prayers_updated'));
  } catch (err) {
    console.error('Erro ao alternar status do pedido de oração:', err);
  }
}

export function getCustomPrayers(): CustomPrayer[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PRAYERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CUSTOM_PRAYERS_STORAGE_KEY, JSON.stringify(INITIAL_CUSTOM_PRAYERS));
      return INITIAL_CUSTOM_PRAYERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CUSTOM_PRAYERS;
  }
}

export function saveCustomPrayer(prayer: CustomPrayer): void {
  try {
    const current = getCustomPrayers();
    const idx = current.findIndex(p => p.id === prayer.id);
    let updated: CustomPrayer[];
    if (idx >= 0) {
      updated = [...current];
      updated[idx] = prayer;
    } else {
      updated = [prayer, ...current];
    }
    localStorage.setItem(CUSTOM_PRAYERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_prayers_updated'));
  } catch (err) {
    console.error('Erro ao salvar oração pessoal:', err);
  }
}

export function removeCustomPrayer(id: string): void {
  try {
    const current = getCustomPrayers();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(CUSTOM_PRAYERS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('custom_prayers_updated'));
  } catch (err) {
    console.error('Erro ao remover oração pessoal:', err);
  }
}

export interface PrayersBackupData {
  version: number;
  exportedAt: string;
  requests: PrayerRequest[];
  customPrayers: CustomPrayer[];
  bookmarks: BookmarkItem[];
}

export function exportPrayersData(): string {
  const data: PrayersBackupData = {
    version: 2,
    exportedAt: new Date().toISOString(),
    requests: getPrayerRequests(),
    customPrayers: getCustomPrayers(),
    bookmarks: getBookmarks()
  };
  return JSON.stringify(data, null, 2);
}

export function importPrayersData(jsonString: string, mode: 'merge' | 'replace' = 'merge'): { 
  success: boolean; 
  requestsCount: number; 
  prayersCount: number; 
  bookmarksCount: number;
  error?: string 
} {
  try {
    const parsed = JSON.parse(jsonString) as Partial<PrayersBackupData>;
    const importedRequests = Array.isArray(parsed.requests) ? parsed.requests : [];
    const importedPrayers = Array.isArray(parsed.customPrayers) ? parsed.customPrayers : [];
    const importedBookmarks = Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [];

    if (importedRequests.length === 0 && importedPrayers.length === 0 && importedBookmarks.length === 0) {
      return { success: false, requestsCount: 0, prayersCount: 0, bookmarksCount: 0, error: 'O arquivo não contém pedidos, orações ou marcadores válidos.' };
    }

    let finalRequests: PrayerRequest[];
    let finalPrayers: CustomPrayer[];

    if (mode === 'replace') {
      finalRequests = importedRequests;
      finalPrayers = importedPrayers;
      if (importedBookmarks.length > 0) {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(importedBookmarks));
      }
    } else {
      // Merge by ID
      const currentReqs = getPrayerRequests();
      const reqMap = new Map(currentReqs.map(r => [r.id, r]));
      importedRequests.forEach(r => reqMap.set(r.id, r));
      finalRequests = Array.from(reqMap.values());

      const currentPrayers = getCustomPrayers();
      const prayerMap = new Map(currentPrayers.map(p => [p.id, p]));
      importedPrayers.forEach(p => prayerMap.set(p.id, p));
      finalPrayers = Array.from(prayerMap.values());

      if (importedBookmarks.length > 0) {
        const currentBookmarks = getBookmarks();
        const bMap = new Map(currentBookmarks.map(b => [b.id, b]));
        importedBookmarks.forEach(b => bMap.set(b.id, b));
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(bMap.values())));
      }
    }

    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(finalRequests));
    localStorage.setItem(CUSTOM_PRAYERS_STORAGE_KEY, JSON.stringify(finalPrayers));
    window.dispatchEvent(new Event('custom_prayers_updated'));
    if (importedBookmarks.length > 0) {
      window.dispatchEvent(new Event('bookmarks_updated'));
    }

    return {
      success: true,
      requestsCount: importedRequests.length,
      prayersCount: importedPrayers.length,
      bookmarksCount: importedBookmarks.length
    };
  } catch (err) {
    return {
      success: false,
      requestsCount: 0,
      prayersCount: 0,
      bookmarksCount: 0,
      error: 'Formato JSON inválido. Verifique o arquivo selecionado.'
    };
  }
}

