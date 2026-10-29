// Web Audio Engine for Liturgical Chant & Canticles
import { NOTE_FREQUENCIES } from '../data/canticleMusicData';
import { ChantNote } from '../types/music';

class LiturgicalAudioService {
  private ctx: AudioContext | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private droneGain: GainNode | null = null;
  private isMelodyPlaying: boolean = false;
  private currentTimeoutIds: number[] = [];
  private externalAudioElement: HTMLAudioElement | null = null;
  private masterGain: GainNode | null = null;
  private masterVolume: number = 0.7;

  private getAudioContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
    if (this.externalAudioElement) {
      this.externalAudioElement.volume = this.masterVolume;
    }
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  /**
   * Synthesizes a warm liturgical church organ pipe note
   */
  private createOrganVoice(ctx: AudioContext, frequency: number, dest: AudioNode, startTime: number, duration: number, gainValue = 0.25) {
    // Pipe organ tone uses fundamental + gentle harmonics (8', 4', 2' stops feel)
    const harmonicMultipliers = [1, 2, 3, 4];
    const harmonicWeights = [1.0, 0.45, 0.18, 0.08];

    const voiceGain = ctx.createGain();
    voiceGain.gain.setValueAtTime(0, startTime);
    // Smooth attack (church acoustic room onset)
    voiceGain.gain.linearRampToValueAtTime(gainValue, startTime + 0.12);
    // Sustain
    voiceGain.gain.setValueAtTime(gainValue, startTime + Math.max(0.12, duration - 0.2));
    // Gentle church reverberation release
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Warm church filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    voiceGain.connect(filter);
    filter.connect(dest);

    harmonicMultipliers.forEach((mult, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(frequency * mult, startTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(harmonicWeights[i], startTime);

      osc.connect(oscGain);
      oscGain.connect(voiceGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);

      this.activeNodes.push({ osc, gain: oscGain });
    });
  }

  /**
   * Plays the complete Gregorian / Anglican chant formula melody
   */
  public playChantMelody(
    notes: ChantNote[],
    onNoteChange?: (index: number) => void,
    onComplete?: () => void
  ) {
    this.stopAll();
    const ctx = this.getAudioContext();
    this.isMelodyPlaying = true;

    // Master node
    const master = ctx.createGain();
    master.gain.setValueAtTime(this.masterVolume, ctx.currentTime);
    master.connect(ctx.destination);
    this.masterGain = master;

    let accumulatedTime = 0.05; // slight initial breath pause
    const startTime = ctx.currentTime;

    notes.forEach((item, index) => {
      const freq = NOTE_FREQUENCIES[item.note] || 440;
      const noteStart = startTime + accumulatedTime;
      const duration = item.duration;

      this.createOrganVoice(ctx, freq, master, noteStart, duration, 0.35);

      // Trigger UI callback when note begins
      const timerId = window.setTimeout(() => {
        if (this.isMelodyPlaying && onNoteChange) {
          onNoteChange(index);
        }
      }, accumulatedTime * 1000);
      this.currentTimeoutIds.push(timerId);

      accumulatedTime += duration;
    });

    // Complete callback
    const finishTimerId = window.setTimeout(() => {
      this.isMelodyPlaying = false;
      if (onNoteChange) onNoteChange(-1);
      if (onComplete) onComplete();
    }, accumulatedTime * 1000 + 400);
    this.currentTimeoutIds.push(finishTimerId);
  }

  /**
   * Plays a sustained church organ chord (Drone de Afinação) for choir / vocal chanting
   */
  public startDrone(frequencies: number[]) {
    this.stopAll();
    const ctx = this.getAudioContext();

    const droneMaster = ctx.createGain();
    droneMaster.gain.setValueAtTime(0, ctx.currentTime);
    droneMaster.gain.linearRampToValueAtTime(this.masterVolume * 0.45, ctx.currentTime + 0.4);
    droneMaster.connect(ctx.destination);
    this.droneGain = droneMaster;

    frequencies.forEach(freq => {
      // Pipe organ oscillator (warm fundamental + octaves)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const harmonic = ctx.createOscillator();
      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.06, ctx.currentTime);

      osc.connect(oscGain);
      harmonic.connect(harmonicGain);
      oscGain.connect(droneMaster);
      harmonicGain.connect(droneMaster);

      osc.start();
      harmonic.start();

      this.activeNodes.push({ osc, gain: oscGain });
      this.activeNodes.push({ osc: harmonic, gain: harmonicGain });
    });
  }

  /**
   * Stop Drone with smooth fade-out
   */
  public stopDrone() {
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
      setTimeout(() => {
        this.stopActiveNodes();
        this.droneGain = null;
      }, 450);
    } else {
      this.stopActiveNodes();
      this.droneGain = null;
    }
  }

  /**
   * Play external audio URL (.mp3, streaming, parish recording)
   */
  public playExternalAudio(url: string, onEnded?: () => void, onError?: (err: string) => void) {
    this.stopAll();
    try {
      const audio = new Audio(url);
      audio.volume = this.masterVolume;
      audio.onended = () => {
        if (onEnded) onEnded();
      };
      audio.onerror = () => {
        if (onError) onError('Não foi possível reproduzir o áudio externo.');
      };
      audio.play().catch(e => {
        if (onError) onError(e.message || 'Falha ao iniciar reprodução');
      });
      this.externalAudioElement = audio;
    } catch {
      if (onError) onError('URL de áudio inválida');
    }
  }

  public isDroneActive(): boolean {
    return this.droneGain !== null;
  }

  public isPlaying(): boolean {
    return this.isMelodyPlaying || this.isDroneActive() || (this.externalAudioElement !== null && !this.externalAudioElement.paused);
  }

  private stopActiveNodes() {
    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch {
        // already stopped
      }
    });
    this.activeNodes = [];
  }

  /**
   * Stops all active sound synthesis and timers immediately
   */
  public stopAll() {
    this.isMelodyPlaying = false;
    this.currentTimeoutIds.forEach(id => clearTimeout(id));
    this.currentTimeoutIds = [];

    this.stopDrone();
    this.stopActiveNodes();

    if (this.externalAudioElement) {
      this.externalAudioElement.pause();
      this.externalAudioElement.currentTime = 0;
      this.externalAudioElement = null;
    }
  }
}

export const liturgicalAudio = new LiturgicalAudioService();
