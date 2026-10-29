import React, { useEffect, useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle, 
  X, 
  Share2, 
  ExternalLink, 
  Copy, 
  Wifi, 
  Layers, 
  Check 
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    // 1. Detect standalone mode (already installed as PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    // 2. Detect device type
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    const isAndroidDevice = /android/.test(ua);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    // 3. Detect if running inside iframe (e.g. AI Studio build preview)
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }

    // 4. Check Service Worker status
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      setSwRegistered(true);
    } else if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => setSwRegistered(true)).catch(() => {});
    }

    // 5. Listen for Chromium beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // If native prompt is available (standalone tab on Chrome / Edge / Android)
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
          return;
        }
      } catch (err) {
        console.warn('Erro ao chamar prompt nativo:', err);
      }
    }

    // Otherwise (iOS, inside iframe, or already dismissed native prompt), open guide modal
    setShowGuideModal(true);
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // If already installed and running in standalone window
  if (isInstalled) {
    return (
      <div 
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded-lg text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
        title="O aplicativo está instalado e funcionando no modo nativo com suporte offline"
      >
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="hidden sm:inline">App Instalado</span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-semibold rounded-lg border border-[#4a153b]/30 bg-[#4a153b]/10 hover:bg-[#4a153b]/20 text-[#4a153b] dark:text-rose-200 dark:border-rose-400/30 dark:bg-rose-950/30 transition-all cursor-pointer shadow-2xs active:scale-95"
        title="Instalar Ofício Diário REB como aplicativo no seu celular ou computador"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Instalar App</span>
        {deferredPrompt && (
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Pronto para instalação com 1 clique" />
        )}
      </button>

      {/* Guided Installation Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-2xl space-y-4 my-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 text-[#4a153b] dark:text-rose-300">
                <div className="p-2 rounded-lg bg-[#4a153b]/10 dark:bg-rose-950/40 text-[#4a153b] dark:text-rose-300">
                  <Download className="w-5 h-5 text-[#b91c1c] dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg leading-tight">Instalar Ofício Diário REB</h3>
                  <p className="text-[11px] font-sans text-stone-500 dark:text-stone-400">Aplicativo Progressivo (PWA) com suporte offline</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If inside iframe (AI Studio build preview alert) */}
            {isInIframe && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs font-sans text-amber-900 dark:text-amber-200 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                  <span>Você está no modo de visualização integrada (iframe)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
                  Navegadores bloqueiam o botão de instalação nativo dentro de iframes por segurança. Para instalar com 1 clique ou usar no celular, abra diretamente no navegador:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleOpenInNewTab}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4a153b] hover:bg-[#5e1a4b] text-white font-semibold text-xs transition cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir em Nova Aba
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs transition cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Link Copiado!' : 'Copiar Link'}
                  </button>
                </div>
              </div>
            )}

            {/* Direct 1-Click Install Button if deferredPrompt is ready */}
            {deferredPrompt && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-sans space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Pronto para Instalação Direta!</span>
                </div>
                <p className="text-emerald-700 dark:text-emerald-300 text-xs">
                  Seu navegador suporta a instalação imediata na tela inicial ou área de trabalho.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition"
                >
                  <Download className="w-4 h-4" />
                  Instalar Agora no Aparelho
                </button>
              </div>
            )}

            {/* Platform Instructions */}
            <div className="space-y-3">
              {/* iOS Safari */}
              <div className={`p-3.5 rounded-xl border text-xs font-sans space-y-2 transition-all ${
                isIOS ? 'bg-[#4a153b]/5 dark:bg-rose-950/20 border-[#4a153b]/30' : 'bg-stone-50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[#4a153b] dark:text-rose-300">
                    <Smartphone className="w-4 h-4" />
                    <span>No iPhone ou iPad (Safari):</span>
                  </div>
                  {isIOS && <span className="px-2 py-0.5 text-[10px] rounded-md bg-[#4a153b] text-white font-medium">Seu Dispositivo</span>}
                </div>
                <ol className="space-y-1.5 text-stone-700 dark:text-stone-300 pl-4 list-decimal leading-relaxed">
                  <li>No Safari, toque no botão <strong>Compartilhar</strong> <Share2 className="w-3.5 h-3.5 inline text-blue-500" /> (barra inferior).</li>
                  <li>Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</li>
                  <li>Toque em <strong>"Adicionar"</strong> no canto superior direito para concluir.</li>
                </ol>
              </div>

              {/* Android */}
              <div className={`p-3.5 rounded-xl border text-xs font-sans space-y-2 transition-all ${
                isAndroid ? 'bg-[#4a153b]/5 dark:bg-rose-950/20 border-[#4a153b]/30' : 'bg-stone-50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-[#4a153b] dark:text-rose-300">
                    <Smartphone className="w-4 h-4" />
                    <span>No Celular Android (Chrome / Edge / Samsung Internet):</span>
                  </div>
                  {isAndroid && <span className="px-2 py-0.5 text-[10px] rounded-md bg-[#4a153b] text-white font-medium">Seu Dispositivo</span>}
                </div>
                <p className="text-stone-700 dark:text-stone-300 pl-2 leading-relaxed">
                  Toque no menu do navegador (<strong>três pontinhos ⋮</strong> no canto superior direito) e selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                </p>
              </div>

              {/* Computer / Desktop */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 text-xs font-sans space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#4a153b] dark:text-rose-300">
                  <Monitor className="w-4 h-4" />
                  <span>No Computador (Chrome / Edge / Brave):</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 pl-2 leading-relaxed">
                  Clique no ícone de instalação (<strong>⊕</strong> ou monitor com seta para baixo) na barra de endereços à direita, ou no menu <strong>⋮ &gt; "Instalar Ofício Diário REB"</strong>.
                </p>
              </div>
            </div>

            {/* PWA Advantages */}
            <div className="p-3 rounded-xl bg-stone-100/70 dark:bg-stone-800/40 text-[11px] font-sans text-stone-600 dark:text-stone-400 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vantagens do Aplicativo Instalado:</span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-stone-600 dark:text-stone-300">
                <li>Funciona sem internet (offline) para todas as orações e ofícios.</li>
                <li>Sem barras de navegação do navegador, ocupando a tela cheia.</li>
                <li>Carregamento ultra-rápido direto do dispositivo.</li>
                <li>Mantém seus pedidos de oração e marcadores salvos em segurança.</li>
              </ul>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-sans font-semibold transition cursor-pointer flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link'}</span>
              </button>

              <button
                onClick={() => setShowGuideModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#4a153b] hover:bg-[#5e1a4b] text-white text-xs font-sans font-semibold transition shadow-xs cursor-pointer text-center"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
