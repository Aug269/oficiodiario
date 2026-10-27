// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';

// jsdom não implementa matchMedia nem standalone: usados pelo botão de instalação PWA.
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

import App from './App';

// Habilita o ambiente de act do React 19 para os testes em jsdom.
(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

async function renderApp(): Promise<HTMLElement> {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(React.createElement(App));
  });
  // Aguarda o carregamento assíncrono do chunk do lecionário.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
  });
  return container;
}

async function waitForText(container: HTMLElement, text: string, tries = 20): Promise<void> {
  for (let i = 0; i < tries; i += 1) {
    if ((container.textContent ?? '').includes(text)) return;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
  }
  throw new Error(`texto \"${text}\" não apareceu após ${tries} tentativas`);
}

function clickByText(container: HTMLElement, text: string) {
  const button = [...container.querySelectorAll('button')].find((b) =>
    (b.textContent ?? '').includes(text),
  );
  if (!button) throw new Error(`botão "${text}" não encontrado`);
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
}

describe('montagem do aplicativo (smoke test)', () => {
  it('renderiza marca, cabeçalho litúrgico e navegação principal', async () => {
    const container = await renderApp();
    expect(container.textContent).toContain('Ofício Diário');
    expect(container.textContent).toContain('Rede Episcopal Brasileira');
    expect(container.textContent).toContain('Ofício Tradicional');
    expect(container.textContent).toContain('Coletas');
    expect(container.textContent).toContain('Calendário');
  });

  it('exibe o Ofício Matutino com rubricas, povo em negrito e lecionário', async () => {
    const container = await renderApp();
    clickByText(container, 'Matutino');
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(container.textContent).toContain('Ofício Matutino');
    expect(container.textContent).toContain('Lecionário do Dia');
    expect(container.querySelectorAll('.rubric').length).toBeGreaterThan(3);
    // As respostas da assembleia ficam em negrito via utilitário tipográfico.
    expect(container.querySelectorAll('.font-bold, .font-semibold').length).toBeGreaterThan(3);
  });

  it('navega para o calendário e calcula a tábua perpétua 2026–2075', async () => {
    const container = await renderApp();
    clickByText(container, 'Calendário');
    expect(container.textContent).toContain('Calendário do Ano Cristão');
    clickByText(container, 'Tábua de Datas Móveis');
    expect(container.textContent).toContain('2075');
    expect(container.textContent).toContain('2026');
    expect(container.textContent).toContain('Próprio');
  });

  it('navega para Comuns e Ocasiões e mostra os três blocos do lecionário', async () => {
    const container = await renderApp();
    clickByText(container, 'Ocasiões');
    expect(container.textContent).toContain('Comuns e Ocasiões');
    // Aguarda o carregamento assíncrono do chunk do lecionário.
    await waitForText(container, 'Comum dos Mártires');
    clickByText(container, 'O Antifonas');
    expect(container.textContent).toContain('Ó Emanuel');
    expect(container.textContent).toContain('23 de dezembro');
    clickByText(container, 'Ocasiões Especiais');
    expect(container.textContent).toContain('Pela Justiça Social');
  });

  it('exibe o Credo Apostólico na visão de Famílias e Indivíduos', async () => {
    const container = await renderApp();
    clickByText(container, 'Famílias');
    clickByText(container, 'Credo Apostólico');
    expect(container.textContent).toContain('Creio em Deus Pai Todo-Poderoso');
    expect(container.textContent).toContain('Comunhão dos Santos');
  });

  it('alterna para o catálogo de coletas com busca funcional', async () => {
    const container = await renderApp();
    clickByText(container, 'Coletas');
    expect(container.textContent).toContain('Coletas da Igreja');
    const input = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    await act(async () => {
      input.value = 'Pentecostes';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(container.textContent).toContain('Pentecostes');
  });
});
