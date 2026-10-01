import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

// Web Audio API Synthesizer for Romantic Ambient Lofi & Paper Sound Effects
class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlayingBgm = false;
  private bgmTimeout: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, realistic paper rustle sound
  playPaperSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 850;
      filter.Q.value = 1.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio fallback silent
    }
  }

  // Play a soft wax seal pop / click sound
  playSealBreakSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio fallback silent
    }
  }

  // Firework burst chime sound
  playFireworkBurstSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;

      // Soft magical sparkle chords (Pentatonic F major: F4, A4, C5, E5, G5)
      const freqs = [349.23, 440.0, 523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.04 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + idx * 0.04 + 0.85);
      });
    } catch {
      // Audio fallback silent
    }
  }

  // Ambient gentle piano chords progression (Fmaj7 - Am7 - Dm7 - Bbmaj7)
  private playPianoNote(freq: number, startTime: number, duration: number = 2.4) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, startTime);
    filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.05, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  startRomanticMelody() {
    this.initContext();
    this.isPlayingBgm = true;

    // Progression of arpeggiated romantic chords (C - G/B - Am - F)
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [246.94, 293.66, 392.0, 440.0],  // G6/B
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 261.63, 349.23, 440.0], // Fmaj7
    ];

    let chordIndex = 0;

    const loop = () => {
      if (!this.isPlayingBgm || !this.ctx) return;
      const currentChord = chords[chordIndex];
      const now = this.ctx.currentTime;

      // Play arpeggiated notes gently
      currentChord.forEach((freq, i) => {
        this.playPianoNote(freq, now + i * 0.45, 3.2);
      });

      chordIndex = (chordIndex + 1) % chords.length;
      this.bgmTimeout = window.setTimeout(loop, 2400);
    };

    loop();
  }

  stopRomanticMelody() {
    this.isPlayingBgm = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  toggleBgm(): boolean {
    if (this.isPlayingBgm) {
      this.stopRomanticMelody();
      return false;
    } else {
      this.startRomanticMelody();
      return true;
    }
  }
}

export const soundEngine = new RomanticSoundEngine();

interface AudioPlayerProps {
  onAutoPlayAllowed?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMusic = () => {
    setHasInteracted(true);
    const active = soundEngine.toggleBgm();
    setIsPlaying(active);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMusic}
        title={isPlaying ? 'Tắt nhạc nền lãng mạn' : 'Bật nhạc nền du dương'}
        aria-label="Toggle background music"
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800/90 text-rose-300 hover:text-rose-200 border border-rose-500/20 text-xs transition-all duration-200 backdrop-blur-md cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-rose-500' : 'bg-slate-500'}`} />
        </span>

        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-rose-400" />
            <span className="hidden sm:inline font-medium">Giai điệu tình yêu</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-300" />
            <span className="hidden sm:inline font-medium text-slate-300 group-hover:text-rose-200">Bật nhạc nền</span>
          </>
        )}
      </button>
    </div>
  );
};
