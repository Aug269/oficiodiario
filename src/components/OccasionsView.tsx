import React, { useEffect, useState } from 'react';
import {
  getCommons,
  getOccasions,
  getOAntiphons,
  decorateReadings,
  CommonLectionary,
  OccasionLectionary,
  OAntiphonDay,
  GeneratedReading,
} from '../data/lectionaryData';
import { getScriptureText, ScriptureLookupResult } from '../services/bibleService';
import { BookMarked, CalendarHeart, Flame, ChevronDown, ChevronUp } from 'lucide-react';

type Tab = 'comuns' | 'ocasioes' | 'antifonas';

interface ReadingCardProps {
  reading: GeneratedReading;
  index: number;
  expanded: string | null;
  loadingKey: string | null;
  cache: Record<string, ScriptureLookupResult>;
  onToggle: (cacheKey: string, ref: string) => void;
}

const ReadingCard: React.FC<ReadingCardProps> = ({ reading, index, expanded, loadingKey, cache, onToggle }) => {
  const cacheKey = `${reading.ref}#${index}`;
  const isExpanded = expanded === cacheKey;
  const isLoading = loadingKey === cacheKey;
  const cached = cache[cacheKey];
  const [label] = decorateReadings([reading]);

  return (
    <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden transition-all shadow-xs">
      <button
        onClick={() => onToggle(cacheKey, reading.ref)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
      >
        <div>
          <span className="text-xs font-sans font-semibold tracking-wider uppercase text-[#b91c1c] dark:text-rose-400 block">
            {label.type}
            {reading.alternative && (
              <span className="ml-2 normal-case tracking-normal text-stone-400 dark:text-stone-500">(ou)</span>
            )}
          </span>
          <span className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">{reading.ref}</span>
          {reading.title && reading.title !== 'Leitura designada' && (
            <span className="text-sm font-sans text-stone-500 dark:text-stone-400 block mt-0.5">{reading.title}</span>
          )}
        </div>
        <div className="p-1 rounded-full text-stone-400 shrink-0">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-950/40">
          {isLoading ? (
            <div className="py-6 text-center text-sm font-sans text-stone-500">
              Carregando texto das Sagradas Escrituras...
            </div>
          ) : cached ? (
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-line text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                {cached.text}
              </p>
              <div className="mt-3 text-right text-xs font-sans text-stone-400 italic">
                {cached.source === 'local' && 'Texto bíblico embutido · disponível offline'}
                {cached.source === 'online' && 'Bíblia Sagrada · Tradução em Português (online)'}
                {cached.source === 'simulated' && 'Referência do Lecionário REB · texto offline indisponível no momento'}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

interface SectionCardProps {
  name: string;
  note?: string;
  badge?: string;
  readings: GeneratedReading[];
  expanded: string | null;
  loadingKey: string | null;
  cache: Record<string, ScriptureLookupResult>;
  onToggle: (cacheKey: string, ref: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ name, note, badge, readings, ...rest }) => (
  <section className="rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 p-5 sm:p-6">
    <div className="mb-4">
      {badge && (
        <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-[#4a153b]/10 dark:bg-rose-900/30 text-[#4a153b] dark:text-rose-200 text-[11px] font-sans font-semibold tracking-wide">
          {badge}
        </span>
      )}
      <h3 className="font-display text-xl font-bold text-[#4a153b] dark:text-rose-100">{name}</h3>
      {note && <p className="rubric mt-1.5">{note}</p>}
    </div>
    <div className="space-y-3">
      {readings.map((reading, i) => (
        <ReadingCard key={`${reading.ref}-${i}`} reading={reading} index={i} {...rest} />
      ))}
    </div>
  </section>
);

export const OccasionsView: React.FC = () => {
  const [tab, setTab] = useState<Tab>('comuns');
  const [commons, setCommons] = useState<CommonLectionary[]>([]);
  const [occasions, setOccasions] = useState<OccasionLectionary[]>([]);
  const [antiphons, setAntiphons] = useState<OAntiphonDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [cache, setCache] = useState<Record<string, ScriptureLookupResult>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all([getCommons(), getOccasions(), getOAntiphons()]).then(([c, o, a]) => {
      if (!cancelled) {
        setCommons(c);
        setOccasions(o);
        setAntiphons(a);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const onToggle = async (cacheKey: string, ref: string) => {
    if (expanded === cacheKey) {
      setExpanded(null);
      return;
    }
    setExpanded(cacheKey);
    if (!cache[cacheKey]) {
      setLoadingKey(cacheKey);
      const res = await getScriptureText(ref);
      setCache((prev) => ({ ...prev, [cacheKey]: res }));
      setLoadingKey(null);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'comuns', label: 'Comuns dos Santos', icon: <BookMarked className="w-3.5 h-3.5" />, count: commons.length },
    { id: 'ocasioes', label: 'Ocasiões Especiais', icon: <CalendarHeart className="w-3.5 h-3.5" />, count: occasions.length },
    { id: 'antifonas', label: 'O Antifonas', icon: <Flame className="w-3.5 h-3.5" />, count: antiphons.length },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-8 font-serif">
      <header className="mb-8 text-center border-b border-stone-200/80 dark:border-stone-800 pb-6">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Lecionário · Dias Santos e Ocasiões
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Comuns e Ocasiões
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          Os Comuns dos Santos, as Comemorações e Ocasiões Especiais e as Antífonas Ó dos dias 17 a 23 de dezembro,
          conforme o Ofício Diário &amp; Lecionário da REB (pp. 405–410).
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200/70 dark:border-stone-800 max-w-2xl mx-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                tab === t.id
                  ? 'bg-[#4a153b] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/70 dark:hover:bg-stone-800'
              }`}
            >
              {t.icon}
              {t.label}
              <span className={tab === t.id ? 'text-white/70' : 'text-stone-400'}>({t.count})</span>
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="py-12 text-center text-sm font-sans text-stone-500">Carregando o lecionário…</div>
      ) : (
        <div className="space-y-5 animate-fade-in">
          {tab === 'comuns' &&
            commons.map((section) => (
              <SectionCard key={section.id} name={section.name} readings={section.readings}
                expanded={expanded} loadingKey={loadingKey} cache={cache} onToggle={onToggle} />
            ))}

          {tab === 'ocasioes' &&
            occasions.map((section) => (
              <SectionCard key={section.id} name={section.name} note={section.note} readings={section.readings}
                expanded={expanded} loadingKey={loadingKey} cache={cache} onToggle={onToggle} />
            ))}

          {tab === 'antifonas' && (
            <>
              <p className="rubric text-center">
                De 17 a 23 de dezembro, antes do Natal, a Igreja canta diariamente uma das sete Antífonas Ó.
              </p>
              {antiphons.map((day) => (
                <SectionCard
                  key={day.day}
                  name={day.name}
                  badge={`${day.day} de dezembro`}
                  readings={day.readings}
                  expanded={expanded}
                  loadingKey={loadingKey}
                  cache={cache}
                  onToggle={onToggle}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
