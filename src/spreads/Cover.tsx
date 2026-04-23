import styles from './Cover.module.css';

export function CoverLeft() {
  return <div className={styles.blank} aria-hidden />;
}

export function CoverRight() {
  return (
    <div className={styles.cover}>
      <div className={styles.border} />

      <div className={styles.stack}>
        <div className={styles.label}>A Digital Zine</div>

        <div className={styles.accentLine} />

        <h1 className={styles.title}>Elsewhere</h1>

        <p className={styles.subtitle}>
          Migration, Modernity, and the Promise That Persists
        </p>

        <div className={styles.accentLine} />

        <div className={styles.author}>Shaiyan</div>
      </div>

      <div className={styles.hint}>Turn page →</div>
    </div>
  );
}
