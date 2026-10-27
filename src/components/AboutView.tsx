import React from 'react';
import { BookMarked, ShieldCheck, HeartHandshake, FileText } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-8 font-serif leading-relaxed text-stone-800 dark:text-stone-200">
      <header className="mb-10 text-center border-b border-stone-200/80 dark:border-stone-800 pb-8">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Introdução Litúrgica
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Sobre o Ofício Diário & Lecionário
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2">
          Segundo o uso da Rede Episcopal Brasileira (REB)
        </p>
      </header>

      {/* Presentation */}
      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-display font-semibold text-[#4a153b] dark:text-rose-200">
          Uma Tradição de Oração Contínua
        </h2>
        <p>
          Uma das grandes riquezas da tradição anglicana é sua prática de oração contínua. Ao longo dos séculos, os anglicanos têm encontrado no Ofício Diário uma forma de ordenar a oração cotidiana, santificando as horas do dia e vivendo em comunhão com a Igreja ao longo do Ano Litúrgico.
        </p>
        <p>
          O Ofício Diário está organizado em quatro movimentos: <em>preparação, adoração, audição e oração</em>. Começamos preparando o coração para estar diante de Deus: reconhecemos nossos pecados, recebemos sua misericórdia e oferecemos nosso louvor. Em seguida, ouvimos a sua Palavra nas Escrituras, confessamos a fé da Igreja e reunimos diante de Deus nossas intercessões, súplicas e ações de graças.
        </p>
      </section>

      {/* The 3 forms */}
      <section className="grid sm:grid-cols-3 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <h3 className="font-display font-bold text-base text-[#4a153b] dark:text-rose-200 mb-1">
            Ofício Tradicional
          </h3>
          <p className="text-xs font-sans text-stone-600 dark:text-stone-400 leading-normal">
            Segue a estrutura histórica dos Livros de Oração Comum (Matutino, Meio-Dia, Vespertino e Completas). Especialmente apropriado para a oração comunitária e pessoal.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <h3 className="font-display font-bold text-base text-[#4a153b] dark:text-rose-200 mb-1">
            Famílias e Indivíduos
          </h3>
          <p className="text-xs font-sans text-stone-600 dark:text-stone-400 leading-normal">
            Reúne formas mais breves destinadas à oração pessoal e doméstica em 5 momentos do dia, além de orações para refeições e súplicas adicionais.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <h3 className="font-display font-bold text-base text-[#4a153b] dark:text-rose-200 mb-1">
            Ofício para a Semana
          </h3>
          <p className="text-xs font-sans text-stone-600 dark:text-stone-400 leading-normal">
            Apresenta uma forma breve e fixa com tema teológico específico para cada dia da semana, de domingo a sábado.
          </p>
        </div>
      </section>

      {/* Certificate & Credits */}
      <section className="my-8 p-6 rounded-2xl bg-amber-50/50 dark:bg-stone-900/40 border border-amber-200/60 dark:border-stone-800 text-sm">
        <div className="flex items-center gap-2 text-[#4a153b] dark:text-rose-300 mb-3">
          <ShieldCheck className="w-5 h-5 text-[#b91c1c] dark:text-rose-400" />
          <h3 className="font-display font-bold text-base">Certificado Diocesano & Créditos</h3>
        </div>
        <p className="italic text-stone-700 dark:text-stone-300">
          "Certifico que esta edição do OFÍCIO DIÁRIO & LECIONÁRIO foi recomendada pelo Bispo Diocesano e aprovada pelo Conselho Diocesano da Rede Episcopal Brasileira, uma Província de Tradição Anglicana, e está em conformidade com o <em>jus liturgicum</em> para uso nos cultos públicos e em devoções pessoais."
        </p>
        <p className="mt-2 font-bold text-stone-800 dark:text-stone-200">
          Rev. Douglas de Araujo Silva +
        </p>
        <p className="text-xs font-sans text-stone-500">
          Custódio do Livro Padrão de Oração Comum e Presidente da Comissão de Liturgia
        </p>
        <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800 text-xs font-sans text-stone-500 space-y-1">
          <p>ISBN: 978-65-02-40661-8 · © Rede Episcopal Brasileira</p>
          <p>Lecionário: Revised Common Lectionary Expanded Daily Readings, copyright © 2024 Consultation on Common Texts.</p>
        </div>
      </section>

      {/* Edição integral em PDF, pré-armazenada para consulta offline */}
      <section className="my-8 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="p-3 rounded-xl bg-[#4a153b]/10 text-[#4a153b] dark:text-rose-300 shrink-0">
          <FileText className="w-6 h-6" />
        </span>
        <div className="flex-1">
          <h3 className="font-display font-bold text-base text-[#4a153b] dark:text-rose-200 mb-1">
            Livro integral em PDF
          </h3>
          <p className="text-xs font-sans text-stone-500 dark:text-stone-400 leading-relaxed">
            O texto integral do Ofício Diário &amp; Lecionário (410 páginas) fica armazenado no aplicativo e
            pode ser consultado mesmo sem internet.
          </p>
        </div>
        <a
          href="/assets/oficio-diario-lecionario-reb.pdf"
          target="_blank"
          rel="noopener"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4a153b] hover:bg-[#5a1b49] text-white font-sans text-xs font-semibold transition-colors"
        >
          <BookMarked className="w-4 h-4" />
          Abrir PDF
        </a>
      </section>
    </article>
  );
};
