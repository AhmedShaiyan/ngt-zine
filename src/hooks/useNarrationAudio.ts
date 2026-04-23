import { useCallback, useEffect, useRef, useState } from 'react';

function tryPlay(audio: HTMLAudioElement, onSuccess: () => void) {
  audio.play().then(onSuccess).catch(() => {
    // Autoplay blocked — retry on the next user gesture
    const retry = () => {
      audio.play().then(onSuccess).catch(() => {});
    };
    document.addEventListener('click', retry, { once: true });
    document.addEventListener('keydown', retry, { once: true });
  });
}

export function useNarrationAudio(
  src: string | undefined,
  mediaPlaying: boolean,
  muted: boolean
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const userPausedRef = useRef(false);
  const interruptedRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    userPausedRef.current = false;
    interruptedRef.current = false;

    if (!src) return;

    const audio = new Audio(src);
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration ?? 0);
    const onEnd = () => { setIsPlaying(false); userPausedRef.current = false; };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);

    if (!muted) {
      tryPlay(audio, () => setIsPlaying(true));
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (mediaPlaying) {
      if (!audio.paused) {
        interruptedRef.current = true;
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      if (interruptedRef.current && !userPausedRef.current && !muted) {
        interruptedRef.current = false;
        tryPlay(audio, () => setIsPlaying(true));
      }
    }
  }, [mediaPlaying, src, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (muted) {
      if (!audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      if (!userPausedRef.current && !mediaPlaying) {
        tryPlay(audio, () => setIsPlaying(true));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      tryPlay(audio, () => setIsPlaying(true));
    } else {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  return { isPlaying, togglePlay, progress, duration };
}
