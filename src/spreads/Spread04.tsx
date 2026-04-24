import styles from '../spreads/Intro.module.css';

export function Spread04Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s4p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}

export function Spread04Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s4p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
