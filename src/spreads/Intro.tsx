import styles from './Intro.module.css';


export function IntroLeft() {
  return (
    <div className={styles.canvaPage}>
      <img
        src="/media/s1p1.png"
        alt="Introduction"
        className={styles.canvaImg}
      />
    </div>
  );
}

export function IntroRight() {
 return (
    <div className={styles.canvaPage}>
      <img
        src="/media/s1p2.png"
        alt="Introduction"
        className={styles.canvaImg}
      />
    </div>
  );
}

