import React, { useState } from 'react';
import { getLiturgicalInfo, LiturgicalDayInfo } from '../services/liturgicalCalendar';
import { Calendar, ChevronLeft, ChevronRight, Sparkles, BookOpen, Clock } from 'lucide-react';

interface CalendarViewProps {
  currentDate: Date;
  onSelectDate: (d: Date) => void;
  onOpenOfficeForDate: (d: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  currentDate,
  onSelectDate,
  onOpenOfficeForDate
}) => {
  const [activeDate, setActiveDate] = useState<Date>(new Date(currentDate));
  const [showTableModal, setShowTableModal] = useState<boolean>(false);

  const info: LiturgicalDayInfo = getLiturgicalInfo(activeDate);

  const changeDay = (delta: number) => {
    const next = new Date(activeDate);
    next.setDate(next.getDate() + delta);
    setActiveDate(next);
    onSelectDate(next);
  };

  const setToday = () => {
    const now = new Date();
    setActiveDate(now);
    onSelectDate(now);
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const parts = e.target.value.split('-');
    const picked = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    setActiveDate(picked);
    onSelectDate(picked);
  };

  const colorBadgeStyle = {
    purple: 'bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800',
    white: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-stone-800 dark:text-amber-200 dark:border-stone-700',
    red: 'bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800',
    green: 'bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
  }[info.color];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-8 font-serif">
      <header className="mb-8 text-center border-b border-stone-200/80 dark:border-stone-800 pb-6">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Ordem Litúrgica & Lecionário
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Calendário do Ano Cristão
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          Cálculo perpétuo do ciclo litúrgico (Anos A, B e C), datas móveis e celebrações da Rede Episcopal Brasileira.
        </p>

        {/* Date Selector Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1 bg-white dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <button
              onClick={() => changeDay(-1)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Dia anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={setToday}
              className="px-3 py-1 text-xs font-sans font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
            >
              Hoje
            </button>
            <button
              onClick={() => changeDay(1)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Próximo dia"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <input
            type="date"
            value={activeDate.toISOString().slice(0, 10)}
            onChange={handleDateInput}
            className="px-3 py-2 text-xs font-sans rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 shadow-xs focus:outline-hidden"
          />

          <button
            onClick={() => setShowTableModal(!showTableModal)}
            className="px-3 py-2 text-xs font-sans font-semibold rounded-xl border border-[#4a153b]/30 bg-[#4a153b]/10 text-[#4a153b] dark:text-rose-300 hover:bg-[#4a153b]/20 transition-colors"
          >
            Tábua de Datas Móveis (2026–2075)
          </button>
        </div>
      </header>

      {/* Main Liturgical Card */}
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wider uppercase border ${colorBadgeStyle}`}>
            Cor: {info.colorName}
          </span>
          <span className="text-xs font-sans font-semibold text-stone-500 uppercase tracking-widest">
            Ciclo Litúrgico: Ano {info.cycle}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#4a153b] dark:text-rose-100 mb-2">
          {info.title}
        </h2>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 capitalize mb-6">
          {info.dateFormatted}
        </p>

        <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-sm font-sans">
          <div className="flex justify-between items-center py-2 border-b border-stone-100/60 dark:border-stone-800/60">
            <span className="text-stone-500">Tempo Litúrgico:</span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{info.season}</span>
          </div>
          {info.proprioNumber && (
            <div className="flex justify-between items-center py-2 border-b border-stone-100/60 dark:border-stone-800/60">
              <span className="text-stone-500">Próprio do Tempo Comum:</span>
              <span className="font-semibold text-stone-800 dark:text-stone-200">Próprio {info.proprioNumber}</span>
            </div>
          )}
          {info.isRedLetterDay && (
            <div className="flex justify-between items-center py-2 border-b border-stone-100/60 dark:border-stone-800/60 text-[#b91c1c] dark:text-rose-400">
              <span>Dia Santo de Letra Vermelha:</span>
              <span className="font-bold">{info.holyDay}</span>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 flex gap-3">
          <button
            onClick={() => onOpenOfficeForDate(activeDate)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#4a153b] hover:bg-[#5a1b49] text-white font-sans text-sm font-semibold shadow-sm transition-all active:scale-98"
          >
            <BookOpen className="w-4 h-4" />
            Rezar Ofício Diário Deste Dia
          </button>
        </div>
      </div>

      {/* Modal / Section: Tábua de Datas Móveis (p. 173-174 do PDF) */}
      {showTableModal && (
        <section className="mt-10 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800">
            <h3 className="font-display font-bold text-lg text-[#4a153b] dark:text-rose-200">
              Tábua de Datas Móveis Oficial (REB 2026–2035)
            </h3>
            <button
              onClick={() => setShowTableModal(false)}
              className="text-xs font-sans text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
            >
              Fechar
            </button>
          </div>
          <p className="text-xs font-sans text-stone-500 italic mt-2 mb-4">
            Conforme publicado no Livro de Oração Comum da Rede Episcopal Brasileira (página 173). O Ano A começa no 1º Domingo do Advento em anos divisíveis por 3.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-stone-100 dark:bg-stone-800/70 text-stone-700 dark:text-stone-300">
                <tr>
                  <th className="p-2.5">Ano</th>
                  <th className="p-2.5">Ciclo</th>
                  <th className="p-2.5">Cinzas</th>
                  <th className="p-2.5">Páscoa</th>
                  <th className="p-2.5">Ascensão</th>
                  <th className="p-2.5">Pentecostes</th>
                  <th className="p-2.5">Próprio após Trindade</th>
                  <th className="p-2.5">1º Dom Advento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2026</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">A</td>
                  <td className="p-2.5">18 fev</td>
                  <td className="p-2.5">5 abr</td>
                  <td className="p-2.5">14 mai</td>
                  <td className="p-2.5">24 mai</td>
                  <td className="p-2.5">Próprio 5</td>
                  <td className="p-2.5 font-semibold">29 nov (B)</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2027</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">B</td>
                  <td className="p-2.5">10 fev</td>
                  <td className="p-2.5">28 mar</td>
                  <td className="p-2.5">6 mai</td>
                  <td className="p-2.5">16 mai</td>
                  <td className="p-2.5">Próprio 4</td>
                  <td className="p-2.5 font-semibold">28 nov (C)</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2028</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">C</td>
                  <td className="p-2.5">1 mar</td>
                  <td className="p-2.5">16 abr</td>
                  <td className="p-2.5">25 mai</td>
                  <td className="p-2.5">4 jun</td>
                  <td className="p-2.5">Próprio 6</td>
                  <td className="p-2.5 font-semibold">3 dez (A)</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2029</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">A</td>
                  <td className="p-2.5">14 fev</td>
                  <td className="p-2.5">1 abr</td>
                  <td className="p-2.5">10 mai</td>
                  <td className="p-2.5">20 mai</td>
                  <td className="p-2.5">Próprio 4</td>
                  <td className="p-2.5 font-semibold">2 dez (B)</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2030</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">B</td>
                  <td className="p-2.5">6 mar</td>
                  <td className="p-2.5">21 abr</td>
                  <td className="p-2.5">30 mai</td>
                  <td className="p-2.5">9 jun</td>
                  <td className="p-2.5">Próprio 7</td>
                  <td className="p-2.5 font-semibold">1 dez (C)</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2031</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">C</td>
                  <td className="p-2.5">26 fev</td>
                  <td className="p-2.5">13 abr</td>
                  <td className="p-2.5">22 mai</td>
                  <td className="p-2.5">1 jun</td>
                  <td className="p-2.5">Próprio 6</td>
                  <td className="p-2.5 font-semibold">30 nov (A)</td>
                </tr>
                <tr className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                  <td className="p-2.5 font-bold">2032</td>
                  <td className="p-2.5 font-bold text-[#b91c1c]">A</td>
                  <td className="p-2.5">11 fev</td>
                  <td className="p-2.5">28 mar</td>
                  <td className="p-2.5">6 mai</td>
                  <td className="p-2.5">16 mai</td>
                  <td className="p-2.5">Próprio 4</td>
                  <td className="p-2.5 font-semibold">28 nov (B)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
