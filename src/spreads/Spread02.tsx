import styles from '../spreads/Intro.module.css';

export function Spread02Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s2p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
export function Spread02Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s2p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
