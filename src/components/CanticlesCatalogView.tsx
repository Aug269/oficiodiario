import React, { useState } from 'react';
import { CANTICLES } from '../data/liturgyData';
import { Canticle } from '../types/liturgy';
import { Music, Sparkles } from 'lucide-react';

interface CanticlesCatalogViewProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export const CanticlesCatalogView: React.FC<CanticlesCatalogViewProps> = ({ fontSize }) => {
  const [selectedId, setSelectedId] = useState<string>(CANTICLES[0].id);

  const current: Canticle = CANTICLES.find(c => c.id === selectedId) || CANTICLES[0];

  const sizeClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose'
  }[fontSize];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-8 font-serif">
      <header className="mb-8 text-center border-b border-stone-200/80 dark:border-stone-800 pb-6">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Louvor e Salmodia
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Cânticos Suplementares
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          Cânticos bíblicos e patrísticos para enriquecer a Oração da Manhã, Oração da Tarde e vigílias do Ano Litúrgico.
        </p>

        {/* Canticle pills selector */}
        <div className="mt-6 flex flex-wrap gap-1.5 justify-center">
          {CANTICLES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                selectedId === c.id
                  ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/70'
              }`}
            >
              {c.latinTitle}
            </button>
          ))}
        </div>
      </header>

      {/* Selected Canticle View */}
      <article className="max-w-2xl mx-auto p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm">
        <div className="text-center pb-6 border-b border-stone-100 dark:border-stone-800 mb-6">
          <p className="rubric mb-1">{current.seasonRecommendation}</p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-200">
            {current.latinTitle}
          </h2>
          <p className="text-sm font-sans text-stone-500 italic mt-0.5">({current.portugueseTitle})</p>
          <span className="inline-block mt-2 text-xs font-sans text-stone-400">
            {current.reference}
          </span>
        </div>

        <div className={`space-y-4 ${sizeClasses} text-stone-800 dark:text-stone-200`}>
          {current.verses.map((v, i) => (
            <div key={i} className="space-y-1">
              <p className="leading-snug">{v.call} <span className="text-[#b91c1c] font-bold">*</span></p>
              <p className="pl-4 font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {v.response}
              </p>
            </div>
          ))}

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 text-center font-bold text-sm font-sans text-stone-500">
            Glória ao Pai e ao Filho e ao Espírito Santo; * como era no princípio, é agora e será sempre, por todos os séculos. Amém.
          </div>
        </div>
      </article>
    </div>
  );
};
