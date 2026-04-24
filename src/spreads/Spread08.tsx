import styles from '../spreads/Intro.module.css';

export function Spread08Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s8p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}

export function Spread08Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s8p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
