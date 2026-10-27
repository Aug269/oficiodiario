import React, { useState } from 'react';
import { ALL_COLLECTS, Collect } from '../data/collectsData';
import { Search, Sparkles, Bookmark, Copy, Check } from 'lucide-react';

interface CollectsCatalogViewProps {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export const CollectsCatalogView: React.FC<CollectsCatalogViewProps> = ({ fontSize }) => {
  const [selectedCategory, setSelectedCategory] = useState<Collect['category'] | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = ALL_COLLECTS.filter(c => {
    const matchesCat = selectedCategory === 'todos' || c.category === selectedCategory;
    const matchesQuery = !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.prayer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.season && c.season.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-loose'
  }[fontSize];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-8 font-serif">
      <header className="mb-8 text-center border-b border-stone-200/80 dark:border-stone-800 pb-6">
        <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#b91c1c] dark:text-rose-400 mb-2">
          Livro de Oração Comum · REB
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Coletas da Igreja
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          As preces coletivas do Ano Cristão, das Festas Principais, dos Dias Santos e das Comemorações históricas.
        </p>

        {/* Filter bar and search */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl border border-stone-200/70 dark:border-stone-800">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                selectedCategory === 'todos' ? 'bg-[#4a153b] text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Todas ({ALL_COLLECTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('ano-cristao')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                selectedCategory === 'ano-cristao' ? 'bg-[#4a153b] text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Ano Cristão
            </button>
            <button
              onClick={() => setSelectedCategory('dias-santos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                selectedCategory === 'dias-santos' ? 'bg-[#4a153b] text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Dias Santos
            </button>
            <button
              onClick={() => setSelectedCategory('comemoracoes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                selectedCategory === 'comemoracoes' ? 'bg-[#4a153b] text-white shadow-xs' : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Comemorações
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar coleta ou data..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-sans bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 focus:outline-hidden focus:border-[#4a153b]"
            />
          </div>
        </div>
      </header>

      {/* Collects list */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(item => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs hover:border-[#4a153b]/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#b91c1c] dark:text-rose-400">
                  {item.season || item.dateOrSunday || 'Coleta'}
                </span>
                <button
                  onClick={() => handleCopy(item.id, `${item.title}\n\n${item.prayer}`)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                  title="Copiar texto da oração"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <h2 className="text-base font-display font-bold text-[#4a153b] dark:text-rose-100 mb-3">
                {item.title}
              </h2>

              <p className={`${sizeClasses} text-stone-700 dark:text-stone-300 font-serif leading-relaxed`}>
                "{item.prayer}"
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm font-sans text-stone-500">
            Nenhuma coleta encontrada com o termo "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
