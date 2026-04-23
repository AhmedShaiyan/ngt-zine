import { useEffect, useRef } from 'react';

interface Options {
  src?: string;
  active: boolean;
  muted?: boolean;
  targetVolume?: number;
  fadeMs?: number;
  loop?: boolean;
}

export function useAudioFade({
  src,
  active,
  muted = false,
  targetVolume = 0.55,
  fadeMs = 1200,
  loop = true,
}: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = loop;
    audio.preload = 'none';
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src, loop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = active && !muted;
    const from = audio.volume;
    const to = shouldPlay ? targetVolume : 0;

    if (from === to) {
      if (!shouldPlay && !audio.paused) audio.pause();
      return;
    }

    if (shouldPlay && audio.paused) {
      audio.play().catch(() => {
        /* autoplay blocked until first user interaction; caller can retry */
      });
    }

    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / fadeMs);
      audio.volume = from + (to - from) * t;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else if (!shouldPlay) {
        audio.pause();
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, muted, targetVolume, fadeMs]);
}
