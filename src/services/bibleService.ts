import { EMBEDDED_SCRIPTURES } from '../data/bibleTexts';

export interface ScriptureLookupResult {
  reference: string;
  text: string;
  source: 'local' | 'online' | 'simulated';
}

const BOOK_ALIASES: Record<string, string> = {
  Salmos: 'Salmo',
};

/** Extrai livro e capítulo inicial de uma referência, ex.: "Salmo 34:1–8, (19–22)". */
function parseReference(reference: string): { book: string; chapter?: number } {
  const cleaned = reference.replace(/[()]/g, ' ').trim();
  const match = cleaned.match(/^(\d?\s?[A-Za-zÀ-ÿ.]+(?:\s[A-Za-zÀ-ÿ.]+)*?)\s*(\d{1,3})?/u);
  if (!match) return { book: cleaned };
  const rawBook = match[1].trim();
  const book = BOOK_ALIASES[rawBook] ?? rawBook;
  return { book, chapter: match[2] ? Number(match[2]) : undefined };
}

/**
 * Localiza um texto embutido pelo livro + capítulo, tolerando diferenças de
 * intervalo de versículos (ex.: "Salmo 51:1-17" aproveita "Salmo 51:1-12").
 */
function findEmbedded(reference: string): string | undefined {
  const target = parseReference(reference);

  // 1. Chave exata.
  const exactKey = Object.keys(EMBEDDED_SCRIPTURES).find(
    (key) => key.toLowerCase() === reference.trim().toLowerCase(),
  );
  if (exactKey) return EMBEDDED_SCRIPTURES[exactKey];

  // 2. Mesmo livro e capítulo (com ou sem intervalo de versículos).
  for (const [key, text] of Object.entries(EMBEDDED_SCRIPTURES)) {
    const candidate = parseReference(key);
    if (
      candidate.book.toLowerCase() === target.book.toLowerCase() &&
      candidate.chapter !== undefined &&
      candidate.chapter === target.chapter
    ) {
      return text;
    }
  }
  return undefined;
}

/** Normaliza a referência para a API pública (travessões e parênteses). */
function toApiQuery(reference: string): string {
  return encodeURIComponent(
    reference
      .replace(/[–—]/g, '-')
      .replace(/[()]/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

/**
 * Recupera o texto integral de uma passagem:
 * 1. banco local embutido (instantâneo e offline);
 * 2. API pública de Bíblia quando há conexão;
 * 3. fallback reverente offline, com a referência preservada.
 */
export async function getScriptureText(reference: string): Promise<ScriptureLookupResult> {
  const cleanRef = reference.trim();

  const local = findEmbedded(cleanRef);
  if (local) {
    return { reference: cleanRef, text: local, source: 'local' };
  }

  try {
    const response = await fetch(`https://bible-api.com/${toApiQuery(cleanRef)}?translation=almeida`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3500),
    });

    if (response.ok) {
      const data = await response.json();
      if (typeof data.text === 'string' && data.text.trim()) {
        return {
          reference: data.reference || cleanRef,
          text: data.text.trim(),
          source: 'online',
        };
      }
    }
  } catch {
    // Sem rede ou tempo esgotado: usa o fallback offline.
  }

  return {
    reference: cleanRef,
    text:
      `«Leitura de ${cleanRef}»\n\n` +
      'O texto integral desta passagem é meditado na tradução oficial utilizada pela Igreja. ' +
      'As referências completas do Lecionário estão disponíveis offline; quando o dispositivo ' +
      'estiver conectado, o texto bíblico será carregado automaticamente aqui.',
    source: 'simulated',
  };
}
