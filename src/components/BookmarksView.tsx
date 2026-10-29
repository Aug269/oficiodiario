import React, { useState, useEffect } from 'react';
import { BookmarkItem } from '../types/bookmark';
import { getBookmarks, removeBookmark, updateBookmarkNote } from '../services/bookmarkService';
import { Bookmark, Trash2, Edit3, ArrowRight, BookOpen, Search, Check } from 'lucide-react';

interface BookmarksViewProps {
  onNavigateToOffice: (officeId: string) => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  onNavigateToOffice,
  fontSize
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const loadBookmarks = () => {
    setBookmarks(getBookmarks());
  };

  useEffect(() => {
    loadBookmarks();
    const handleUpdate = () => loadBookmarks();
    window.addEventListener('bookmarks_updated', handleUpdate);
    return () => window.removeEventListener('bookmarks_updated', handleUpdate);
  }, []);

  const handleDelete = (id: string) => {
    removeBookmark(id);
  };

  const startEditNote = (b: BookmarkItem) => {
    setEditingId(b.id);
    setNoteText(b.note || '');
  };

  const saveNote = (id: string) => {
    updateBookmarkNote(id, noteText);
    setEditingId(null);
  };

  const filtered = bookmarks.filter(b => {
    const q = searchQuery.toLowerCase();
    return (
      b.sectionTitle.toLowerCase().includes(q) ||
      b.officeTitle.toLowerCase().includes(q) ||
      b.snippet.toLowerCase().includes(q) ||
      (b.note && b.note.toLowerCase().includes(q))
    );
  });

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
          Devocionário Pessoal
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#4a153b] dark:text-rose-100">
          Meus Marcadores
        </h1>
        <p className="text-sm font-sans text-stone-500 dark:text-stone-400 mt-2 max-w-xl mx-auto">
          Suas orações, salmos e leituras bíblicas salvas para acesso imediato e meditação contínua.
        </p>

        {bookmarks.length > 0 && (
          <div className="mt-6 max-w-sm mx-auto relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar em seus marcadores..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-sans rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-hidden focus:border-[#4a153b]"
            />
          </div>
        )}
      </header>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-stone-800 text-[#4a153b] dark:text-rose-300 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-stone-800 dark:text-stone-200">
            Nenhum marcador salvo ainda
          </h2>
          <p className="text-sm font-sans text-stone-500 max-w-md mx-auto mt-2 leading-relaxed">
            Ao rezar os Ofícios Diários, toque no ícone de <strong>marcador (Bookmark)</strong> ao lado dos títulos, salmos, orações e leituras bíblicas para salvá-los aqui com notas pessoais.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(b => (
            <div
              key={b.id}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-[#4a153b]/40 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[#b91c1c] dark:text-rose-400 block">
                    {b.officeTitle} · Salvo em {b.savedAt}
                  </span>
                  <h2 className="text-lg font-display font-bold text-[#4a153b] dark:text-rose-100 mt-0.5">
                    {b.sectionTitle}
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEditNote(b)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    title="Adicionar / editar anotação pessoal"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Remover marcador"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className={`font-serif text-stone-700 dark:text-stone-300 italic ${sizeClasses} line-clamp-3 bg-stone-50/60 dark:bg-stone-950/40 p-3.5 rounded-xl border border-stone-100 dark:border-stone-800`}>
                "{b.snippet}"
              </p>

              {/* Devotional Note */}
              {editingId === b.id ? (
                <div className="pt-2 space-y-2">
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Escreva sua reflexão ou intenção de oração para este trecho..."
                    rows={2}
                    className="w-full p-3 text-xs font-sans rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:outline-hidden focus:border-[#4a153b]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-xs font-sans text-stone-500 hover:text-stone-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => saveNote(b.id)}
                      className="flex items-center gap-1 px-3 py-1 text-xs font-sans font-semibold rounded-lg bg-[#4a153b] text-white"
                    >
                      <Check className="w-3.5 h-3.5" /> Salvar Nota
                    </button>
                  </div>
                </div>
              ) : b.note ? (
                <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-stone-950 border border-amber-200/60 dark:border-stone-800 text-xs font-sans text-amber-900 dark:text-amber-200">
                  <span className="font-semibold block mb-0.5">Sua anotação devocional:</span>
                  <p className="italic">{b.note}</p>
                </div>
              ) : null}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigateToOffice(b.officeId)}
                  className="flex items-center gap-1.5 text-xs font-sans font-semibold text-[#4a153b] dark:text-rose-300 hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Rezar neste Ofício</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center py-8 text-sm font-sans text-stone-500">
              Nenhum marcador correspondente à busca "{searchQuery}".
            </p>
          )}
        </div>
      )}
    </div>
  );
};
