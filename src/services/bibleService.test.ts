import { describe, it, expect } from 'vitest';
import { getScriptureText } from './bibleService';

describe('serviço bíblico', () => {
  it('resolve chave exata do banco local', async () => {
    const result = await getScriptureText('Salmo 23');
    expect(result.source).toBe('local');
    expect(result.text).toContain('meu pastor');
  });

  it('aproveita o texto embutido pelo livro e capítulo, variando os versículos', async () => {
    const result = await getScriptureText('Salmo 51:1-17');
    expect(result.source).toBe('local');
    expect(result.reference).toBe('Salmo 51:1-17');
  });

  it('normaliza nome plural do livro (Salmos → Salmo)', async () => {
    const result = await getScriptureText('Salmos 121');
    expect(result.source).toBe('local');
  });

  it('retorna fallback reverente e nunca lança erro sem conexão', async () => {
    const result = await getScriptureText('Amós 7:1–9');
    expect(['local', 'online', 'simulated']).toContain(result.source);
    expect(result.text.length).toBeGreaterThan(20);
    expect(result.reference).toContain('Amós');
  });
});
