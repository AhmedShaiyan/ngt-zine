import styles from './ProgressIndicator.module.css';

interface ProgressIndicatorProps {
  total: number;
  current: number;
}

export function ProgressIndicator({ total, current }: ProgressIndicatorProps) {
  return (
    <div className={styles.wrap} aria-label={`spread ${current + 1} of ${total}`}>
      <span className={styles.num}>{String(current + 1).padStart(2, '0')}</span>
      <div className={styles.bar}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`${styles.tick} ${i === current ? styles.active : ''}`}
          />
        ))}
      </div>
      <span className={styles.num}>{String(total).padStart(2, '0')}</span>
    </div>
  );
}
