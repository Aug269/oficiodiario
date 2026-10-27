import React, { useState } from 'react';
import { WEEKLY_OFFICES } from '../data/liturgyData';
import { WeeklyOffice } from '../types/liturgy';
import { Calendar, Cross, Flame, Moon, Sparkles } from 'lucide-react';

interface WeeklyOfficeViewProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export const WeeklyOfficeView: React.FC<WeeklyOfficeViewProps> = ({ fontSize }) => {
  const todayDay = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState<number>(todayDay);

  const current: WeeklyOffice = WEEKLY_OFFICES.find(w => w.dayOfWeek === selectedDay) || WEEKLY_OFFICES[0];

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
          Ritmo Breve Cotidiano
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Ofício para a Semana
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          Uma forma breve e fixa de oração para cada dia, ideal para dias de rotina intensa, mantendo a comunhão diária com a Igreja.
        </p>

        {/* Day selector buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200/60 dark:border-stone-800">
          {WEEKLY_OFFICES.map(day => (
            <button
              key={day.dayOfWeek}
              onClick={() => setSelectedDay(day.dayOfWeek)}
              className={`px-3 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
                selectedDay === day.dayOfWeek
                  ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              {day.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Devotional Card for Selected Day */}
      <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
        <div className="text-center pb-4 border-b border-stone-100 dark:border-stone-800">
          <span className="text-xs font-sans tracking-widest uppercase text-stone-400 dark:text-stone-500">
            {current.name}
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-200 mt-1">
            {current.theme}
          </h2>
        </div>

        {/* Abertura */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-[#b91c1c] dark:text-rose-400 mb-2">
            Abertura {current.openingRef && `· ${current.openingRef}`}
          </h3>
          <div className="pl-4 border-l-2 border-[#b91c1c]/40 space-y-1">
            <p className="text-stone-800 dark:text-stone-200 font-serif">
              {current.opening}
            </p>
            <p className="text-stone-900 dark:text-stone-100 font-bold font-serif">
              {current.openingResponse}
            </p>
          </div>
        </div>

        {/* Oração */}
        <div className="pt-2">
          <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-[#b91c1c] dark:text-rose-400 mb-2">
            Oração do Dia
          </h3>
          <div className="p-5 rounded-xl bg-amber-50/40 dark:bg-stone-950/40 border border-amber-200/40 dark:border-stone-800/80">
            <p className="leading-relaxed font-serif text-stone-800 dark:text-stone-200 whitespace-pre-line">
              {current.prayer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
