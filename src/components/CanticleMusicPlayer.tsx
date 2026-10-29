import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Square, 
  Volume2, 
  Music, 
  Info, 
  Radio, 
  ExternalLink, 
  Save, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CANTICLE_MUSIC_MAP } from '../data/canticleMusicData';
import { liturgicalAudio } from '../services/liturgicalAudioService';
import { CanticleMusicMetadata } from '../types/music';

interface CanticleMusicPlayerProps {
  canticleId: string;
  canticleTitle: string;
}

export const CanticleMusicPlayer: React.FC<CanticleMusicPlayerProps> = ({ 
  canticleId, 
  canticleTitle 
}) => {
  const musicData: CanticleMusicMetadata = CANTICLE_MUSIC_MAP[canticleId] || {
    canticleId,
    toneName: 'Tom Salmódico Tradicional',
    tradition: 'Canto Gregoriano',
    musicalKey: 'Fá Maior',
    recitingTone: 'Lá (A4)',
    suggestedChord: 'F (Fá - Lá - Dó)',
    chordFrequencies: [174.61, 261.63, 349.23, 440.00],
    melodyNotes: [
      { note: 'F4', duration: 0.6, label: 'Entonação' },
      { note: 'A4', duration: 1.8, label: 'Recitação' },
      { note: 'G4', duration: 0.8, label: 'Mediação (*)' },
      { note: 'A4', duration: 1.6, label: 'Segunda Metade' },
      { note: 'F4', duration: 1.4, label: 'Terminação' }
    ],
    guideInstructions: 'Canta-se com ritmo livre, apoiando as sílabas na corda de recitação e fazendo a pausa de respiração no asterisco (*).'
  };

  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [isPlayingDrone, setIsPlayingDrone] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(-1);
  const [volume, setVolume] = useState<number>(0.7);
  const [showGuide, setShowGuide] = useState(false);
  const [showCustomAudioInput, setShowCustomAudioInput] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string>('');
  const [isPlayingExternal, setIsPlayingExternal] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Load custom URL saved in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`canticle_audio_${canticleId}`);
      if (saved) {
        setCustomAudioUrl(saved);
      } else {
        setCustomAudioUrl('');
      }
    } catch {
      // ignore
    }
  }, [canticleId]);

  // Clean up audio on unmount or canticle change
  useEffect(() => {
    return () => {
      liturgicalAudio.stopAll();
    };
  }, [canticleId]);

  const handlePlayMelody = () => {
    if (isPlayingMelody) {
      liturgicalAudio.stopAll();
      setIsPlayingMelody(false);
      setActiveNoteIndex(-1);
      return;
    }

    liturgicalAudio.stopAll();
    setIsPlayingDrone(false);
    setIsPlayingExternal(false);
    setIsPlayingMelody(true);
    setAudioError(null);

    liturgicalAudio.playChantMelody(
      musicData.melodyNotes,
      (index) => setActiveNoteIndex(index),
      () => {
        setIsPlayingMelody(false);
        setActiveNoteIndex(-1);
      }
    );
  };

  const handleToggleDrone = () => {
    if (isPlayingDrone) {
      liturgicalAudio.stopDrone();
      setIsPlayingDrone(false);
      return;
    }

    liturgicalAudio.stopAll();
    setIsPlayingMelody(false);
    setIsPlayingExternal(false);
    setActiveNoteIndex(-1);
    setAudioError(null);

    liturgicalAudio.startDrone(musicData.chordFrequencies);
    setIsPlayingDrone(true);
  };

  const handlePlayExternal = () => {
    if (!customAudioUrl.trim()) return;

    if (isPlayingExternal) {
      liturgicalAudio.stopAll();
      setIsPlayingExternal(false);
      return;
    }

    liturgicalAudio.stopAll();
    setIsPlayingMelody(false);
    setIsPlayingDrone(false);
    setIsPlayingExternal(true);
    setAudioError(null);

    liturgicalAudio.playExternalAudio(
      customAudioUrl.trim(),
      () => setIsPlayingExternal(false),
      (err) => {
        setAudioError(err);
        setIsPlayingExternal(false);
      }
    );
  };

  const handleSaveCustomAudio = () => {
    try {
      localStorage.setItem(`canticle_audio_${canticleId}`, customAudioUrl.trim());
      setShowCustomAudioInput(false);
      setAudioError(null);
    } catch {
      // ignore
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    liturgicalAudio.setVolume(val);
  };

  const handleStopAll = () => {
    liturgicalAudio.stopAll();
    setIsPlayingMelody(false);
    setIsPlayingDrone(false);
    setIsPlayingExternal(false);
    setActiveNoteIndex(-1);
  };

  const isAnyPlaying = isPlayingMelody || isPlayingDrone || isPlayingExternal;

  return (
    <div className="my-6 rounded-2xl bg-amber-50/70 dark:bg-stone-900/80 border border-amber-200/80 dark:border-stone-800 p-4 sm:p-5 shadow-xs font-sans text-stone-800 dark:text-stone-200">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200/60 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#4a153b] text-amber-200 shadow-2xs">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#b91c1c] dark:text-rose-400">
                Música & Salmodia
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
                {musicData.tradition}
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#4a153b] dark:text-rose-200">
              {musicData.toneName}
            </h4>
          </div>
        </div>

        {/* Volume slider & Stop button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs">
            <Volume2 className="w-3.5 h-3.5" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 sm:w-20 accent-[#4a153b] cursor-pointer"
              title="Ajustar Volume"
            />
          </div>

          {isAnyPlaying && (
            <button
              onClick={handleStopAll}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-semibold cursor-pointer transition"
              title="Silenciar áudio"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Silenciar</span>
            </button>
          )}
        </div>
      </div>

      {/* Musical Metadata Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-3 text-xs">
        <div className="p-2 rounded-lg bg-white/80 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
          <span className="text-[10px] text-stone-500 uppercase block">Tonalidade / Modo</span>
          <span className="font-semibold text-stone-800 dark:text-stone-200">{musicData.musicalKey}</span>
        </div>
        <div className="p-2 rounded-lg bg-white/80 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
          <span className="text-[10px] text-stone-500 uppercase block">Corda de Recitação</span>
          <span className="font-semibold text-stone-800 dark:text-stone-200">{musicData.recitingTone}</span>
        </div>
        <div className="p-2 rounded-lg bg-white/80 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-stone-500 uppercase block">Acorde de Afinação</span>
          <span className="font-semibold text-stone-800 dark:text-stone-200">{musicData.suggestedChord}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Play Melody Button */}
        <button
          onClick={handlePlayMelody}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
            isPlayingMelody
              ? 'bg-amber-600 text-white animate-pulse'
              : 'bg-[#4a153b] hover:bg-[#5e1a4b] text-white'
          }`}
          title="Toca a melodia e fórmula litúrgica do cântico em sintetizador de órgão sacro"
        >
          {isPlayingMelody ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlayingMelody ? 'Tocando Fórmula...' : 'Ouvir Fórmula do Tom'}</span>
        </button>

        {/* Sustained Organ Chord (Bordão / Drone) */}
        <button
          onClick={handleToggleDrone}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition border cursor-pointer ${
            isPlayingDrone
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-inner'
              : 'bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700'
          }`}
          title="Sustenta o acorde de órgão para guiar a afinação enquanto você ou o coral canta os versículos"
        >
          <Radio className={`w-3.5 h-3.5 ${isPlayingDrone ? 'animate-spin' : ''}`} />
          <span>{isPlayingDrone ? 'Órgão Sustentando Tom (Ativo)' : 'Acorde de Órgão para Cantar'}</span>
        </button>

        {/* External Audio / Parish Recording */}
        {customAudioUrl ? (
          <button
            onClick={handlePlayExternal}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition border cursor-pointer ${
              isPlayingExternal
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-inner'
                : 'bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
            }`}
          >
            {isPlayingExternal ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlayingExternal ? 'Tocando Gravação...' : 'Tocar Áudio Paroquial'}</span>
          </button>
        ) : null}

        {/* Custom audio link toggle */}
        <button
          onClick={() => setShowCustomAudioInput(!showCustomAudioInput)}
          className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 text-xs px-2.5 py-2 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 cursor-pointer ml-auto flex items-center gap-1"
          title="Adicionar link de gravação personalizada ou da paróquia"
        >
          <ExternalLink className="w-3 h-3" />
          <span className="hidden sm:inline">Gravação própria</span>
        </button>
      </div>

      {/* Visual Melody Flow Bar (while melody is playing) */}
      {isPlayingMelody && (
        <div className="mt-3 p-3 rounded-xl bg-white/90 dark:bg-stone-800/90 border border-amber-300/80 dark:border-stone-700 space-y-1.5 animate-fade-in">
          <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
            <span className="flex items-center gap-1 text-[#b91c1c] font-bold">
              <Sparkles className="w-3 h-3" /> Linha Melódica Litúrgica
            </span>
            <span>{musicData.melodyNotes[activeNoteIndex]?.label || 'Em andamento'}</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {musicData.melodyNotes.map((noteItem, idx) => {
              const isActive = activeNoteIndex === idx;
              return (
                <div
                  key={idx}
                  className={`flex-1 min-w-[40px] text-center px-1 py-1.5 rounded-lg border text-xs transition-all ${
                    isActive
                      ? 'bg-[#4a153b] text-white border-[#4a153b] scale-105 font-bold shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <span className="block text-[10px] font-mono leading-none">{noteItem.note}</span>
                  <span className="block text-[9px] truncate opacity-80 mt-0.5">{noteItem.label.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* External Audio URL Input Form */}
      {showCustomAudioInput && (
        <div className="mt-3 p-3 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 space-y-2 text-xs animate-fade-in">
          <label className="font-semibold text-stone-800 dark:text-stone-200 block">
            Link de Gravação Coral / Paroquial (URL de áudio .mp3):
          </label>
          <p className="text-[11px] text-stone-500 leading-tight">
            Você pode colar a URL de um arquivo de áudio (.mp3) do coral da sua paróquia, SoundCloud direto ou hospedagem externa para reproduzir aqui.
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://exemplo.com/canto-magnificat.mp3"
              value={customAudioUrl}
              onChange={(e) => setCustomAudioUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 text-xs focus:ring-1 focus:ring-[#4a153b] outline-none"
            />
            <button
              onClick={handleSaveCustomAudio}
              className="px-3 py-1.5 rounded-lg bg-[#4a153b] text-white font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      )}

      {/* Audio Error message */}
      {audioError && (
        <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
          {audioError}
        </p>
      )}

      {/* Singing Guide Accordion */}
      <div className="mt-3 pt-2 border-t border-amber-200/50 dark:border-stone-800">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center justify-between w-full text-xs font-semibold text-[#4a153b] dark:text-rose-300 hover:underline cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Como Cantar este Cântico (Guia de Salmodia)
          </span>
          {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showGuide && (
          <div className="mt-2.5 p-3 rounded-xl bg-white/70 dark:bg-stone-800/50 text-xs space-y-2 text-stone-700 dark:text-stone-300 leading-relaxed animate-fade-in">
            <p className="font-serif italic text-stone-600 dark:text-stone-300">
              "{musicData.guideInstructions}"
            </p>
            <div className="space-y-1 text-[11px] pt-1 border-t border-stone-200/60 dark:border-stone-700">
              <p>
                <strong>1. Entonação e Corda de Recitação:</strong> Quem dirige o cântico inicia a primeira metade no tom <em>{musicData.recitingTone}</em>.
              </p>
              <p>
                <strong>2. O Asterisco (*):</strong> Marca a pausa de mediação. Não se corre: a congregação faz uma pausa completa de respiração no asterisco antes de seguir para a resposta.
              </p>
              <p>
                <strong>3. Acorde de Apoio:</strong> Ao clicar em <em>"Acorde de Órgão para Cantar"</em>, o aplicativo mantém um tom contínuo suave de fundo, permitindo que a família ou comunidade cante em uníssono perfeitamente afinada sem desafinar.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
