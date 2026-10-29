import React, { useState, useEffect } from 'react';
import { CanonicalHour, LiturgicalItem } from '../types/liturgy';
import { LiturgicalDayInfo } from '../services/liturgicalCalendar';
import { ALL_COLLECTS } from '../data/collectsData';
import { getTodayLectionary } from '../data/lectionaryData';
import { getScriptureText, ScriptureLookupResult } from '../services/bibleService';
import { SilenceTimer } from './SilenceTimer';
import { GuidedMeditationBar } from './GuidedMeditationBar';
import { isBookmarked, saveBookmark, removeBookmark } from '../services/bookmarkService';
import { BookOpen, ChevronDown, ChevronUp, Sparkles, Bookmark, BookmarkCheck } from 'lucide-react';

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
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  // Today's lectionary readings based on cycle and season
  const lectionary = getTodayLectionary(
    liturgicalInfo.cycle,
    liturgicalInfo.season,
    liturgicalInfo.proprioNumber,
    liturgicalInfo.date.getDay()
  );

  // Today's specific collect
  const dayCollect = ALL_COLLECTS.find(c => c.id === liturgicalInfo.collectId) ||
    ALL_COLLECTS.find(c => c.id === 'col-tc-proprio-25') ||
    ALL_COLLECTS[0];

  const updateBookmarksStatus = () => {
    const map: Record<string, boolean> = {};
    hour.items.forEach(it => {
      map[it.id] = isBookmarked(it.id);
    });
    // Check collect and readings
    map['day-collect'] = isBookmarked('day-collect');
    lectionary.readings.forEach(r => {
      map[r.ref] = isBookmarked(r.ref);
    });
    setBookmarkedMap(map);
  };

  useEffect(() => {
    updateBookmarksStatus();
    const handleBookmarkEvent = () => updateBookmarksStatus();
    window.addEventListener('bookmarks_updated', handleBookmarkEvent);
    return () => window.removeEventListener('bookmarks_updated', handleBookmarkEvent);
  }, [hour.id, liturgicalInfo.date]);

  const toggleBookmark = (id: string, sectionTitle: string, snippet: string) => {
    if (bookmarkedMap[id]) {
      removeBookmark(id);
    } else {
      saveBookmark({
        id,
        officeId: hour.id,
        officeTitle: hour.name,
        sectionTitle,
        snippet: snippet.slice(0, 180) + (snippet.length > 180 ? '...' : ''),
        savedAt: new Date().toLocaleDateString('pt-BR')
      });
    }
  };

  const loadScripture = async (ref: string) => {
    if (expandedReading === ref) {
      setExpandedReading(null);
      return;
    }
    setExpandedReading(ref);
    if (!scriptureTexts[ref]) {
      setLoadingReading(ref);
      const res = await getScriptureText(ref);
      setScriptureTexts(prev => ({ ...prev, [ref]: res }));
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
      <header className="mb-6 pb-6 text-center border-b border-stone-200/80 dark:border-stone-800">
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

      {/* Guided Meditation & Silence Audio Controller Bar on upper part of OfficeView */}
      <GuidedMeditationBar officeTitle={hour.name} />

      {/* Office Items Stream */}
      <div className="space-y-6">
        {hour.items.map(item => {
          const isMarked = !!bookmarkedMap[item.id];

          if (item.type === 'heading') {
            return (
              <div key={item.id} className="pt-6 pb-2 border-b border-stone-200/40 dark:border-stone-800/60 flex items-center justify-between">
                <div className="w-6" /> {/* spacer for balance */}
                <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-wide text-center text-[#4a153b] dark:text-rose-200">
                  {item.text}
                </h2>
                <button
                  onClick={() => toggleBookmark(item.id, item.text, `${hour.name} - ${item.text}`)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isMarked
                      ? 'text-[#4a153b] dark:text-rose-300'
                      : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                  }`}
                  title={isMarked ? 'Remover dos Marcadores' : 'Salvar seção nos Marcadores'}
                >
                  {isMarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                </button>
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
              <div key={item.id} className="relative my-5 p-5 rounded-xl border border-stone-200/80 bg-stone-100/40 dark:bg-stone-900/40 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  {item.speaker && (
                    <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400">
                      {item.speaker}
                    </p>
                  )}
                  <button
                    onClick={() => toggleBookmark(item.id, item.speaker || 'Coleta', item.text)}
                    className={`p-1 rounded transition-colors ${
                      isMarked
                        ? 'text-[#4a153b] dark:text-rose-300'
                        : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                    }`}
                    title={isMarked ? 'Remover dos Marcadores' : 'Salvar oração nos Marcadores'}
                  >
                    {isMarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
                <p className="whitespace-pre-line text-stone-800 dark:text-stone-200">
                  {item.text}
                </p>
              </div>
            );
          }

          if (item.type === 'together') {
            return (
              <div key={item.id} className="my-4">
                <div className="flex items-center justify-between">
                  {item.speaker && (
                    <p className="text-xs font-sans font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                      {item.speaker}
                    </p>
                  )}
                  {item.speaker && (item.speaker.includes('Credo') || item.speaker.includes('Pai nosso') || item.speaker.includes('Salmo') || item.speaker.includes('Te Deum') || item.speaker.includes('Magnificat') || item.speaker.includes('Cântico') || item.speaker.includes('Todos')) && (
                    <button
                      onClick={() => toggleBookmark(item.id, item.speaker || 'Oração', item.text)}
                      className={`p-1 rounded transition-colors ${
                        isMarked
                          ? 'text-[#4a153b] dark:text-rose-300'
                          : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                      }`}
                      title={isMarked ? 'Remover dos Marcadores' : 'Salvar nos Marcadores'}
                    >
                      {isMarked ? <BookmarkCheck className="w-3.5 h-3.5 fill-current" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
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
                <div className="flex items-center justify-between mb-1">
                  {item.reference && (
                    <span className="text-xs font-sans font-bold text-[#4a153b] dark:text-rose-300">
                      {item.reference}
                    </span>
                  )}
                  <button
                    onClick={() => toggleBookmark(item.id, item.reference || 'Escritura', item.text)}
                    className={`p-1 rounded transition-colors ${
                      isMarked
                        ? 'text-[#4a153b] dark:text-rose-300'
                        : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                    }`}
                    title={isMarked ? 'Remover dos Marcadores' : 'Salvar leitura nos Marcadores'}
                  >
                    {isMarked ? <BookmarkCheck className="w-3.5 h-3.5 fill-current" /> : <Bookmark className="w-3.5 h-3.5" />}
                  </button>
                </div>
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#b91c1c] dark:text-rose-400" />
                <h3 className="text-xs uppercase font-sans font-bold tracking-widest text-[#b91c1c] dark:text-rose-400">
                  Coleta do Dia ({dayCollect.title})
                </h3>
              </div>
              <button
                onClick={() => toggleBookmark(`collect-${dayCollect.id}`, `Coleta do Dia: ${dayCollect.title}`, dayCollect.prayer)}
                className={`p-1 rounded transition-colors ${
                  bookmarkedMap[`collect-${dayCollect.id}`]
                    ? 'text-[#4a153b] dark:text-rose-300'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Salvar Coleta nos Marcadores"
              >
                {bookmarkedMap[`collect-${dayCollect.id}`] ? (
                  <BookmarkCheck className="w-4 h-4 fill-current" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
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
                  Lecionário do Dia — {lectionary.dayType}
                </h3>
              </div>
              <span className="text-xs font-sans text-stone-500">Ano {liturgicalInfo.cycle}</span>
            </div>
            <p className="rubric mb-4">
              Toque em qualquer leitura para abrir o texto bíblico integral em português para a sua meditação:
            </p>

            <div className="space-y-3">
              {lectionary.readings.map(reading => {
                const isExpanded = expandedReading === reading.ref;
                const cachedData = scriptureTexts[reading.ref];
                const isLoading = loadingReading === reading.ref;
                const isReadBookmarked = !!bookmarkedMap[reading.ref];

                return (
                  <div
                    key={reading.ref}
                    className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                      <button
                        onClick={() => loadScripture(reading.ref)}
                        className="flex-1 text-left cursor-pointer"
                      >
                        <span className="text-xs font-sans font-semibold tracking-wider uppercase text-[#b91c1c] dark:text-rose-400 block">
                          {reading.type}
                        </span>
                        <span className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                          {reading.ref}
                        </span>
                        <span className="text-sm font-sans text-stone-500 dark:text-stone-400 block mt-0.5">
                          {reading.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(reading.ref, `${reading.type}: ${reading.ref} - ${reading.title}`, cachedData ? cachedData.text : reading.title)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isReadBookmarked
                              ? 'text-[#4a153b] dark:text-rose-300'
                              : 'text-stone-300 hover:text-stone-600 dark:text-stone-600'
                          }`}
                          title={isReadBookmarked ? 'Remover dos Marcadores' : 'Salvar leitura nos Marcadores'}
                        >
                          {isReadBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => loadScripture(reading.ref)}
                          className="p-1 rounded-full text-stone-400"
                        >
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

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
                              Bíblia Sagrada · Tradução em Português
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
