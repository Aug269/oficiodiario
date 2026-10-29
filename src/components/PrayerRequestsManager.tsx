import React, { useState, useEffect } from 'react';
import { PrayerRequest, CustomPrayer, PrayerCategory } from '../types/customPrayers';
import { 
  getPrayerRequests, 
  savePrayerRequest, 
  removePrayerRequest, 
  togglePrayerRequestStatus,
  getCustomPrayers,
  saveCustomPrayer,
  removeCustomPrayer,
  exportPrayersData,
  importPrayersData
} from '../services/customPrayerService';
import { ADDITIONAL_PRAYERS } from '../data/liturgyData';
import { isBookmarked, saveBookmark, removeBookmark } from '../services/bookmarkService';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  Circle, 
  Heart, 
  Bookmark, 
  BookmarkCheck, 
  X, 
  BookOpen, 
  FolderHeart,
  MessageSquareHeart,
  Check,
  Download,
  Upload,
  Copy,
  HardDrive,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface PrayerRequestsManagerProps {
  compact?: boolean;
  initialSubTab?: 'pedidos' | 'minhas' | 'livro';
  onClose?: () => void;
}

const CATEGORY_LABELS: Record<PrayerCategory, { label: string; color: string }> = {
  familia: { label: 'Família', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  saude: { label: 'Saúde & Cura', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  igreja: { label: 'Igreja & Missão', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  amigos: { label: 'Amigos & Próximo', color: 'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
  trabalho: { label: 'Trabalho & Estudos', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  gratidao: { label: 'Agradecimento', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
  outros: { label: 'Geral', color: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700' }
};

export const PrayerRequestsManager: React.FC<PrayerRequestsManagerProps> = ({ 
  compact = false, 
  initialSubTab = 'pedidos'
}) => {
  const [subTab, setSubTab] = useState<'pedidos' | 'minhas' | 'livro'>(initialSubTab);
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [customPrayers, setCustomPrayers] = useState<CustomPrayer[]>([]);
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});

  // Modals / Form states
  const [isAddingRequest, setIsAddingRequest] = useState<boolean>(false);
  const [editingRequest, setEditingRequest] = useState<PrayerRequest | null>(null);
  const [reqIntention, setReqIntention] = useState<string>('');
  const [reqDetails, setReqDetails] = useState<string>('');
  const [reqCategory, setReqCategory] = useState<PrayerCategory>('familia');

  const [isAddingPrayer, setIsAddingPrayer] = useState<boolean>(false);
  const [editingPrayer, setEditingPrayer] = useState<CustomPrayer | null>(null);
  const [prayerTitle, setPrayerTitle] = useState<string>('');
  const [prayerText, setPrayerText] = useState<string>('');
  const [prayerAuthor, setPrayerAuthor] = useState<string>('');

  // Filter for requests
  const [requestFilter, setRequestFilter] = useState<'todas' | 'ativas' | 'respondidas'>('ativas');

  // Backup & Import states
  const [showBackupModal, setShowBackupModal] = useState<boolean>(false);
  const [copiedBackup, setCopiedBackup] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [importFeedback, setImportFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleExportDownload = () => {
    const jsonStr = exportPrayersData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-oracoes-reb-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCopy = async () => {
    try {
      const jsonStr = exportPrayersData();
      await navigator.clipboard.writeText(jsonStr);
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 2500);
    } catch (err) {
      console.error('Erro ao copiar backup:', err);
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;

    const res = importPrayersData(importJsonText.trim(), importMode);
    if (res.success) {
      setImportFeedback({
        type: 'success',
        message: `Importado com sucesso! ${res.requestsCount} pedidos, ${res.prayersCount} orações e ${res.bookmarksCount} marcadores.`
      });
      setImportJsonText('');
      setTimeout(() => {
        setImportFeedback(null);
        setShowBackupModal(false);
      }, 2000);
    } else {
      setImportFeedback({
        type: 'error',
        message: res.error || 'Falha ao importar dados.'
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      if (content) {
        setImportJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  const loadData = () => {
    setRequests(getPrayerRequests());
    setCustomPrayers(getCustomPrayers());

    const bMap: Record<string, boolean> = {};
    ADDITIONAL_PRAYERS.forEach((p, idx) => {
      bMap[`adicional-${idx}`] = isBookmarked(`adicional-${idx}`);
    });
    getCustomPrayers().forEach(p => {
      bMap[`custom-prayer-${p.id}`] = isBookmarked(`custom-prayer-${p.id}`);
    });
    getPrayerRequests().forEach(r => {
      bMap[`prayer-req-${r.id}`] = isBookmarked(`prayer-req-${r.id}`);
    });
    setBookmarkedMap(bMap);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('custom_prayers_updated', handleUpdate);
    window.addEventListener('bookmarks_updated', handleUpdate);
    return () => {
      window.removeEventListener('custom_prayers_updated', handleUpdate);
      window.removeEventListener('bookmarks_updated', handleUpdate);
    };
  }, []);

  const handleSaveRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqIntention.trim()) return;

    const requestItem: PrayerRequest = {
      id: editingRequest ? editingRequest.id : `req-${Date.now()}`,
      personOrIntention: reqIntention.trim(),
      details: reqDetails.trim() || undefined,
      category: reqCategory,
      createdAt: editingRequest ? editingRequest.createdAt : new Date().toLocaleDateString('pt-BR'),
      status: editingRequest ? editingRequest.status : 'ativa'
    };

    savePrayerRequest(requestItem);
    setIsAddingRequest(false);
    setEditingRequest(null);
    setReqIntention('');
    setReqDetails('');
    setReqCategory('familia');
  };

  const handleStartEditRequest = (req: PrayerRequest) => {
    setEditingRequest(req);
    setReqIntention(req.personOrIntention);
    setReqDetails(req.details || '');
    setReqCategory(req.category);
    setIsAddingRequest(true);
  };

  const handleSaveCustomPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerTitle.trim() || !prayerText.trim()) return;

    const prayerItem: CustomPrayer = {
      id: editingPrayer ? editingPrayer.id : `prayer-${Date.now()}`,
      title: prayerTitle.trim(),
      text: prayerText.trim(),
      authorOrSource: prayerAuthor.trim() || 'Oração Pessoal',
      createdAt: editingPrayer ? editingPrayer.createdAt : new Date().toLocaleDateString('pt-BR')
    };

    saveCustomPrayer(prayerItem);
    setIsAddingPrayer(false);
    setEditingPrayer(null);
    setPrayerTitle('');
    setPrayerText('');
    setPrayerAuthor('');
  };

  const handleStartEditPrayer = (p: CustomPrayer) => {
    setEditingPrayer(p);
    setPrayerTitle(p.title);
    setPrayerText(p.text);
    setPrayerAuthor(p.authorOrSource || '');
    setIsAddingPrayer(true);
  };

  const toggleBookmarkGeneric = (id: string, title: string, text: string) => {
    if (bookmarkedMap[id]) {
      removeBookmark(id);
    } else {
      saveBookmark({
        id,
        officeId: 'familias',
        officeTitle: 'Orações Adicionais da Família',
        sectionTitle: title,
        snippet: text.slice(0, 180) + (text.length > 180 ? '...' : ''),
        savedAt: new Date().toLocaleDateString('pt-BR')
      });
    }
  };

  const filteredRequests = requests.filter(r => {
    if (requestFilter === 'ativas') return r.status === 'ativa';
    if (requestFilter === 'respondidas') return r.status === 'respondida';
    return true;
  });

  const activeCount = requests.filter(r => r.status === 'ativa').length;

  return (
    <div className={`space-y-5 ${compact ? 'text-sm' : ''}`}>
      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 dark:border-stone-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSubTab('pedidos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors cursor-pointer ${
              subTab === 'pedidos'
                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70'
            }`}
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Pedidos de Oração</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              subTab === 'pedidos' ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
            }`}>
              {activeCount}
            </span>
          </button>

          <button
            onClick={() => setSubTab('minhas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors cursor-pointer ${
              subTab === 'minhas'
                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70'
            }`}
          >
            <FolderHeart className="w-3.5 h-3.5 text-rose-500" />
            <span>Minhas Orações</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              subTab === 'minhas' ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
            }`}>
              {customPrayers.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('livro')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors cursor-pointer ${
              subTab === 'livro'
                ? 'bg-[#4a153b] text-white shadow-xs font-semibold'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Orações do Livro (pp. 87–89)</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setImportFeedback(null);
              setShowBackupModal(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-sans font-medium hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-colors shadow-2xs cursor-pointer"
            title="Como persistir, exportar e restaurar pedidos de oração"
          >
            <HardDrive className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Persistência & Backup</span>
            <span className="sm:hidden">Backup</span>
          </button>

          {/* Action Button for current tab */}
          {subTab === 'pedidos' && (
            <button
              onClick={() => {
                setEditingRequest(null);
                setReqIntention('');
                setReqDetails('');
                setReqCategory('familia');
                setIsAddingRequest(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#b91c1c] text-white text-xs font-sans font-semibold hover:bg-[#991b1b] transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Pedido</span>
            </button>
          )}

          {subTab === 'minhas' && (
            <button
              onClick={() => {
                setEditingPrayer(null);
                setPrayerTitle('');
                setPrayerText('');
                setPrayerAuthor('');
                setIsAddingPrayer(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#4a153b] text-white text-xs font-sans font-semibold hover:bg-[#38102d] transition-colors shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Oração</span>
            </button>
          )}
        </div>
      </div>

      {/* BACKUP & PERSISTENCE MODAL */}
      {showBackupModal && (
        <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 space-y-4 animate-fade-in shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-display font-bold text-stone-900 dark:text-stone-100 text-base">
                Persistência & Backup das Orações
              </h4>
            </div>
            <button
              onClick={() => setShowBackupModal(false)}
              className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 leading-relaxed space-y-2">
            <div className="flex items-start gap-2">
              <HardDrive className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100">
                  Como seus pedidos estão salvos:
                </p>
                <p className="mt-0.5">
                  Todos os pedidos e orações pessoais são salvos automaticamente no armazenamento local deste navegador (<code className="px-1 py-0.5 bg-stone-100 dark:bg-stone-900 rounded text-[11px]">localStorage</code>). Eles permanecem salvos entre visitas e funcionam 100% offline.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* EXPORT SECTION */}
            <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2.5">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#4a153b] dark:text-rose-300 block">
                Exportar / Fazer Backup
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Gere um arquivo de segurança para guardar seus pedidos e orações ou transferi-los para outro aparelho.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleExportDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4a153b] text-white text-xs font-sans font-semibold hover:bg-[#38102d] transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Arquivo (.json)</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-sans font-medium hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedBackup ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>
            </div>

            {/* IMPORT SECTION */}
            <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2.5">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#b91c1c] dark:text-rose-400 block">
                Restaurar / Importar
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Restaure um backup anterior colando o JSON ou selecionando o arquivo baixado.
              </p>
              <form onSubmit={handleImportSubmit} className="space-y-2">
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-stone-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
                />
                <textarea
                  rows={2}
                  placeholder="Ou cole aqui o conteúdo JSON do backup..."
                  value={importJsonText}
                  onChange={e => setImportJsonText(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-3 text-xs">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="importMode"
                        checked={importMode === 'merge'}
                        onChange={() => setImportMode('merge')}
                      />
                      <span>Mesclar</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="importMode"
                        checked={importMode === 'replace'}
                        onChange={() => setImportMode('replace')}
                      />
                      <span>Substituir</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#b91c1c] text-white text-xs font-sans font-semibold hover:bg-[#991b1b] transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Importar</span>
                  </button>
                </div>
              </form>

              {importFeedback && (
                <p className={`text-xs font-medium p-2 rounded-lg ${
                  importFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                }`}>
                  {importFeedback.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FORM: ADD / EDIT PRAYER REQUEST */}
      {isAddingRequest && (
        <form onSubmit={handleSaveRequest} className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-stone-900 border border-amber-300/60 dark:border-stone-700 space-y-3 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-stone-800">
            <h4 className="font-display font-bold text-stone-900 dark:text-stone-100 text-base">
              {editingRequest ? 'Editar Pedido de Oração' : 'Adicionar Novo Pedido de Oração'}
            </h4>
            <button
              type="button"
              onClick={() => { setIsAddingRequest(false); setEditingRequest(null); }}
              className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Motivo ou Pessoa pela qual interceder *
            </label>
            <input
              type="text"
              required
              placeholder="Ex.: Pela saúde da minha mãe; Pela paz no mundo; Pela aprovação no concurso..."
              value={reqIntention}
              onChange={e => setReqIntention(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a153b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Categoria
              </label>
              <select
                value={reqCategory}
                onChange={e => setReqCategory(e.target.value as PrayerCategory)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a153b]"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, item]) => (
                  <option key={key} value={key}>{item.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Detalhes ou Nota adicional (opcional)
              </label>
              <input
                type="text"
                placeholder="Ex.: Exames na quinta-feira; Em recuperação..."
                value={reqDetails}
                onChange={e => setReqDetails(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a153b]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => { setIsAddingRequest(false); setEditingRequest(null); }}
              className="px-3 py-1.5 rounded-lg text-xs font-sans text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#4a153b] text-white text-xs font-sans font-semibold hover:bg-[#38102d] transition-colors cursor-pointer"
            >
              {editingRequest ? 'Salvar Alterações' : 'Adicionar ao Caderno'}
            </button>
          </div>
        </form>
      )}

      {/* FORM: ADD / EDIT CUSTOM PRAYER */}
      {isAddingPrayer && (
        <form onSubmit={handleSaveCustomPrayer} className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-stone-900 border border-amber-300/60 dark:border-stone-700 space-y-3 animate-fade-in shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-stone-800">
            <h4 className="font-display font-bold text-stone-900 dark:text-stone-100 text-base">
              {editingPrayer ? 'Editar Oração Pessoal' : 'Adicionar Minha Própria Oração'}
            </h4>
            <button
              type="button"
              onClick={() => { setIsAddingPrayer(false); setEditingPrayer(null); }}
              className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Título da Oração *
              </label>
              <input
                type="text"
                required
                placeholder="Ex.: Oração pela Paz no Lar; Oração de Gratidão..."
                value={prayerTitle}
                onChange={e => setPrayerTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a153b]"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Autor ou Origem (opcional)
              </label>
              <input
                type="text"
                placeholder="Ex.: Oração Pessoal; Santo Agostinho; Tradicional..."
                value={prayerAuthor}
                onChange={e => setPrayerAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a153b]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Texto da Oração *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Escreva aqui as palavras da oração para rezar com sua família ou individualmente..."
              value={prayerText}
              onChange={e => setPrayerText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-serif leading-relaxed text-sm focus:outline-none focus:ring-2 focus:ring-[#4a153b]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => { setIsAddingPrayer(false); setEditingPrayer(null); }}
              className="px-3 py-1.5 rounded-lg text-xs font-sans text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#4a153b] text-white text-xs font-sans font-semibold hover:bg-[#38102d] transition-colors cursor-pointer"
            >
              {editingPrayer ? 'Salvar Alterações' : 'Salvar Oração'}
            </button>
          </div>
        </form>
      )}

      {/* VIEW 1: PEDIDOS DE ORAÇÃO */}
      {subTab === 'pedidos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic">
              Intercessões e intenções para lembrar na oração em família:
            </p>

            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg text-xs font-sans">
              <button
                onClick={() => setRequestFilter('ativas')}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  requestFilter === 'ativas' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white font-medium shadow-2xs' : 'text-stone-500'
                }`}
              >
                Em Oração
              </button>
              <button
                onClick={() => setRequestFilter('respondidas')}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  requestFilter === 'respondidas' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white font-medium shadow-2xs' : 'text-stone-500'
                }`}
              >
                Respondidas
              </button>
              <button
                onClick={() => setRequestFilter('todas')}
                className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  requestFilter === 'todas' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white font-medium shadow-2xs' : 'text-stone-500'
                }`}
              >
                Todas ({requests.length})
              </button>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
              <MessageSquareHeart className="w-8 h-8 mx-auto text-stone-400 mb-2 opacity-60" />
              <p className="text-sm font-sans font-medium text-stone-600 dark:text-stone-400">
                Nenhum pedido de oração encontrado neste filtro.
              </p>
              <button
                onClick={() => { setIsAddingRequest(true); setEditingRequest(null); }}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b91c1c] text-white text-xs font-sans font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Primeiro Pedido</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5">
              {filteredRequests.map(req => {
                const isMarked = !!bookmarkedMap[`prayer-req-${req.id}`];
                const catInfo = CATEGORY_LABELS[req.category] || CATEGORY_LABELS.outros;

                return (
                  <div
                    key={req.id}
                    className={`p-4 rounded-xl border transition-all ${
                      req.status === 'respondida'
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40 opacity-90'
                        : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 shadow-2xs hover:border-amber-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1">
                        <button
                          onClick={() => togglePrayerRequestStatus(req.id)}
                          className="mt-0.5 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                          title={req.status === 'respondida' ? 'Marcar como Em Oração' : 'Marcar como Oração Respondida / Agradecer'}
                        >
                          {req.status === 'respondida' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-semibold border ${catInfo.color}`}>
                              {catInfo.label}
                            </span>
                            {req.status === 'respondida' && (
                              <span className="flex items-center gap-1 text-[11px] font-sans font-semibold text-emerald-700 dark:text-emerald-300">
                                <Check className="w-3 h-3" />
                                <span>Oração Respondida / Agradecimento</span>
                              </span>
                            )}
                            <span className="text-[11px] font-sans text-stone-400">
                              {req.createdAt}
                            </span>
                          </div>

                          <h5 className={`font-serif text-base leading-snug ${
                            req.status === 'respondida' ? 'line-through text-stone-500 dark:text-stone-400' : 'font-semibold text-stone-900 dark:text-stone-100'
                          }`}>
                            {req.personOrIntention}
                          </h5>

                          {req.details && (
                            <p className="text-xs font-sans text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                              {req.details}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmarkGeneric(`prayer-req-${req.id}`, `Pedido: ${req.personOrIntention}`, req.details || req.personOrIntention)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isMarked ? 'text-[#4a153b] dark:text-rose-300' : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                          }`}
                          title="Salvar nos Marcadores"
                        >
                          {isMarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleStartEditRequest(req)}
                          className="p-1.5 rounded-lg text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                          title="Editar pedido"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => removePrayerRequest(req.id)}
                          className="p-1.5 rounded-lg text-stone-300 hover:text-rose-600 dark:text-stone-600 dark:hover:text-rose-400 cursor-pointer"
                          title="Remover pedido"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: MINHAS ORAÇÕES */}
      {subTab === 'minhas' && (
        <div className="space-y-4">
          <p className="text-xs font-sans text-stone-500 dark:text-stone-400 italic">
            Orações pessoais e preces compostas para a sua família:
          </p>

          {customPrayers.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
              <FolderHeart className="w-8 h-8 mx-auto text-stone-400 mb-2 opacity-60" />
              <p className="text-sm font-sans font-medium text-stone-600 dark:text-stone-400">
                Você ainda não adicionou nenhuma oração pessoal.
              </p>
              <button
                onClick={() => { setIsAddingPrayer(true); setEditingPrayer(null); }}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4a153b] text-white text-xs font-sans font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Criar Minha Primeira Oração</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {customPrayers.map(prayer => {
                const isMarked = !!bookmarkedMap[`custom-prayer-${prayer.id}`];

                return (
                  <div
                    key={prayer.id}
                    className="p-5 sm:p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
                      <div>
                        <h4 className="font-display font-bold text-lg text-[#4a153b] dark:text-rose-200">
                          {prayer.title}
                        </h4>
                        <span className="text-[11px] font-sans text-stone-400">
                          {prayer.authorOrSource || 'Oração Pessoal'} · Cadastrada em {prayer.createdAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmarkGeneric(`custom-prayer-${prayer.id}`, prayer.title, prayer.text)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isMarked ? 'text-[#4a153b] dark:text-rose-300' : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                          }`}
                          title="Salvar nos Marcadores"
                        >
                          {isMarked ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleStartEditPrayer(prayer)}
                          className="p-1.5 rounded-lg text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300 cursor-pointer"
                          title="Editar oração"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => removeCustomPrayer(prayer.id)}
                          className="p-1.5 rounded-lg text-stone-300 hover:text-rose-600 dark:text-stone-600 dark:hover:text-rose-400 cursor-pointer"
                          title="Remover oração"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif whitespace-pre-line text-base sm:text-lg">
                      {prayer.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: ORAÇÕES DO LIVRO (PÁGINAS 87–89) */}
      {subTab === 'livro' && (
        <div className="space-y-4">
          <p className="text-[#b91c1c] dark:text-rose-400 font-serif italic text-sm sm:text-base">
            Orações para a família e para momentos de intercessão e súplica do livro da REB:
          </p>

          <div className="space-y-4">
            {ADDITIONAL_PRAYERS.map((prayer, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-lg font-display font-bold text-[#4a153b] dark:text-rose-200">
                    {prayer.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-sans text-stone-400">Pág. {prayer.page}</span>
                    <button
                      onClick={() => toggleBookmarkGeneric(`adicional-${i}`, prayer.title, prayer.text)}
                      className={`p-1 rounded cursor-pointer transition-colors ${
                        bookmarkedMap[`adicional-${i}`] ? 'text-[#4a153b] dark:text-rose-300' : 'text-stone-300 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-300'
                      }`}
                      title="Salvar nos Marcadores"
                    >
                      {bookmarkedMap[`adicional-${i}`] ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-base sm:text-lg">
                  {prayer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
