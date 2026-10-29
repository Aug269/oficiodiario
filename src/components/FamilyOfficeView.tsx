import React, { useState, useEffect } from 'react';
import { FAMILY_OFFICES, ADDITIONAL_PRAYERS, MEAL_PRAYERS } from '../data/liturgyData';
import { FamilyOffice, LiturgicalItem } from '../types/liturgy';
import { SilenceTimer } from './SilenceTimer';
import { isBookmarked, saveBookmark, removeBookmark } from '../services/bookmarkService';
import { getTodayLectionary } from '../data/lectionaryData';
import { getLiturgicalInfo, LiturgicalDayInfo } from '../services/liturgicalCalendar';
import { getScriptureText } from '../services/bibleService';
import { Users, Heart, Utensils, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Scroll, Sun, SunMedium, Sunset, Moon, BedDouble, BookOpen, Loader2 } from 'lucide-react';

interface FamilyOfficeViewProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  liturgicalInfo?: LiturgicalDayInfo;
}

const CREDO_APOSTOLICO_TEXT = `Creio em Deus Pai Todo-Poderoso,
Criador do céu e da terra;
e em Jesus Cristo, seu único Filho, nosso Senhor,
o qual foi concebido por obra do Espírito Santo,
nasceu da Virgem Maria,
padeceu sob o poder de Pôncio Pilatos,
foi crucificado, morto e sepultado,
desceu ao Hades,
ressuscitou ao terceiro dia,
subiu ao Céu,
e está sentado à mão direita de
Deus Pai Todo-Poderoso
donde há de vir a julgar os vivos e os mortos.
Creio no Espírito Santo,
na Santa Igreja Católica,
na Comunhão dos Santos,
na remissão dos pecados,
na ressurreição do corpo
e na Vida eterna. Amém.`;

const SALMO_51_TEXT = `Cria em mim, ó Deus, um coração puro *
e renova dentro de mim um espírito reto.
Não me lances fora da tua presença, *
nem retires de mim o teu Santo Espírito.
Dá-me de novo a alegria da tua salvação *
e sustenta-me com um espírito disposto.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`;

const SALMO_5_TEXT = `Dá ouvidos às minhas palavras, ó SENHOR, *
atende ao meu gemido.
Escuta a voz do meu clamor, Rei meu e Deus meu, *
pois a ti orarei.
Pela manhã, SENHOR, ouves a minha voz; *
pela manhã te apresento a minha oração e fico esperando.
Glória ao Pai, ao Filho e ao Espírito Santo. *
Como era no princípio, é agora e será sempre, por todos os séculos. Amém.`;

