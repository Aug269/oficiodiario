import React, { useState } from 'react';
import { FAMILY_OFFICES, ADDITIONAL_PRAYERS } from '../data/liturgyData';
import { FamilyOffice } from '../types/liturgy';
import { SilenceTimer } from './SilenceTimer';
import { Users, Heart, Coffee } from 'lucide-react';

interface FamilyOfficeViewProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export const FamilyOfficeView: React.FC<FamilyOfficeViewProps> = ({ fontSize }) => {
  const [selectedSubOffice, setSelectedSubOffice] = useState<string>('manha');
  const [activeTab, setActiveTab] = useState<'oficios' | 'adicionais' | 'refeicoes'>('oficios');

  const currentOffice: FamilyOffice = FAMILY_OFFICES.find(o => o.id === selectedSubOffice) || FAMILY_OFFICES[0];

  const sizeClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose'
  }[fontSize];

  return (
    <article className={`max-w-3xl mx-auto py-8 px-4 sm:px-8 font-serif ${sizeClasses} text-stone-800 dark:text-stone-200`}>
      <header className="mb-8 text-center border-b border-stone-200/80 dark:border-stone-800 pb-6">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Devoção Pessoal e Doméstica
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Ofício para Famílias e Indivíduos
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          Formas breves destinadas à oração pessoal e familiar ao longo do dia, ordenando os momentos ao redor da Palavra de Deus.
        </p>

        {/* Sub-navigation tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('oficios')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'oficios'
                ? 'bg-[#4a153b] text-white shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            5 Momentos do Dia
          </button>
          <button
            onClick={() => setActiveTab('adicionais')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'adicionais'
                ? 'bg-[#4a153b] text-white shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Orações Adicionais
          </button>
          <button
            onClick={() => setActiveTab('refeicoes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'refeicoes'
                ? 'bg-[#4a153b] text-white shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            Às Refeições
          </button>
        </div>
      </header>

      {/* Mode 1: 5 Daily Moments */}
      {activeTab === 'oficios' && (
        <div>
          {/* Sub-selector for the 5 moments */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-8 p-1.5 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200/60 dark:border-stone-800">
            {FAMILY_OFFICES.map(off => (
              <button
                key={off.id}
                onClick={() => setSelectedSubOffice(off.id)}
                className={`px-3 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
                  selectedSubOffice === off.id
                    ? 'bg-white dark:bg-stone-800 text-[#4a153b] dark:text-rose-300 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {off.name}
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-bold text-[#4a153b] dark:text-rose-200">
              {currentOffice.name}
            </h2>
            <p className="text-xs font-sans text-stone-500 italic mt-0.5">{currentOffice.subtitle}</p>
          </div>

          <div className="space-y-6">
            {currentOffice.items.map(item => (
              <div key={item.id} className="my-4">
                {item.speaker && (
                  <p className="text-xs uppercase tracking-wider font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-1">
                    {item.speaker} {item.reference && `· ${item.reference}`}
                  </p>
                )}
                {item.type === 'scripture' && (
                  <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-stone-900/40 border border-amber-200/40 dark:border-stone-800">
                    <p className="italic text-stone-800 dark:text-stone-200">"{item.text}"</p>
                  </div>
                )}
                {item.type === 'collect' && (
                  <div className="p-4 rounded-xl bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                    <p className="text-stone-800 dark:text-stone-200">{item.text}</p>
                  </div>
                )}
                {item.type === 'together' && (
                  <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100">
                    {item.text}
                  </p>
                )}
                {item.type === 'leader' && (
                  <p className="text-stone-800 dark:text-stone-200">{item.text}</p>
                )}
              </div>
            ))}

            <SilenceTimer label="Silêncio e orações espontâneas da família" defaultSeconds={60} />
          </div>
        </div>
      )}

      {/* Mode 2: Additional Prayers */}
      {activeTab === 'adicionais' && (
        <div className="space-y-6">
          <p className="rubric mb-4">
            Orações para serem utilizadas livremente nos ofícios diários ou em momentos devocionais pessoais:
          </p>
          {ADDITIONAL_PRAYERS.filter(p => !p.title.includes('refeição')).map((prayer, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
            >
              <h3 className="text-base font-display font-bold text-[#4a153b] dark:text-rose-200 mb-2">
                {prayer.title}
              </h3>
              <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                {prayer.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Mode 3: Meal Prayers */}
      {activeTab === 'refeicoes' && (
        <div className="space-y-6">
          <p className="rubric mb-4">
            Orações tradicionais para a bênção da mesa antes das refeições:
          </p>
          {ADDITIONAL_PRAYERS.filter(p => p.title.includes('refeição')).map((prayer, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
            >
              <h3 className="text-base font-display font-bold text-[#b91c1c] dark:text-rose-400 mb-2">
                {prayer.title}
              </h3>
              <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-lg">
                {prayer.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
