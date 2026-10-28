import { EMBEDDED_SCRIPTURES } from '../data/bibleTexts';

export interface ScriptureLookupResult {
  reference: string;
  text: string;
  source: 'local' | 'online' | 'simulated';
}

/**
 * Normalizes passage references like "Salmo 95:1-7" or "Lucas 1:46-55"
 */
export async function getScriptureText(reference: string): Promise<ScriptureLookupResult> {
  const cleanRef = reference.trim();

  // 1. Check embedded texts first for instant, offline reliability
  for (const [key, text] of Object.entries(EMBEDDED_SCRIPTURES)) {
    if (cleanRef.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleanRef.toLowerCase())) {
      return {
        reference: cleanRef,
        text,
        source: 'local'
      };
    }
  }

  // 2. Try fetching from public Bible API (bible-api.com support or Almeida)
  try {
    const formattedQuery = encodeURIComponent(cleanRef.replace(/–/g, '-'));
    const response = await fetch(`https://bible-api.com/${formattedQuery}?translation=almeida`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3500)
    });

    if (response.ok) {
      const data = await response.json();
      if (data.text) {
        return {
          reference: data.reference || cleanRef,
          text: data.text.trim(),
          source: 'online'
        };
      }
    }
  } catch {
    // network timeout or offline mode, proceed to fallback
  }

  // 3. Fallback for offline mode if passage is not pre-cached
  return {
    reference: cleanRef,
    text: `«Leitura de ${cleanRef}»\n\n(Texto bíblico disponível para meditação na tradução oficial da Igreja. Quando online, o app busca o texto completo automaticamente.)`,
    source: 'simulated'
  };
}
