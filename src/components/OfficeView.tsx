import React, { useState, useEffect } from 'react';
import { CanonicalHour, LiturgicalItem } from '../types/liturgy';
import { LiturgicalDayInfo } from '../services/liturgicalCalendar';
import { ALL_COLLECTS } from '../data/collectsData';
import { getLectionaryForDay, LectionaryDay } from '../data/lectionaryData';
import { getScriptureText, ScriptureLookupResult } from '../services/bibleService';
import { SilenceTimer } from './SilenceTimer';
import { BookOpen, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface OfficeViewProps {
  hour: CanonicalHour;
  liturgicalInfo: LiturgicalDayInfo;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export const OfficeView: React.FC<OfficeViewProps> = ({
  hour,
  liturgicalInfo,
  fontSize
}) => {
  const [expandedReading, setExpandedReading] = useState<string | null>(null);
  const [scriptureTexts, setScriptureTexts] = useState<Record<string, ScriptureLookupResult>>({});
  const [loadingReading, setLoadingReading] = useState<string | null>(null);
  const [lectionary, setLectionary] = useState<LectionaryDay | null>(null);

  // Leituras do dia pelo Lecionário Comum Revisado Expandido (gerado do livro REB).
  // O acervo completo é carregado sob demanda (chunk separado, offline pelo SW).
  useEffect(() => {
    let cancelled = false;
    getLectionaryForDay(liturgicalInfo).then((result) => {
      if (!cancelled) setLectionary(result);
    });
    return () => {
      cancelled = true;
    };
  }, [liturgicalInfo]);

  // Today's specific collect
  const dayCollect = ALL_COLLECTS.find(c => c.id === liturgicalInfo.collectId) ||
    ALL_COLLECTS.find(c => c.id === 'col-tc-proprio-25') ||
    ALL_COLLECTS[0];

  const loadScripture = async (cacheKey: string, ref: string) => {
    if (expandedReading === cacheKey) {
      setExpandedReading(null);
      return;
    }
    setExpandedReading(cacheKey);
    if (!scriptureTexts[cacheKey]) {
      setLoadingReading(cacheKey);
      const res = await getScriptureText(ref);
      setScriptureTexts(prev => ({ ...prev, [cacheKey]: res }));
      setLoadingReading(null);
    }
  };

  // Font size multiplier
  const sizeClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose'
  }[fontSize];

  return (
    <article className={`max-w-3xl mx-auto py-8 px-4 sm:px-8 font-serif ${sizeClasses} text-stone-800 dark:text-stone-200 transition-all`}>
      {/* Office Header Card */}
      <header className="mb-10 pb-8 text-center border-b border-stone-200/80 dark:border-stone-800">
        <p className="text-xs tracking-widest uppercase font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          {liturgicalInfo.title} · Ano {liturgicalInfo.cycle}
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#4a153b] dark:text-rose-100">
          {hour.name}
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-1 italic">
          {hour.subtitle}
        </p>
      </header>

      {/* Office Items Stream */}
      <div className="space-y-6">
        {hour.items.map(item => {
          if (item.type === 'heading') {
            return (
              <div key={item.id} className="pt-6 pb-2 border-b border-stone-200/40 dark:border-stone-800/60">
                <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-wide text-center text-[#4a153b] dark:text-rose-200">
                  {item.text}
                </h2>
              </div>
            );
          }

          if (item.type === 'subheading') {
            return (
              <div key={item.id} className="pt-4 pb-1 text-center">
                <h3 className="text-lg font-display font-medium text-stone-700 dark:text-stone-300">
                  {item.text}
                </h3>
                {item.reference && (
                  <p className="text-xs font-sans text-stone-400">{item.reference}</p>
                )}
              </div>
            );
          }

          if (item.type === 'rubric') {
            return (
              <p key={item.id} className="rubric leading-snug my-2">
                {item.text}
              </p>
            );
          }

          if (item.type === 'silence') {
            return (
              <div key={item.id}>
                <p className="rubric mb-1">{item.text}</p>
                <SilenceTimer label={item.text} defaultSeconds={60} />
              </div>
            );
          }

          if (item.type === 'collect') {
            return (
              <div key={item.id} className="my-5 p-5 rounded-xl border border-stone-200/80 bg-stone-100/40 dark:bg-stone-900/40 dark:border-stone-800">
                {item.speaker && (
                  <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
                    {item.speaker}
                  </p>
                )}
                <p className="whitespace-pre-line text-stone-800 dark:text-stone-200">
                  {item.text}
                </p>
              </div>
            );
          }

          if (item.type === 'together') {
            return (
              <div key={item.id} className="my-4">
                {item.speaker && (
                  <p className="text-xs font-sans font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                    {item.speaker}
                  </p>
                )}
                <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100">
                  {item.text}
                </p>
              </div>
            );
          }

          if (item.type === 'people') {
            return (
              <div key={item.id} className="my-2 pl-4 border-l-2 border-[#b91c1c]/40 dark:border-rose-400/40">
                <p className="font-bold text-stone-900 dark:text-stone-100">
                  {item.text}
                </p>
              </div>
            );
          }

          if (item.type === 'scripture') {
            return (
              <div key={item.id} className="my-4 p-4 rounded-xl bg-amber-50/40 dark:bg-stone-900/40 border border-amber-200/40 dark:border-stone-800">
                {item.reference && (
                  <span className="text-xs font-sans font-bold text-[#4a153b] dark:text-rose-300 block mb-1">
                    {item.reference}
                  </span>
                )}
                <p className="italic text-stone-800 dark:text-stone-200">
                  "{item.text}"
                </p>
              </div>
            );
          }

          // Versicle or default
          return (
            <div key={item.id} className="my-2">
              {item.speaker && (
                <span className="rubric mr-2 font-sans font-normal text-xs uppercase tracking-wider not-italic text-[#b91c1c]">
                  {item.speaker}:
                </span>
              )}
              <span className="text-stone-800 dark:text-stone-200">
                {item.text}
              </span>
            </div>
          );
        })}

        {/* Dynamic Collect of the Day Integration (for Matutino & Vespertino) */}
        {(hour.id === 'matutino' || hour.id === 'vespertino') && dayCollect && (
          <section className="my-8 p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-900/60 border border-amber-200/80 dark:border-stone-800">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#b91c1c] dark:text-rose-400" />
              <h3 className="text-xs uppercase font-sans font-bold tracking-widest text-[#b91c1c] dark:text-rose-400">
                Coleta do Dia ({dayCollect.title})
              </h3>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200 italic">
              "{dayCollect.prayer}"
            </p>
          </section>
        )}

        {/* Dynamic Today's Lectionary Scripture Integration */}
        {(hour.id === 'matutino' || hour.id === 'vespertino') && (
          <section className="my-10 pt-6 border-t-2 border-stone-200/70 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#4a153b] dark:text-rose-300" />
                <h3 className="font-display font-bold text-xl text-[#4a153b] dark:text-rose-200">
                  Lecionário do Dia{lectionary ? ` — ${lectionary.dayType}` : ''}
                </h3>
              </div>
              <span className="text-xs font-sans text-stone-500">Ano {liturgicalInfo.cycle}</span>
            </div>
            <p className="rubric mb-4">
              Toque em qualquer leitura para abrir o texto bíblico integral em português para a sua meditação:
            </p>

            {!lectionary && (
              <div className="py-8 text-center text-sm font-sans text-stone-500">
                Carregando o lecionário do Ano {liturgicalInfo.cycle}…
              </div>
            )}

            <div className="space-y-3">
              {lectionary?.readings.map((reading, index) => {
                const cacheKey = `${reading.ref}#${index}`;
                const isExpanded = expandedReading === cacheKey;
                const cachedData = scriptureTexts[cacheKey];
                const isLoading = loadingReading === cacheKey;

                return (
                  <div
                    key={cacheKey}
                    className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => loadScripture(cacheKey, reading.ref)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    >
                      <div>
                        <span className="text-xs font-sans font-semibold tracking-wider uppercase text-[#b91c1c] dark:text-rose-400 block">
                          {reading.type}
                        </span>
                        <span className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                          {reading.ref}
                        </span>
                        <span className="text-sm font-sans text-stone-500 dark:text-stone-400 block mt-0.5">
                          {reading.title}
                        </span>
                      </div>
                      <div className="p-1 rounded-full text-stone-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-950/40">
                        {isLoading ? (
                          <div className="py-6 text-center text-sm font-sans text-stone-500">
                            Carregando texto das Sagradas Escrituras...
                          </div>
                        ) : cachedData ? (
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="whitespace-pre-line text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                              {cachedData.text}
                            </p>
                            <div className="mt-3 text-right text-xs font-sans text-stone-400 italic">
                              {cachedData.source === 'local' && 'Texto bíblico embutido · disponível offline'}
                              {cachedData.source === 'online' && 'Bíblia Sagrada · Tradução em Português (online)'}
                              {cachedData.source === 'simulated' && 'Referência do Lecionário REB · texto offline indisponível no momento'}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
