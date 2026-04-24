import styles from '../spreads/Intro.module.css';

export function Spread03Left() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s3p1.png" alt="" className={styles.canvaImg} />
    </div>
  );
}

export function Spread03Right() {
  return (
    <div className={styles.canvaPage}>
      <img src="/media/s3p2.png" alt="" className={styles.canvaImg} />
    </div>
  );
}
