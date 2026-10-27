/**
 * Calendário dos Dias Santos e Comemorações (pp. 145–169 do livro).
 *
 * Dados gerados por scripts/build-commemorations.mjs a partir do PDF oficial.
 * O livro declara as comemorações anglicanas e ecumênicas como opcionais; os
 * Dias Santos de letra vermelha já são conduzidos pelo motor litúrgico e aqui
 * aparecem apenas para completar o calendário impresso.
 */
import { COMMEMORATIONS_GENERATED, GeneratedCommemoration } from './commemorationsData.generated';

export type Commemoration = GeneratedCommemoration;

const BY_KEY = new Map<string, Commemoration[]>();
for (const entry of COMMEMORATIONS_GENERATED) {
  const key = `${entry.month}-${entry.day}`;
  const list = BY_KEY.get(key);
  if (list) list.push(entry);
  else BY_KEY.set(key, [entry]);
}

/** Comemorações de uma data fixa (mês 0-indexado, como em Date#getMonth). */
export function getCommemorationsForDate(month: number, day: number): Commemoration[] {
  return BY_KEY.get(`${month}-${day}`) ?? [];
}

/** Todas as entradas de um mês, em ordem de dia. */
export function getCommemorationsForMonth(month: number): Commemoration[] {
  return COMMEMORATIONS_GENERATED.filter((c) => c.month === month);
}

/** Total de entradas catalogadas, útil para testes. */
export function getCommemorationCount(): number {
  return COMMEMORATIONS_GENERATED.length;
}
