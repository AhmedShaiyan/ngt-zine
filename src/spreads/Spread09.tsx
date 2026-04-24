import styles from '../spreads/Intro.module.css';

export function Spread09Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s9p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}

export function Spread09Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s9p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
