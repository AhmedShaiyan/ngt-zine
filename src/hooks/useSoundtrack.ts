import { useCallback, useEffect, useRef } from 'react';

const VOLUME = 0.1;
const FADE_MS = 2000;

export function useSoundtrack(src: string | undefined, muted: boolean) {
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const rafRef    = useRef<number | null>(null);
  const unlockedRef = useRef(false);
  const mutedRef  = useRef(muted);

  useEffect(() => { mutedRef.current = muted; });

  // ── helpers (recreated each render, but only touch refs/consts) ────────────
  function cancelFade() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  function fadeTo(audio: HTMLAudioElement, target: number) {
    cancelFade();
    const from  = audio.volume;
    if (from === target) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      audio.volume = from + (target - from) * t;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
        if (target === 0) audio.pause();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  // ── build audio element once ───────────────────────────────────────────────
  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop    = true;
    audio.volume  = 0;
    audioRef.current  = audio;
    unlockedRef.current = false;

    return () => {
      cancelFade();
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // ── respond to mute changes ────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      fadeTo(audio, 0);
    } else {
      // Attempt play on every unmute — this runs inside a user-gesture event
      // (mute button click), so the browser allows it even before nav unlock.
      audio.play().then(() => {
        unlockedRef.current = true;
        fadeTo(audio, VOLUME);
      }).catch(() => {
        // Autoplay still blocked; nav-click unlock() will handle first play.
      });
    }

    return cancelFade;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted]);

  // ── called synchronously from nav clicks (guaranteed user-gesture context) ─
  const unlock = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || unlockedRef.current || mutedRef.current) return;
    audio.play().then(() => {
      unlockedRef.current = true;
      fadeTo(audio, VOLUME);
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { unlock };
}
