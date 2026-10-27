import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Check if in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
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
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#4a153b]/30 bg-[#4a153b]/5 hover:bg-[#4a153b]/10 text-[#4a153b] dark:text-rose-200 dark:border-rose-300/30 dark:bg-rose-950/20 transition-colors"
        title="Instalar Ofício Diário REB no dispositivo"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Instalar App</span>
        <span className="sm:hidden">Instalar</span>
      </button>

      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2 text-[#4a153b] dark:text-rose-300">
                <Smartphone className="w-5 h-5" />
                <h3 className="font-serif font-bold text-base">Instalar no iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ol className="mt-4 space-y-3 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4a153b]/10 text-[#4a153b] font-bold flex items-center justify-center shrink-0">1</span>
                <span>Toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta para cima) na barra inferior do Safari.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4a153b]/10 text-[#4a153b] font-bold flex items-center justify-center shrink-0">2</span>
                <span>Role a lista para baixo e toque em <strong>Adicionar à Tela de Início</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#4a153b]/10 text-[#4a153b] font-bold flex items-center justify-center shrink-0">3</span>
                <span>Toque em <strong>Adicionar</strong> no canto superior direito para rezar sem precisar de internet.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full py-2.5 rounded-lg bg-[#4a153b] text-white text-xs font-semibold hover:bg-[#5a1b49] transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
};
