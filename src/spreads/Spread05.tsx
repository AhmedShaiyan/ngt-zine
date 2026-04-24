import styles from '../spreads/Intro.module.css';

export function Spread05Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s5p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}

export function Spread05Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s5p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
