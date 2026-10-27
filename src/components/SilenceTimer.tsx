import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface SilenceTimerProps {
  label?: string;
  defaultSeconds?: number;
}

export const SilenceTimer: React.FC<SilenceTimerProps> = ({
  label = 'Momento de Silêncio e Oração',
  defaultSeconds = 60
}) => {
  const [totalSeconds, setTotalSeconds] = useState(defaultSeconds);
  const [timeLeft, setTimeLeft] = useState(defaultSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play gentle meditation chime using Web Audio API (completely offline)
  const playGentleChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Bell chime fundamental + harmonic
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(528, now); // 528 Hz gentle singing tone
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1056, now); // Octave overtone

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.0);
      osc2.stop(now + 3.0);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      playGentleChime();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (!isActive && timeLeft === 0) {
      setTimeLeft(totalSeconds);
      setIsCompleted(false);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
    setIsCompleted(false);
  };

  const selectDuration = (sec: number) => {
    setTotalSeconds(sec);
    setTimeLeft(sec);
    setIsActive(false);
    setIsCompleted(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="my-6 p-4 rounded-xl border border-stone-200/80 bg-stone-50/70 dark:bg-stone-900/50 dark:border-stone-800 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/50 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#4a153b]/10 dark:bg-[#4a153b]/30 text-[#4a153b] dark:text-rose-300">
            <Bell className="w-4 h-4" />
          </span>
          <span className="text-sm font-serif italic text-stone-700 dark:text-stone-300">
            {label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          {[30, 60, 120].map(sec => (
            <button
              key={sec}
              onClick={() => selectDuration(sec)}
              className={`px-2 py-1 rounded transition-colors ${
                totalSeconds === sec && !isActive
                  ? 'bg-[#4a153b] text-white'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
              }`}
            >
              {sec < 60 ? `${sec}s` : `${sec / 60}m`}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTimer}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4a153b] hover:bg-[#5e1a4b] text-white shadow-sm transition-transform active:scale-95"
            title={isActive ? 'Pausar silêncio' : 'Iniciar silêncio'}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
            title="Reiniciar tempo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="text-xl font-mono tracking-tight text-stone-800 dark:text-stone-100 font-medium">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {isCompleted && (
          <span className="text-xs font-serif italic text-[#b91c1c] dark:text-rose-400 animate-fade-in">
            Momento de silêncio concluído.
          </span>
        )}
      </div>

      {/* Subtle Progress Bar */}
      <div className="mt-3 w-full bg-stone-200 dark:bg-stone-800 rounded-full h-1 overflow-hidden">
        <div
          className="bg-[#4a153b] h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
