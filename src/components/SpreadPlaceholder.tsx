import styles from './SpreadPlaceholder.module.css';

interface Props {
  label: string;
  side: 'Left' | 'Right';
}

export function SpreadPlaceholder({ label, side }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.label}>{label}</div>
        <div className={styles.line} />
        <div className={styles.sub}>{side} page</div>
        <div className={styles.hint}>Upload Canva image</div>
      </div>
    </div>
  );
}
