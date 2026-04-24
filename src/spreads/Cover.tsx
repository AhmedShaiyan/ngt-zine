import styles from './Intro.module.css';

export function CoverLeft() {
  return <div style={{ width: '100%', height: '100%', background: 'var(--color-page)' }} />;
}

export function CoverRight() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/cover.png" alt="Cover" className={styles.canvaImg} />
    </div>
  );
}
