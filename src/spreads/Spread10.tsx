import styles from '../spreads/Intro.module.css';

export function Spread10Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s10p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}

export function Spread10Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s10p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
