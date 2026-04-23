import {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Page } from './Page';
import { usePageSound } from '../hooks/usePageSound';
import type { SpreadDef } from '../types';
import styles from './FlipBook.module.css';

export interface FlipBookHandle {
  next: () => void;
  prev: () => void;
}

interface Props {
  spreads: SpreadDef[];
  onSpreadChange?: (i: number) => void;
  muted?: boolean;
}

type FlipDir = 'forward' | 'backward';
type FlipPhase = 'priming' | 'active';

interface Flip {
  dir: FlipDir;
  from: number;
  to: number;
  phase: FlipPhase;
}

function folio(spread: number, side: 'left' | 'right'): string | undefined {
  if (spread === 0) return undefined;
  return side === 'left' ? String(spread * 2) : String(spread * 2 + 1);
}

const ANIM_MS = 860;

export const FlipBook = forwardRef<FlipBookHandle, Props>(function FlipBook(
  { spreads, onSpreadChange, muted = false },
  ref
) {
  const [current, setCurrent] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);
  const playSound = usePageSound();

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const doFlip = useCallback(
    (to: number) => {
      if (flip !== null) return;
      if (to < 0 || to >= spreads.length) return;

      const dir: FlipDir = to > current ? 'forward' : 'backward';
      playSound(muted);

      // Render leaf at initial position (priming), then add the animation class
      setFlip({ dir, from: current, to, phase: 'priming' });

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setFlip(f => (f ? { ...f, phase: 'active' } : null));
        });
      });

      timerRef.current = setTimeout(() => {
        setCurrent(to);
        setFlip(null);
        onSpreadChange?.(to);
      }, ANIM_MS + 60);
    },
    [flip, current, spreads.length, muted, playSound, onSpreadChange]
  );

  const next = useCallback(() => doFlip(current + 1), [doFlip, current]);
  const prev = useCallback(() => doFlip(current - 1), [doFlip, current]);

  useImperativeHandle(ref, () => ({ next, prev }), [next, prev]);

  const from = flip?.from ?? current;
  const to = flip?.to ?? current;

  // ── Slot resolution ────────────────────────────────────────────────────────
  // forward: bottom-left = current-left (stays), bottom-right = next-right (revealed)
  // backward: bottom-left = prev-left (revealed), bottom-right = current-right (stays)
  const BotLeft =
    flip?.dir === 'forward' ? spreads[from].Left : spreads[to].Left;
  const BotRight =
    flip?.dir === 'forward' ? spreads[to].Right : spreads[from].Right;
  const botLeftIdx = flip?.dir === 'forward' ? from : to;
  const botRightIdx = flip?.dir === 'forward' ? to : from;

  const isFlipping = flip !== null;
  const LeafFront = isFlipping
    ? flip!.dir === 'forward'
      ? spreads[from].Right
      : spreads[from].Left
    : null;
  const LeafBack = isFlipping
    ? flip!.dir === 'forward'
      ? spreads[to].Left
      : spreads[to].Right
    : null;
  const leafFrontSide: 'left' | 'right' =
    flip?.dir === 'forward' ? 'right' : 'left';
  const leafBackSide: 'left' | 'right' =
    flip?.dir === 'forward' ? 'left' : 'right';

  // ── Cover mode ─────────────────────────────────────────────────────────────
  const isCoverMode = !isFlipping && spreads[current]?.singlePage;
  const CoverContent = spreads[current]?.Right;

  return (
    <div className={styles.book}>
      {/* ── Background spread ─────────────────────────────────────────────── */}
      {isCoverMode ? (
        <div className={styles.spreadCover}>
          <Page bgImage={spreads[current].rightBg}>
            <CoverContent />
          </Page>
        </div>
      ) : (
        <div className={styles.spread}>
          <Page side="left" folio={folio(botLeftIdx, 'left')} bgImage={spreads[botLeftIdx]?.leftBg}>
            <BotLeft />
          </Page>
          <Page side="right" folio={folio(botRightIdx, 'right')} bgImage={spreads[botRightIdx]?.rightBg}>
            <BotRight />
          </Page>
        </div>
      )}

      {/* ── Single turning leaf (preserve-3d card with front + back face) ─── */}
      {isFlipping && LeafFront && LeafBack && (
        <div
          className={[
            styles.leaf,
            flip!.dir === 'forward' ? styles.leafR : styles.leafL,
            flip!.phase === 'active' ? styles.leafFlip : '',
          ].join(' ')}
        >
          <div className={styles.leafFront}>
            <Page
              side={leafFrontSide}
              folio={folio(from, leafFrontSide)}
              bgImage={flip!.dir === 'forward' ? spreads[from].rightBg : spreads[from].leftBg}
            >
              <LeafFront />
            </Page>
          </div>
          <div className={styles.leafBack}>
            <Page
              side={leafBackSide}
              folio={folio(to, leafBackSide)}
              bgImage={flip!.dir === 'forward' ? spreads[to].leftBg : spreads[to].rightBg}
            >
              <LeafBack />
            </Page>
          </div>
        </div>
      )}

      <div className={styles.spine} />
    </div>
  );
});
