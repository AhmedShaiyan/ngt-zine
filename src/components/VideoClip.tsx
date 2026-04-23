import { useRef, useState } from 'react';
import { useZine } from '../context/ZineContext';
import styles from './VideoClip.module.css';

interface VideoClipProps {
  src: string;
  poster?: string;
  caption?: string;
}

export function VideoClip({ src, poster, caption }: VideoClipProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { setMediaPlaying } = useZine();

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setMediaPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
      setMediaPlaying(false);
    }
  };

  return (
    <figure className={styles.wrap}>
      <div className={styles.frame}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onEnded={() => { setPlaying(false); setMediaPlaying(false); }}
          className={styles.video}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'pause' : 'play'}
          className={`${styles.overlay} ${playing ? styles.playing : ''}`}
        >
          <span className={styles.icon}>{playing ? '❚❚' : '▶'}</span>
        </button>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
