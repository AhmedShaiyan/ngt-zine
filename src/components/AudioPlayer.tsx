import { useEffect, useRef, useState } from 'react';
import { useZine } from '../context/ZineContext';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  src: string;
  label?: string;
  caption?: string;
}

export function AudioPlayer({ src, label, caption }: AudioPlayerProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const { setMediaPlaying } = useZine();

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => { setPlaying(false); setMediaPlaying(false); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, [setMediaPlaying]);

  const toggle = () => {
    const audio = ref.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
      setMediaPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
      setMediaPlaying(false);
    }
  };

  const pct = duration > 0 ? (progress / duration) * 100 : 0;
  const mmss = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, '0')}`;
  };

  return (
    <figure className={styles.wrap}>
      <audio ref={ref} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        className={styles.button}
        aria-label={playing ? 'pause' : 'play'}
      >
        <span className={styles.icon}>{playing ? '❚❚' : '▶'}</span>
      </button>
      <div className={styles.body}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.meta}>
          <span>{mmss(progress)}</span>
          <span>{duration ? mmss(duration) : '—'}</span>
        </div>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </div>
    </figure>
  );
}
