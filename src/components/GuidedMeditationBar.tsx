import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Sparkles, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';

interface GuidedMeditationBarProps {
  officeTitle: string;
}

export const GuidedMeditationBar: React.FC<GuidedMeditationBarProps> = ({ officeTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(2);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundType, setSoundType] = useState<'sino' | 'harmonia' | 'silencio'>('sino');
  const [enableSound, setEnableSound] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play synthetic reverent liturgical bell / harmony with Web Audio API
  const playSound = (freq = 528, duration = 3.5) => {
    if (!enableSound || soundType === 'silencio') return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      if (soundType === 'harmonia') {
        // Warm meditative triad
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, now);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(648, now);
      } else {
        // Pure resonant chapel bell
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, now);
      }

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
      playSound(440, 4.0); // Ending bell
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, enableSound, soundType]);

  const handleStart = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(durationMinutes * 60);
      setIsCompleted(false);
    }
    if (!isRunning) {
      playSound(528, 3.0); // Initial entrance chime
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(durationMinutes * 60);
    setIsCompleted(false);
  };

  const handleSelectMinutes = (mins: number) => {
    setDurationMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = durationMinutes > 0 ? ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100 : 0;

  return (
    <div className="mb-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs shadow-xs overflow-hidden transition-all">
      {/* Header bar / Toggle */}
      <div className="flex items-center justify-between p-3.5 sm:px-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <span className="p-1.5 rounded-lg bg-[#4a153b]/10 dark:bg-rose-950/40 text-[#4a153b] dark:text-rose-300">
            <Bell className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#4a153b] dark:text-rose-200">
                Silêncio Guiado & Meditação
              </span>
              {isRunning && (
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
            </div>
            <p className="text-[11px] font-sans text-stone-500 dark:text-stone-400">
              {isRunning
                ? `Meditação em andamento: ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
                : 'Definir pausa meditativa entre as seções do Ofício'}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Play/Pause without expanding */}
          <button
            onClick={handleStart}
            className={`p-2 rounded-full transition-all active:scale-95 ${
              isRunning
                ? 'bg-amber-600 text-white'
                : 'bg-[#4a153b] text-white hover:bg-[#5e1a4b]'
            }`}
            title={isRunning ? 'Pausar silêncio' : 'Iniciar pausa meditativa'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Controls Drawer */}
      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-stone-100 dark:border-stone-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 mr-1">Duração:</span>
              {[1, 2, 3, 5, 10].map(m => (
                <button
                  key={m}
                  onClick={() => handleSelectMinutes(m)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    durationMinutes === m && !isRunning
                      ? 'bg-[#4a153b] text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                  }`}
                >
                  {m} min
                </button>
              ))}
            </div>

            {/* Sound options */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEnableSound(!enableSound)}
                className={`p-1.5 rounded-lg border flex items-center gap-1.5 ${
                  enableSound
                    ? 'border-stone-300 text-stone-700 dark:border-stone-700 dark:text-stone-300'
                    : 'border-stone-200 text-stone-400 dark:border-stone-800'
                }`}
                title={enableSound ? 'Som ativado' : 'Som silenciado'}
              >
                {enableSound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{enableSound ? 'Sino' : 'Silencioso'}</span>
              </button>

              {enableSound && (
                <select
                  value={soundType}
                  onChange={e => setSoundType(e.target.value as 'sino' | 'harmonia' | 'silencio')}
                  className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-[11px] focus:outline-hidden"
                >
                  <option value="sino">Carrilhão 528Hz</option>
                  <option value="harmonia">Harmonia 432Hz</option>
                  <option value="silencio">Apenas Relógio</option>
                </select>
              )}
            </div>
          </div>

          {/* Large Countdown and Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleStart}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4a153b] hover:bg-[#5e1a4b] text-white font-sans text-xs font-semibold shadow-xs transition-transform active:scale-95"
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pausar' : 'Iniciar Silêncio'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right">
              <span className="font-mono text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </span>
              <p className="text-[10px] font-sans text-stone-400 uppercase tracking-wider">
                {isRunning ? 'Em silêncio' : 'Pausa de oração'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#4a153b] dark:bg-rose-400 h-1.5 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {isCompleted && (
            <p className="text-xs font-serif italic text-center text-[#b91c1c] dark:text-rose-400 pt-1">
              "Aquietai-vos e sabei que eu sou Deus." Oração de silêncio concluída com reverência.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
