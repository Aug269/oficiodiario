import React, { useEffect, useState } from 'react';
import { Download, Smartphone, Monitor, CheckCircle, X, HelpCircle, Share2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Check if in standalone mode (already installed as PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isIOSDevice);

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
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setDeferredPrompt(null);
        }
      } catch {
        setShowGuideModal(true);
      }
    } else {
      // If browser doesn't provide beforeinstallprompt (e.g. desktop, iOS Safari, or in iframe preview)
      setShowGuideModal(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
        <CheckCircle className="w-3.5 h-3.5" />
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
      </button>

      {/* Guided Installation Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 text-[#4a153b] dark:text-rose-300">
                <Download className="w-5 h-5 text-[#b91c1c] dark:text-rose-400" />
                <h3 className="font-display font-bold text-base sm:text-lg">Instalar Ofício Diário</h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-sans text-stone-600 dark:text-stone-300 leading-relaxed">
              O aplicativo foi configurado com tecnologia <strong>Progressive Web App (PWA)</strong> e funciona como um aplicativo nativo completo, inclusive <strong>sem internet (offline)</strong>.
            </p>

            {/* Instruction Tabs based on Platform */}
            <div className="space-y-3 pt-1">
              {isIOS ? (
                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-stone-950/50 border border-amber-200/80 dark:border-stone-800 text-xs font-sans space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-[#4a153b] dark:text-rose-300">
                    <Smartphone className="w-4 h-4" />
                    <span>No iPhone ou iPad (Safari):</span>
                  </div>
                  <ol className="space-y-2 text-stone-700 dark:text-stone-300 pl-4 list-decimal leading-relaxed">
                    <li>Toque no botão <strong>Compartilhar</strong> <Share2 className="w-3 h-3 inline text-blue-500" /> (na barra inferior do Safari).</li>
                    <li>Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.</li>
                    <li>Toque em <strong>Adicionar</strong> no canto superior direito.</li>
                  </ol>
                </div>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 text-xs font-sans space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#4a153b] dark:text-rose-300">
                      <Smartphone className="w-4 h-4" />
                      <span>No Celular Android (Chrome / Edge / Firefox):</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 pl-2">
                      Toque no menu do navegador (<strong>três pontinhos ⋮</strong> no topo) e escolha <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 text-xs font-sans space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#4a153b] dark:text-rose-300">
                      <Monitor className="w-4 h-4" />
                      <span>No Computador (Chrome / Edge):</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 pl-2">
                      Clique no ícone de instalação (<strong>⊕</strong> ou tela com seta) à direita na barra de endereços do navegador, ou no menu <strong>⋮ &gt; "Instalar Ofício Diário"</strong>.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#4a153b] hover:bg-[#5e1a4b] text-white text-xs font-sans font-semibold transition-all shadow-xs"
              >
                Compreendi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
