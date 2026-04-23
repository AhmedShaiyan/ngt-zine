import type { ReactNode } from 'react';
import styles from './PullQuote.module.css';

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className={styles.quote}>
      <p className={styles.text}>{children}</p>
      {attribution && <cite className={styles.cite}>— {attribution}</cite>}
    </blockquote>
  );
}
