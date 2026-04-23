import { forwardRef, type ReactNode } from 'react';
import styles from './Page.module.css';

interface PageProps {
  children?: ReactNode;
  folio?: string;
  side?: 'left' | 'right';
  bgImage?: string;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, folio, side, bgImage },
  ref
) {
  return (
    <div ref={ref} className={`${styles.page}${side ? ` ${styles[side]}` : ''}`}>
      {bgImage && (
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className={styles.inner}>{children}</div>
      {folio && <div className={styles.folio}>{folio}</div>}
    </div>
  );
});