export const FamilyOfficeView: React.FC<FamilyOfficeViewProps> = ({ fontSize, liturgicalInfo }) => {
  const [selectedSubOffice, setSelectedSubOffice] = useState<string>('manha');
  const [activeTab, setActiveTab] = useState<'oficios' | 'credo' | 'adicionais' | 'refeicoes'>('oficios');
  const [showCredo, setShowCredo] = useState<boolean>(false);
  const [showAdditionalPrayers, setShowAdditionalPrayers] = useState<boolean>(false);
  const [showMealPrayersInline, setShowMealPrayersInline] = useState<boolean>(false);
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  // Morning Psalm interactive selection: Salmo 51:10–12 (padrão) | Salmo 5:1–3 | Salmo do Dia
  const [morningPsalmChoice, setMorningPsalmChoice] = useState<'salmo51' | 'salmo5' | 'salmoDoDia'>('salmo51');
  const [dailyPsalmText, setDailyPsalmText] = useState<string>('');
  const [loadingDailyPsalm, setLoadingDailyPsalm] = useState<boolean>(false);

  // Lectionary readings state (Rubric p. 71: "Em lugar do salmo e das leituras indicados, podem-se usar o salmo e as leituras do dia, no Lecionário")
  const [selectedLectionaryIndex, setSelectedLectionaryIndex] = useState<number | 'todas'>(0);
  const [isLectionaryOpen, setIsLectionaryOpen] = useState<boolean>(true);
  const [hideBriefReadings, setHideBriefReadings] = useState<boolean>(false);
  const [lectionaryTexts, setLectionaryTexts] = useState<Record<string, string>>({});
  const [loadingLectionaryRef, setLoadingLectionaryRef] = useState<string | null>(null);

  // Liturgical day resolution for Daily Psalm & Readings from the Lectionary
  const info = liturgicalInfo || getLiturgicalInfo(new Date());
  const lectionary = getTodayLectionary(
    info.cycle,
    info.season,
    info.proprioNumber,
    info.date.getDay()
  );
  const dailyPsalmObj = lectionary.readings?.find(r => r.type === 'Salmo' || r.type === 'Salmo Diário');
  const dailyPsalmRef = dailyPsalmObj?.ref || 'Salmo 34:1–8';

  const lectionaryReadings = (lectionary.readings || []).filter(
    r => r.type !== 'Salmo' && r.type !== 'Salmo Diário'
  );

  const currentOffice: FamilyOffice = FAMILY_OFFICES.find(o => o.id === selectedSubOffice) || FAMILY_OFFICES[0];

  // Fetch daily psalm text when selected
  useEffect(() => {
    if (morningPsalmChoice === 'salmoDoDia' && !dailyPsalmText) {
      setLoadingDailyPsalm(true);
      getScriptureText(dailyPsalmRef).then(res => {
        setDailyPsalmText(res.text);
        setLoadingDailyPsalm(false);
      }).catch(() => {
        setLoadingDailyPsalm(false);
      });
    }
  }, [morningPsalmChoice, dailyPsalmRef, dailyPsalmText]);

  // Load scripture text on demand for lectionary readings
  const loadLectionaryText = async (ref: string) => {
    if (lectionaryTexts[ref]) return;
    setLoadingLectionaryRef(ref);
    try {
      const res = await getScriptureText(ref);
      setLectionaryTexts(prev => ({ ...prev, [ref]: res.text }));
    } catch {
      // fallback handled in bibleService
    } finally {
      setLoadingLectionaryRef(null);
    }
  };

  // Pre-fetch active lectionary reading text
  useEffect(() => {
    if (lectionaryReadings.length > 0) {
      if (typeof selectedLectionaryIndex === 'number') {
        const active = lectionaryReadings[selectedLectionaryIndex];
        if (active && !lectionaryTexts[active.ref]) {
          loadLectionaryText(active.ref);
        }
      } else if (selectedLectionaryIndex === 'todas') {
        lectionaryReadings.forEach(r => {
          if (!lectionaryTexts[r.ref]) {
            loadLectionaryText(r.ref);
          }
        });
      }
    }
  }, [selectedLectionaryIndex, lectionaryReadings]);

  const updateBookmarks = () => {
    const map: Record<string, boolean> = {};
    currentOffice.items.forEach(it => {
      map[it.id] = isBookmarked(it.id);
    });
    map['credo-apostolico-fam'] = isBookmarked('credo-apostolico-fam');
    map['refeicao-1'] = isBookmarked('refeicao-1');
    map['refeicao-2'] = isBookmarked('refeicao-2');
    map['salmo-51-manha'] = isBookmarked('salmo-51-manha');
    map['salmo-5-manha'] = isBookmarked('salmo-5-manha');
    map['salmo-dia-manha'] = isBookmarked('salmo-dia-manha');
    lectionaryReadings.forEach(r => {
      map[`lecionario-${r.ref}`] = isBookmarked(`lecionario-${r.ref}`);
    });
    ADDITIONAL_PRAYERS.forEach((p, idx) => {
      map[`adicional-${idx}`] = isBookmarked(`adicional-${idx}`);
    });
    setBookmarkedMap(map);
  };

  useEffect(() => {
    updateBookmarks();
    const handleBookmarkUpdate = () => updateBookmarks();
    window.addEventListener('bookmarks_updated', handleBookmarkUpdate);
    return () => window.removeEventListener('bookmarks_updated', handleBookmarkUpdate);
  }, [currentOffice.id, activeTab, morningPsalmChoice, selectedLectionaryIndex]);

  const toggleBookmark = (item: LiturgicalItem) => {
    if (bookmarkedMap[item.id]) {
      removeBookmark(item.id);
    } else {
      saveBookmark({
        id: item.id,
        officeId: 'familias',
        officeTitle: `Ofício para Famílias (${currentOffice.name})`,
        sectionTitle: item.speaker || item.reference || 'Oração / Leitura',
        snippet: item.text.slice(0, 180) + (item.text.length > 180 ? '...' : ''),
        savedAt: new Date().toLocaleDateString('pt-BR')
      });
    }
  };

  const toggleGenericBookmark = (id: string, sectionTitle: string, snippet: string) => {
    if (bookmarkedMap[id]) {
      removeBookmark(id);
    } else {
      saveBookmark({
        id,
        officeId: 'familias',
        officeTitle: 'Ofício para Famílias e Indivíduos',
        sectionTitle,
        snippet: snippet.slice(0, 180) + (snippet.length > 180 ? '...' : ''),
        savedAt: new Date().toLocaleDateString('pt-BR')
      });
    }
  };

  const sizeClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose'
  }[fontSize];

  const officeIcons: Record<string, React.ReactNode> = {
    'manha': <Sun className="w-3.5 h-3.5" />,
    'meio-dia': <SunMedium className="w-3.5 h-3.5" />,
    'entardecer': <Sunset className="w-3.5 h-3.5" />,
    'anoitecer': <Moon className="w-3.5 h-3.5" />,
    'fim-do-dia': <BedDouble className="w-3.5 h-3.5" />
  };

  return (
    <article className={`max-w-3xl mx-auto py-8 px-4 sm:px-8 font-serif ${sizeClasses} text-stone-800 dark:text-stone-200 transition-all`}>
      <header className="mb-8 text-center border-b border-stone-200/80 dark:border-stone-800 pb-6">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Ofício para Famílias e Indivíduos (Páginas 71–90)
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Devoção Pessoal e Doméstica
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto leading-relaxed">
          «Estas orações seguem, em forma breve, a estrutura do Ofício Diário. Servem à oração pessoal e à oração em família, em cinco momentos do dia.»
        </p>

        {/* Book Sections Navigation: 5 Moments & Appendices from PDF Sumário */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('oficios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'oficios'
                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>5 Momentos do Dia</span>
          </button>

          <button
            onClick={() => setActiveTab('credo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'credo'
                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Scroll className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span>Credo Apostólico (p. 86)</span>
          </button>

          <button
            onClick={() => setActiveTab('adicionais')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'adicionais'
                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#b91c1c] dark:text-rose-400" />
            <span>Orações Adicionais (pp. 87–89)</span>
          </button>

          <button
            onClick={() => setActiveTab('refeicoes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
              activeTab === 'refeicoes'
                ? 'bg-[#b91c1c] text-white shadow-xs font-semibold'
                : 'bg-amber-100/70 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-300/50 hover:bg-amber-100'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="font-semibold">Orações às Refeições (p. 90)</span>
          </button>
        </div>
      </header>

      {/* Mode 1: The 5 Canonical Moments */}
      {activeTab === 'oficios' && (
        <div>
          {/* Sub-selector for the 5 moments */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-8 p-1.5 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200/60 dark:border-stone-800">
            {FAMILY_OFFICES.map(off => (
              <button
                key={off.id}
                onClick={() => {
                  setSelectedSubOffice(off.id);
                  setShowCredo(false);
                  setShowAdditionalPrayers(false);
                  setShowMealPrayersInline(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
                  selectedSubOffice === off.id
                    ? 'bg-white dark:bg-stone-800 text-[#4a153b] dark:text-rose-300 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {officeIcons[off.id]}
                <span>{off.name}</span>
              </button>
            ))}
          </div>

          <div className="text-center mb-8 pb-4 border-b border-stone-200/50 dark:border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-200 uppercase tracking-wide">
              {currentOffice.name}
            </h2>
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic mt-1">
              {currentOffice.subtitle}
            </p>
          </div>

          {/* Liturgical Items Stream */}
          <div className="space-y-6">
            {currentOffice.items.map(item => {
              const isMarked = !!bookmarkedMap[item.id];

              // SPECIAL HANDLING FOR PELA MANHÃ PSALM SELECTION
              // Rubric: "Em lugar deste, pode-se dizer o Salmo 5:1–3 ou o salmo do dia."
              if (currentOffice.id === 'manha' && item.id === 'fam-m-heading-salmo') {
                const activePsalmBookmarkId =
                  morningPsalmChoice === 'salmo51' ? 'salmo-51-manha' :
                  morningPsalmChoice === 'salmo5' ? 'salmo-5-manha' : 'salmo-dia-manha';

                const isPsalmBookmarked = !!bookmarkedMap[activePsalmBookmarkId];

                return (
                  <div key="morning-psalm-selector-block" className="my-6 p-5 rounded-2xl bg-amber-50/40 dark:bg-stone-900/40 border border-amber-200/60 dark:border-stone-800 shadow-2xs">
                    {/* Header & Psalm Option Switcher */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-amber-200/50 dark:border-stone-800">
                      <div>
                        <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#b91c1c] dark:text-rose-400 block mb-1">
                          Salmo
                        </span>
                        <h4 className="font-display font-bold text-xl text-[#4a153b] dark:text-rose-200">
                          {morningPsalmChoice === 'salmo51' && 'Miserere mei, Deus (Salmo 51:10–12)'}
                          {morningPsalmChoice === 'salmo5' && 'Verba mea auribus (Salmo 5:1–3)'}
                          {morningPsalmChoice === 'salmoDoDia' && `${dailyPsalmRef} (Salmo do Dia)`}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => {
                            const text =
                              morningPsalmChoice === 'salmo51' ? SALMO_51_TEXT :
                              morningPsalmChoice === 'salmo5' ? SALMO_5_TEXT : dailyPsalmText;
                            const title =
                              morningPsalmChoice === 'salmo51' ? 'Salmo 51:10–12 (Pela Manhã)' :
                              morningPsalmChoice === 'salmo5' ? 'Salmo 5:1–3 (Pela Manhã)' : `${dailyPsalmRef} (Salmo do Dia)`;
                            toggleGenericBookmark(activePsalmBookmarkId, title, text);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isPsalmBookmarked
                              ? 'text-[#4a153b] dark:text-rose-300'
                              : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                          }`}
                          title="Salvar salmo nos Marcadores"
                        >
                          {isPsalmBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Interactive Selector Pill Control */}
                    <div className="my-4 flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-sans font-medium text-stone-500 dark:text-stone-400 mr-1">
                        Opções de Salmo:
                      </span>

                      <button
                        onClick={() => setMorningPsalmChoice('salmo51')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                          morningPsalmChoice === 'salmo51'
                            ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        Salmo 51:10–12 (Padrão)
                      </button>

                      <button
                        onClick={() => setMorningPsalmChoice('salmo5')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                          morningPsalmChoice === 'salmo5'
                            ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        Salmo 5:1–3 (Alternativo)
                      </button>

                      <button
                        onClick={() => setMorningPsalmChoice('salmoDoDia')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                          morningPsalmChoice === 'salmoDoDia'
                            ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                            : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Salmo do Dia ({dailyPsalmRef})</span>
                      </button>
                    </div>

                    {/* Recitation Content */}
                    <div className="my-4 text-stone-900 dark:text-stone-100">
                      <p className="text-xs font-sans uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                        Todos recitam:
                      </p>

                      {morningPsalmChoice === 'salmo51' && (
                        <p className="font-semibold whitespace-pre-line leading-relaxed text-base sm:text-lg animate-fade-in">
                          {SALMO_51_TEXT}
                        </p>
                      )}

                      {morningPsalmChoice === 'salmo5' && (
                        <p className="font-semibold whitespace-pre-line leading-relaxed text-base sm:text-lg animate-fade-in">
                          {SALMO_5_TEXT}
                        </p>
                      )}

                      {morningPsalmChoice === 'salmoDoDia' && (
                        <div className="space-y-3 animate-fade-in">
                          {loadingDailyPsalm ? (
                            <div className="flex items-center gap-2 py-6 justify-center text-stone-500 font-sans text-sm">
                              <Loader2 className="w-4 h-4 animate-spin text-[#4a153b] dark:text-rose-400" />
                              <span>Carregando salmo do dia ({dailyPsalmRef})...</span>
                            </div>
                          ) : (
                            <>
                              <p className="font-semibold whitespace-pre-line leading-relaxed text-base sm:text-lg">
                                {dailyPsalmText || `Dá graças ao SENHOR, porque ele é bom; o seu amor dura para sempre.\n\n(Texto do ${dailyPsalmRef} para este dia no Lecionário)`}
                              </p>
                              <p className="font-semibold whitespace-pre-line text-[#4a153b] dark:text-rose-300 pt-2 border-t border-amber-200/50 dark:border-stone-800">
                                Glória ao Pai, ao Filho e ao Espírito Santo. * Como era no princípio, é agora e será sempre, por todos os séculos. Amém.
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Official Red Rubric from PDF */}
                    <div className="pt-3 border-t border-amber-200/50 dark:border-stone-800">
                      <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-sm">
                        «Em lugar deste, pode-se dizer o Salmo 5:1–3 ou o salmo do dia.»
                      </p>
                    </div>
                  </div>
                );
              }

              // Skip duplicate rendering of default morning psalm text and rubric since handled above
              if (currentOffice.id === 'manha' && (item.id === 'fam-m-salmo-text' || item.id === 'fam-m-rubric-alt-psalm')) {
                return null;
              }

              // RUBRICS: All instructions printed in RED ITALIC as in the official book
              if (item.type === 'rubric') {
                if (hideBriefReadings && (item.id.includes('rubric-ou') || item.text.trim().toLowerCase() === 'ou')) {
                  return null;
                }

                const isCredoRubric = item.text.includes('Credo Apostólico');
                const isPrayersRubric = item.text.includes('orações por nós e pelos outros');
                const isMealRubric = item.text.includes('oração à mesa');

                return (
                  <div key={item.id} className="my-3">
                    <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic leading-relaxed text-sm sm:text-base">
                      {item.text}
                    </p>

                    {/* Interactive inline toggle for Credo Apostólico (página 86) */}
                    {isCredoRubric && (
                      <div className="mt-2">
                        <button
                          onClick={() => setShowCredo(!showCredo)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#b91c1c]/30 text-xs font-sans font-semibold text-[#b91c1c] dark:text-rose-300 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/50 transition-colors cursor-pointer"
                        >
                          <Scroll className="w-3.5 h-3.5" />
                          <span>{showCredo ? 'Ocultar Credo Apostólico' : 'Recitar o Credo Apostólico (página 86)'}</span>
                          {showCredo ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showCredo && (
                          <div className="mt-3 p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-900 border border-amber-200/60 dark:border-stone-800 animate-fade-in space-y-2">
                            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#4a153b] dark:text-rose-300">
                              Credo Apostólico (página 86 · Todos recitam de pé)
                            </span>
                            <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100 leading-relaxed">
                              {CREDO_APOSTOLICO_TEXT}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interactive inline toggle for Meal Prayers (página 90) directly inside Ao Meio-Dia & Ao Anoitecer */}
                    {isMealRubric && (
                      <div className="mt-2">
                        <button
                          onClick={() => setShowMealPrayersInline(!showMealPrayersInline)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 text-xs font-sans font-semibold text-amber-900 dark:text-amber-200 bg-amber-100/60 dark:bg-amber-950/30 hover:bg-amber-200/60 transition-colors shadow-2xs cursor-pointer"
                        >
                          <Utensils className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>{showMealPrayersInline ? 'Ocultar Oração à Mesa' : 'Recitar Oração à Mesa (página 90)'}</span>
                          {showMealPrayersInline ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showMealPrayersInline && (
                          <div className="mt-3 p-5 rounded-2xl bg-amber-50 dark:bg-stone-900 border border-amber-200 dark:border-stone-800 space-y-4 animate-fade-in">
                            <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-stone-800 pb-2">
                              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#b91c1c] dark:text-rose-400">
                                Orações às Refeições (Página 90)
                              </span>
                              <button
                                onClick={() => toggleGenericBookmark('refeicao-inline', 'Oração à Mesa', MEAL_PRAYERS.prayers[0].text)}
                                className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                                title="Salvar nos Marcadores"
                              >
                                {bookmarkedMap['refeicao-inline'] ? <BookmarkCheck className="w-3.5 h-3.5 text-[#b91c1c]" /> : <Bookmark className="w-3.5 h-3.5" />}
                              </button>
                            </div>

                            {/* Versicle Salmo 145:15–16 */}
                            <div className="space-y-1">
                              <span className="text-[11px] font-sans font-bold text-stone-500 uppercase">
                                {MEAL_PRAYERS.versicle.reference}
                              </span>
                              <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100 leading-relaxed text-sm sm:text-base">
                                {MEAL_PRAYERS.versicle.text}
                              </p>
                            </div>

                            {/* Option 1 */}
                            <div className="p-3.5 rounded-xl bg-white dark:bg-stone-800/80 border border-amber-200/60 dark:border-stone-700">
                              <span className="text-[11px] font-sans font-bold text-[#4a153b] dark:text-rose-300 block mb-1">
                                {MEAL_PRAYERS.prayers[0].label}
                              </span>
                              <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
                                {MEAL_PRAYERS.prayers[0].text}
                              </p>
                            </div>

                            <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-center text-sm">
                              ou
                            </p>

                            {/* Option 2 */}
                            <div className="p-3.5 rounded-xl bg-white dark:bg-stone-800/80 border border-amber-200/60 dark:border-stone-700">
                              <span className="text-[11px] font-sans font-bold text-[#4a153b] dark:text-rose-300 block mb-1">
                                {MEAL_PRAYERS.prayers[1].label}
                              </span>
                              <p className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
                                {MEAL_PRAYERS.prayers[1].text}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interactive toggle for Additional Prayers mentioned in the rubric */}
                    {isPrayersRubric && (
                      <div className="mt-2">
                        <button
                          onClick={() => setShowAdditionalPrayers(!showAdditionalPrayers)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
                        >
                          <Heart className="w-3.5 h-3.5 text-[#b91c1c]" />
                          <span>{showAdditionalPrayers ? 'Ocultar Orações Adicionais' : 'Ver Orações Adicionais da Família (pp. 87–89)'}</span>
                          {showAdditionalPrayers ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showAdditionalPrayers && (
                          <div className="mt-3 space-y-3 animate-fade-in">
                            {ADDITIONAL_PRAYERS.map((p, idx) => (
                              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-serif">
                                <span className="font-sans font-bold text-[#4a153b] dark:text-rose-300 block mb-1">
                                  {p.title} (p. {p.page})
                                </span>
                                <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{p.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              // SILENCE RUBRICS: Printed in red with inline meditation timer
              // Preceded by the Lectionary Readings element ("após ela [a leitura] e antes da rubrica de silêncio")
              if (item.type === 'silence') {
                const activeLectionaryReading =
                  typeof selectedLectionaryIndex === 'number'
                    ? lectionaryReadings[selectedLectionaryIndex]
                    : null;

                const activeLectionaryBookmarkId = activeLectionaryReading
                  ? `lecionario-${activeLectionaryReading.ref}`
                  : 'lecionario-todas';

                const isLectionaryBookmarked = !!bookmarkedMap[activeLectionaryBookmarkId];

                return (
                  <React.Fragment key={`reading-silence-group-${item.id}`}>
                    {/* Elemento de Leituras do Lecionário (Página 71) */}
                    <div className="my-6 p-5 rounded-2xl bg-amber-50/40 dark:bg-stone-900/40 border border-amber-200/60 dark:border-stone-800 shadow-2xs">
                      {/* Top Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-amber-200/50 dark:border-stone-800">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#b91c1c] dark:text-rose-400" />
                            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#b91c1c] dark:text-rose-400">
                              Lecionário do Dia (Página 71)
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-lg sm:text-xl text-[#4a153b] dark:text-rose-200">
                            {lectionary.title} — {lectionary.dayType}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {activeLectionaryReading && (
                            <button
                              onClick={() => {
                                const text = lectionaryTexts[activeLectionaryReading.ref] || activeLectionaryReading.title;
                                toggleGenericBookmark(
                                  activeLectionaryBookmarkId,
                                  `${activeLectionaryReading.type}: ${activeLectionaryReading.ref} (${activeLectionaryReading.title})`,
                                  text
                                );
                              }}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isLectionaryBookmarked
                                  ? 'text-[#4a153b] dark:text-rose-300'
                                  : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                              }`}
                              title={isLectionaryBookmarked ? 'Remover leitura dos Marcadores' : 'Salvar leitura nos Marcadores'}
                            >
                              {isLectionaryBookmarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                          )}

                          <button
                            onClick={() => setIsLectionaryOpen(!isLectionaryOpen)}
                            className="flex items-center gap-1 px-2.5 py-1 text-xs font-sans font-semibold rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                          >
                            <span>{isLectionaryOpen ? 'Recolher' : 'Expandir Leituras'}</span>
                            {isLectionaryOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Controls: Reading Pills and Toggle for Brief Readings */}
                      <div className="my-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5 items-center">
                          <span className="text-xs font-sans font-medium text-stone-500 dark:text-stone-400 mr-1">
                            Leituras:
                          </span>

                          {lectionaryReadings.map((reading, idx) => (
                            <button
                              key={reading.ref}
                              onClick={() => {
                                setSelectedLectionaryIndex(idx);
                                setIsLectionaryOpen(true);
                                loadLectionaryText(reading.ref);
                              }}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                                selectedLectionaryIndex === idx
                                  ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              <span className="font-medium">{reading.type}:</span> {reading.ref}
                            </button>
                          ))}

                          <button
                            onClick={() => {
                              setSelectedLectionaryIndex('todas');
                              setIsLectionaryOpen(true);
                              lectionaryReadings.forEach(r => loadLectionaryText(r.ref));
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                              selectedLectionaryIndex === 'todas'
                                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            Todas as Leituras
                          </button>
                        </div>

                        {/* Optional toggle to hide or show the brief office readings */}
                        <button
                          onClick={() => setHideBriefReadings(!hideBriefReadings)}
                          className="text-[11px] font-sans text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 underline underline-offset-2 transition-colors cursor-pointer"
                        >
                          {hideBriefReadings ? 'Reexibir Leituras Breves do Ofício' : 'Ocultar Leituras Breves do Ofício'}
                        </button>
                      </div>

                      {/* Lectionary Recitation Content */}
                      {isLectionaryOpen && (
                        <div className="my-4 pt-2 border-t border-amber-200/40 dark:border-stone-800 animate-fade-in space-y-5">
                          {selectedLectionaryIndex === 'todas' ? (
                            lectionaryReadings.map(r => {
                              const isGospel = r.type.toLowerCase().includes('evangelho');
                              const text = lectionaryTexts[r.ref];
                              const isLoading = loadingLectionaryRef === r.ref;

                              return (
                                <div key={r.ref} className="p-4 rounded-xl bg-white/70 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-sans font-bold text-[#4a153b] dark:text-rose-300">
                                      {r.type} · {r.ref}
                                    </span>
                                    <span className="text-xs font-sans text-stone-500 italic">
                                      {r.title}
                                    </span>
                                  </div>

                                  <p className="text-xs font-sans italic text-stone-600 dark:text-stone-400">
                                    {isGospel ? 'Proclamação do Santo Evangelho de Jesus Cristo.' : `Leitura de ${r.ref}.`}
                                  </p>

                                  {isLoading ? (
                                    <div className="flex items-center gap-2 py-4 justify-center text-stone-500 font-sans text-xs">
                                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#4a153b] dark:text-rose-400" />
                                      <span>Carregando texto de {r.ref}...</span>
                                    </div>
                                  ) : (
                                    <p className="font-serif leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-line text-sm sm:text-base">
                                      {text || `«Leitura de ${r.ref} — ${r.title}»`}
                                    </p>
                                  )}

                                  <div className="pt-2 text-xs font-sans space-y-0.5 text-stone-600 dark:text-stone-400 border-t border-stone-200/40 dark:border-stone-700/40">
                                    <p><span className="font-semibold text-[#4a153b] dark:text-rose-300">Quem dirige:</span> {isGospel ? 'Evangelho do Senhor.' : 'Palavra do Senhor.'}</p>
                                    <p><span className="font-semibold text-[#b91c1c] dark:text-rose-400">Todos:</span> {isGospel ? 'Louvor a vós, ó Cristo.' : 'Demos graças a Deus.'}</p>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            activeLectionaryReading && (() => {
                              const r = activeLectionaryReading;
                              const isGospel = r.type.toLowerCase().includes('evangelho');
                              const text = lectionaryTexts[r.ref];
                              const isLoading = loadingLectionaryRef === r.ref;

                              return (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between pb-1 border-b border-stone-200/50 dark:border-stone-800">
                                    <span className="text-xs uppercase font-sans font-bold text-[#4a153b] dark:text-rose-300">
                                      {r.type} · {r.ref}
                                    </span>
                                    <span className="text-xs font-sans text-stone-500 italic">
                                      {r.title}
                                    </span>
                                  </div>

                                  <p className="text-xs font-sans italic text-stone-600 dark:text-stone-400">
                                    {isGospel ? 'Proclamação do Santo Evangelho de Jesus Cristo.' : `Leitura de ${r.ref}.`}
                                  </p>

                                  {isLoading ? (
                                    <div className="flex items-center gap-2 py-6 justify-center text-stone-500 font-sans text-sm">
                                      <Loader2 className="w-4 h-4 animate-spin text-[#4a153b] dark:text-rose-400" />
                                      <span>Carregando leitura ({r.ref})...</span>
                                    </div>
                                  ) : (
                                    <p className="font-serif leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-line text-base sm:text-lg">
                                      {text || `«Leitura de ${r.ref} — ${r.title}»`}
                                    </p>
                                  )}

                                  <div className="pt-2 text-xs sm:text-sm font-sans space-y-1 text-stone-600 dark:text-stone-400 border-t border-amber-200/50 dark:border-stone-800">
                                    <p><span className="font-semibold text-[#4a153b] dark:text-rose-300">Quem dirige:</span> {isGospel ? 'Evangelho do Senhor.' : 'Palavra do Senhor.'}</p>
                                    <p><span className="font-semibold text-[#b91c1c] dark:text-rose-400">Todos:</span> {isGospel ? 'Louvor a vós, ó Cristo.' : 'Demos graças a Deus.'}</p>
                                  </div>
                                </div>
                              );
                            })()
                          )}
                        </div>
                      )}

                      {/* Official Red Rubric from PDF (Page 71) */}
                      <div className="pt-3 border-t border-amber-200/50 dark:border-stone-800">
                        <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-sm">
                          «Em lugar do salmo e das leituras indicados, podem-se usar o salmo e as leituras do dia, no Lecionário (páginas 171–172).»
                        </p>
                      </div>
                    </div>

                    {/* Silence Rubric with Meditation Timer */}
                    <div className="my-4">
                      <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic leading-relaxed text-sm sm:text-base mb-2">
                        {item.text}
                      </p>
                      <SilenceTimer label={item.text} defaultSeconds={60} />
                    </div>
                  </React.Fragment>
                );
              }

              // HEADINGS
              if (item.type === 'heading') {
                const isReadingHeading = item.text === 'Leitura';
                return (
                  <div key={item.id} className="pt-4 pb-1 border-b border-stone-200/40 dark:border-stone-800/60">
                    <h3 className="text-xl font-display font-bold text-[#4a153b] dark:text-rose-200">
                      {item.text}
                    </h3>
                    {isReadingHeading && hideBriefReadings && (
                      <p className="text-xs font-sans text-stone-500 italic mt-1">
                        (Leituras breves do ofício ocultadas — veja as Leituras do Lecionário abaixo)
                      </p>
                    )}
                  </div>
                );
              }

              // SUBHEADINGS (e.g. Salmo titles with Latin incipit)
              if (item.type === 'subheading') {
                return (
                  <h4 key={item.id} className="pt-3 font-display font-medium text-stone-700 dark:text-stone-300 text-lg">
                    {item.text}
                  </h4>
                );
              }

              // SCRIPTURE VERSES / READINGS
              if (item.type === 'scripture') {
                if (hideBriefReadings && (item.id.includes('leitura') || item.id.includes('fam-m-leitura'))) {
                  return null;
                }

                return (
                  <div key={item.id} className="my-4 p-5 rounded-2xl bg-amber-50/40 dark:bg-stone-900/40 border border-amber-200/50 dark:border-stone-800">
                    <div className="flex items-center justify-between mb-2">
                      {item.reference && (
                        <span className="text-xs font-sans font-bold text-[#4a153b] dark:text-rose-300">
                          {item.reference}
                        </span>
                      )}
                      <button
                        onClick={() => toggleBookmark(item)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          isMarked
                            ? 'text-[#4a153b] dark:text-rose-300'
                            : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                        }`}
                        title={isMarked ? 'Remover dos Marcadores' : 'Salvar nos Marcadores'}
                      >
                        {isMarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                      {item.text}
                    </p>
                  </div>
                );
              }

              // COLLECT
              if (item.type === 'collect') {
                return (
                  <div key={item.id} className="my-5 p-5 rounded-2xl border border-stone-200/80 bg-stone-100/50 dark:bg-stone-900/50 dark:border-stone-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase font-sans font-semibold text-[#b91c1c] dark:text-rose-400">
                        {item.speaker || 'Coleta'}
                      </span>
                      <button
                        onClick={() => toggleBookmark(item)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          isMarked
                            ? 'text-[#4a153b] dark:text-rose-300'
                            : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                        }`}
                        title={isMarked ? 'Remover dos Marcadores' : 'Salvar oração nos Marcadores'}
                      >
                        {isMarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              }

              // CONGREGATIONAL RECITAL (Salmos, Pai-Nosso, etc.)
              if (item.type === 'together') {
                return (
                  <div key={item.id} className="my-4">
                    {item.speaker && (
                      <p className="text-xs uppercase font-sans font-semibold text-stone-500 dark:text-stone-400 mb-1">
                        {item.speaker}
                      </p>
                    )}
                    <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              }

              // BLESSING OR LEADER
              return (
                <div key={item.id} className="my-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
                  {item.speaker && (
                    <span className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-sm block mb-1">
                      {item.speaker}:
                    </span>
                  )}
                  <p className="text-stone-800 dark:text-stone-200 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Credo Apostólico (Página 86) */}
      {activeTab === 'credo' && (
        <div className="space-y-6">
          <header className="text-center pb-4 border-b border-stone-200/60 dark:border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-200">
              Credo Apostólico
            </h2>
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic mt-1">
              Página 86 do livro impresso
            </p>
          </header>

          <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-base">
            Quando se diz o Credo nestas orações, o texto é este:
          </p>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-stone-100 dark:border-stone-800 pb-2">
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#4a153b] dark:text-rose-300">
                Todos de pé
              </span>
              <button
                onClick={() => toggleGenericBookmark('credo-apostolico-fam', 'Credo Apostólico', CREDO_APOSTOLICO_TEXT)}
                className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                title="Salvar nos Marcadores"
              >
                {bookmarkedMap['credo-apostolico-fam'] ? <BookmarkCheck className="w-4 h-4 text-[#4a153b] dark:text-rose-300" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
            <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100 leading-relaxed font-serif text-lg">
              {CREDO_APOSTOLICO_TEXT}
            </p>
          </div>
        </div>
      )}

      {/* Mode 3: Additional Prayers (Páginas 87–89) */}
      {activeTab === 'adicionais' && (
        <div className="space-y-6">
          <header className="text-center pb-4 border-b border-stone-200/60 dark:border-stone-800">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-200">
              Orações Adicionais
            </h2>
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic mt-1">
              Páginas 87–89 do livro impresso
            </p>
          </header>

          <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-base">
            Orações para a família e para momentos de intercessão e súplica:
          </p>

          {ADDITIONAL_PRAYERS.map((prayer, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-display font-bold text-[#4a153b] dark:text-rose-200">
                  {prayer.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans text-stone-400">Pág. {prayer.page}</span>
                  <button
                    onClick={() => toggleGenericBookmark(`adicional-${i}`, prayer.title, prayer.text)}
                    className="p-1 rounded text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                    title="Salvar nos Marcadores"
                  >
                    {bookmarkedMap[`adicional-${i}`] ? <BookmarkCheck className="w-4 h-4 text-[#4a153b] dark:text-rose-300" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-lg">
                {prayer.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Mode 4: Meal Prayers (Página 90) */}
      {activeTab === 'refeicoes' && (
        <div className="space-y-6">
          <header className="text-center pb-4 border-b border-stone-200/60 dark:border-stone-800">
            <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-1">
              Página 90 do livro impresso
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-200">
              Orações às Refeições
            </h2>
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic mt-1">
              Bênção da mesa antes de compartilhar o alimento em família
            </p>
          </header>

          <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-base">
            À mesa, diz-se o versículo bíblico e, em seguida, uma das orações:
          </p>

          {/* Opening versicle Salmo 145:15–16 */}
          <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-xs">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#4a153b] dark:text-rose-300 block mb-2">
              {MEAL_PRAYERS.versicle.reference}
            </span>
            <p className="font-semibold whitespace-pre-line text-stone-900 dark:text-stone-100 leading-relaxed font-serif text-lg sm:text-xl">
              {MEAL_PRAYERS.versicle.text}
            </p>
          </div>

          {/* Option 1 */}
          <div className="p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-display font-bold text-[#4a153b] dark:text-rose-200">
                {MEAL_PRAYERS.prayers[0].label}
              </h3>
              <button
                onClick={() => toggleGenericBookmark('refeicao-1', 'Oração às Refeições (1)', MEAL_PRAYERS.prayers[0].text)}
                className="p-1 rounded text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                title="Salvar nos Marcadores"
              >
                {bookmarkedMap['refeicao-1'] ? <BookmarkCheck className="w-4 h-4 text-[#4a153b] dark:text-rose-300" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-lg">
              {MEAL_PRAYERS.prayers[0].text}
            </p>
          </div>

          {/* Alternative Rubric */}
          <div className="text-center">
            <span className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-lg font-medium">
              ou
            </span>
          </div>

          {/* Option 2 */}
          <div className="p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-display font-bold text-[#4a153b] dark:text-rose-200">
                {MEAL_PRAYERS.prayers[1].label}
              </h3>
              <button
                onClick={() => toggleGenericBookmark('refeicao-2', 'Oração às Refeições (2)', MEAL_PRAYERS.prayers[1].text)}
                className="p-1 rounded text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                title="Salvar nos Marcadores"
              >
                {bookmarkedMap['refeicao-2'] ? <BookmarkCheck className="w-4 h-4 text-[#4a153b] dark:text-rose-300" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-lg">
              {MEAL_PRAYERS.prayers[1].text}
            </p>
          </div>
        </div>
      )}
    </article>
  );
};
