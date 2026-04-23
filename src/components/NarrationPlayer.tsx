import { useZine } from '../context/ZineContext';
import { useNarrationAudio } from '../hooks/useNarrationAudio';
import styles from './NarrationPlayer.module.css';

interface Props {
  src: string | undefined;
}

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function NarrationPlayer({ src }: Props) {
  const { muted, mediaPlaying } = useZine();
  const { isPlaying, togglePlay, progress, duration } = useNarrationAudio(
    src,
    mediaPlaying,
    muted
  );

  if (!src) return null;

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        onClick={togglePlay}
        className={styles.btn}
        aria-label={isPlaying ? 'pause narration' : 'play narration'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <div className={styles.body}>
        <div className={styles.label}>
          <span className={styles.dot} data-playing={isPlaying} />
          Narration
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.time}>
          {mmss(progress)}
          {duration ? ` / ${mmss(duration)}` : ''}
        </div>
      </div>
    </div>
  );
}
