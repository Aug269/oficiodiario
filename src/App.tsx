/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TRADITIONAL_HOURS } from './data/liturgyData';
import { CanonicalHour } from './types/liturgy';
import { getLiturgicalInfo, getCanonicalHourId, LiturgicalDayInfo } from './services/liturgicalCalendar';
import { OfficeView } from './components/OfficeView';
import { FamilyOfficeView } from './components/FamilyOfficeView';
import { WeeklyOfficeView } from './components/WeeklyOfficeView';
import { CollectsCatalogView } from './components/CollectsCatalogView';
import { CanticlesCatalogView } from './components/CanticlesCatalogView';
import { CalendarView } from './components/CalendarView';
import { OccasionsView } from './components/OccasionsView';
import { AboutView } from './components/AboutView';
import { PWAInstallButton } from './components/PWAInstallButton';
import {
  Sun,
  SunMedium,
  Sunset,
  Moon,
  Calendar as CalendarIcon,
  BookOpen,
  Users,
  Compass,
  Bookmark,
  Music,
  Info,
  Menu,
  X,
  Type,
  WifiOff,
  CalendarHeart
} from 'lucide-react';

export default function App() {
  // Current liturgical date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [liturgicalInfo, setLiturgicalInfo] = useState<LiturgicalDayInfo>(getLiturgicalInfo(currentDate));

  // Hora canônica determinada pela hora real do relógio (motor centralizado).
  const getCurrentHourId = (): CanonicalHour['id'] => getCanonicalHourId(new Date());

  const [selectedHourId, setSelectedHourId] = useState<CanonicalHour['id']>(getCurrentHourId());
  const [activeView, setActiveView] = useState<'tradicional' | 'familias' | 'semana' | 'coletas' | 'canticos' | 'calendario' | 'ocasioes' | 'sobre'>('tradicional');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Auto-update liturgical info on date change
  useEffect(() => {
    setLiturgicalInfo(getLiturgicalInfo(currentDate));
  }, [currentDate]);

  // Online / Offline monitor
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync dark mode class with html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentHour = TRADITIONAL_HOURS.find(h => h.id === selectedHourId) || TRADITIONAL_HOURS[0];
  const realCurrentHourId = getCurrentHourId();

  const handleSelectDateAndOpen = (d: Date) => {
    setCurrentDate(d);
    setActiveView('tradicional');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-[#141214] text-stone-100' : 'bg-[#FAF8F5] text-stone-900'} transition-colors duration-200`}>
      {/* Offline Alert Strip */}
      {!isOnline && (
        <aside className="bg-amber-600 text-white text-xs font-sans py-1 px-4 text-center flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Modo Offline ativado — todos os textos litúrgicos e salmos continuam disponíveis.</span>
        </aside>
      )}

      {/* Top Bar following the strict 3-zone contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1c171d]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => { setActiveView('tradicional'); setSelectedHourId(getCurrentHourId()); }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4a153b] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M5 8h14" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[#4a153b] dark:text-rose-200 whitespace-nowrap block leading-tight">
                  Ofício Diário
                </span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#b91c1c] dark:text-rose-400 block font-semibold leading-tight">
                  Rede Episcopal Brasileira
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-sans font-semibold text-stone-600 dark:text-stone-300">
            <button
              onClick={() => setActiveView('tradicional')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'tradicional' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Ofício Tradicional
            </button>
            <button
              onClick={() => setActiveView('familias')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'familias' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Famílias & Indivíduos
            </button>
            <button
              onClick={() => setActiveView('semana')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'semana' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setActiveView('coletas')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'coletas' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Coletas
            </button>
            <button
              onClick={() => setActiveView('canticos')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'canticos' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Cânticos
            </button>
            <button
              onClick={() => setActiveView('calendario')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'calendario' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Calendário
            </button>
            <button
              onClick={() => setActiveView('ocasioes')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'ocasioes' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Ocasiões
            </button>
            <button
              onClick={() => setActiveView('sobre')}
              className={`hover:text-[#4a153b] dark:hover:text-rose-200 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'sobre' ? 'text-[#4a153b] dark:text-rose-300 border-b-2 border-[#4a153b] pb-1' : ''
              }`}
            >
              Sobre o Livro
            </button>
          </nav>

          {/* Zone 3: Primary Utility Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Font size toggle */}
            <div className="hidden sm:flex items-center rounded-lg bg-stone-100 dark:bg-stone-800 p-0.5 border border-stone-200/80 dark:border-stone-700">
              <button
                onClick={() => setFontSize(prev => prev === 'xl' ? 'lg' : prev === 'lg' ? 'base' : 'sm')}
                className="px-2 py-1 text-xs font-sans text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white"
                title="Diminuir texto"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(prev => prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'xl')}
                className="px-2 py-1 text-xs font-sans font-bold text-stone-800 dark:text-stone-100 hover:text-black dark:hover:text-white"
                title="Aumentar texto"
              >
                A+
              </button>
            </div>

            {/* Dark/Night mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title={isDarkMode ? 'Modo Claro' : 'Modo Noturno (Completas)'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4a153b]" />}
            </button>

            {/* PWA Install */}
            <PWAInstallButton />

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-4 space-y-2 z-30 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs font-sans font-medium">
            <button
              onClick={() => { setActiveView('tradicional'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'tradicional' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <BookOpen className="w-4 h-4" /> Ofício Tradicional
            </button>
            <button
              onClick={() => { setActiveView('familias'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'familias' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <Users className="w-4 h-4" /> Famílias e Indivíduos
            </button>
            <button
              onClick={() => { setActiveView('semana'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'semana' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <Compass className="w-4 h-4" /> Ofício Semanal
            </button>
            <button
              onClick={() => { setActiveView('coletas'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'coletas' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <Bookmark className="w-4 h-4" /> Coletas
            </button>
            <button
              onClick={() => { setActiveView('canticos'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'canticos' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <Music className="w-4 h-4" /> Cânticos
            </button>
            <button
              onClick={() => { setActiveView('calendario'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'calendario' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <CalendarIcon className="w-4 h-4" /> Calendário REB
            </button>
            <button
              onClick={() => { setActiveView('ocasioes'); setIsMobileMenuOpen(false); }}
              className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${activeView === 'ocasioes' ? 'bg-[#4a153b] text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
            >
              <CalendarHeart className="w-4 h-4" /> Comuns e Ocasiões
            </button>
          </div>
          <button
            onClick={() => { setActiveView('sobre'); setIsMobileMenuOpen(false); }}
            className="w-full mt-2 p-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-sans text-center flex items-center justify-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" /> Sobre o Livro e Jurisdição Litúrgica
          </button>
        </div>
      )}

      {/* Liturgical Status Banner */}
      <section className="bg-stone-100/70 dark:bg-stone-900/60 border-b border-stone-200/60 dark:border-stone-800/80 px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              liturgicalInfo.color === 'purple' ? 'bg-purple-600' :
              liturgicalInfo.color === 'white' ? 'bg-amber-400 border border-amber-600' :
              liturgicalInfo.color === 'red' ? 'bg-red-600' : 'bg-emerald-600'
            }`} />
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {liturgicalInfo.title}
            </span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-500 dark:text-stone-400">
              Cor: {liturgicalInfo.colorName} · Ano {liturgicalInfo.cycle}
            </span>
          </div>

          <div className="flex items-center gap-2 text-stone-500">
            <span className="capitalize">{liturgicalInfo.dateFormatted}</span>
            <button
              onClick={() => setActiveView('calendario')}
              className="text-[#4a153b] dark:text-rose-300 hover:underline font-medium text-[11px]"
            >
              (Alterar data)
            </button>
          </div>
        </div>
      </section>

      {/* Traditional Canonical Hours Selector Ribbon (Only when activeView === 'tradicional') */}
      {activeView === 'tradicional' && (
        <nav className="bg-white dark:bg-[#1a151b] border-b border-stone-200/70 dark:border-stone-800 sticky top-16 z-20">
          <div className="max-w-3xl mx-auto px-4 flex items-center justify-around sm:justify-center sm:gap-4 py-2 overflow-x-auto">
            {TRADITIONAL_HOURS.map(hour => {
              const isSelected = selectedHourId === hour.id;
              const isCurrentHourTime = realCurrentHourId === hour.id;

              return (
                <button
                  key={hour.id}
                  onClick={() => setSelectedHourId(hour.id)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {hour.id === 'matutino' && <Sun className="w-4 h-4 text-amber-500" />}
                  {hour.id === 'meio-dia' && <SunMedium className="w-4 h-4 text-amber-500" />}
                  {hour.id === 'vespertino' && <Sunset className="w-4 h-4 text-rose-500" />}
                  {hour.id === 'completas' && <Moon className="w-4 h-4 text-indigo-400" />}
                  <span>{hour.name}</span>
                  {isCurrentHourTime && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#b91c1c]/10 text-[#b91c1c] dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      Agora
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'tradicional' && (
          <OfficeView
            hour={currentHour}
            liturgicalInfo={liturgicalInfo}
            fontSize={fontSize}
          />
        )}

        {activeView === 'familias' && (
          <FamilyOfficeView fontSize={fontSize} />
        )}

        {activeView === 'semana' && (
          <WeeklyOfficeView fontSize={fontSize} />
        )}

        {activeView === 'coletas' && (
          <CollectsCatalogView fontSize={fontSize} />
        )}

        {activeView === 'canticos' && (
          <CanticlesCatalogView fontSize={fontSize} />
        )}

        {activeView === 'calendario' && (
          <CalendarView
            currentDate={currentDate}
            onSelectDate={(d) => setCurrentDate(d)}
            onOpenOfficeForDate={handleSelectDateAndOpen}
          />
        )}

        {activeView === 'ocasioes' && (
          <OccasionsView />
        )}

        {activeView === 'sobre' && (
          <AboutView />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-center text-xs font-sans text-stone-500 dark:text-stone-400">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="font-serif italic text-stone-700 dark:text-stone-300 text-sm">
            «Orai sem cessar, ouvindo diariamente as Escrituras e oferecendo a Deus o louvor.»
          </p>
          <p>
            Ofício Diário & Lecionário · Rede Episcopal Brasileira (REB) · Província de Tradição Anglicana
          </p>
          <p className="text-[11px] text-stone-400">
            Aprovado com o <em>jus liturgicum</em> pelo Bispo Diocesano e Conselho Diocesano da REB.
          </p>
        </div>
      </footer>
    </div>
  );
}
