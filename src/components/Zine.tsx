import { useCallback, useRef } from 'react';
import { FlipBook, type FlipBookHandle } from './FlipBook';
import { AmbientAudio } from './AmbientAudio';
import { NarrationPlayer } from './NarrationPlayer';
import { ProgressIndicator } from './ProgressIndicator';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useSoundtrack } from '../hooks/useSoundtrack';
import { useZine } from '../context/ZineContext';
import type { SpreadDef } from '../types';
import styles from './Zine.module.css';

interface ZineProps {
  spreads: SpreadDef[];
  soundtrack?: string;
}

export function Zine({ spreads, soundtrack }: ZineProps) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const { currentSpread, setCurrentSpread, muted, setMuted } = useZine();

  const { unlock } = useSoundtrack(soundtrack, muted);

  const next = useCallback(() => { unlock(); bookRef.current?.next(); }, [unlock]);
  const prev = useCallback(() => { unlock(); bookRef.current?.prev(); }, [unlock]);

  useKeyboardNav({ onPrev: prev, onNext: next });

  return (
    <div className={styles.stage}>
      <FlipBook
        ref={bookRef}
        spreads={spreads}
        onSpreadChange={setCurrentSpread}
        muted={muted}
      />

      {spreads.map((spread, i) =>
        spread.ambientAudio ? (
          <AmbientAudio
            key={spread.id}
            src={spread.ambientAudio}
            active={currentSpread === i}
            muted={muted}
          />
        ) : null
      )}

      <div className={styles.chrome}>
        <button
          className={styles.mute}
          onClick={() => setMuted(!muted)}
          aria-label={muted ? 'unmute' : 'mute'}
        >
          {muted ? 'sound off' : 'sound on'}
        </button>
        <NarrationPlayer src={spreads[currentSpread]?.narration} />
        <ProgressIndicator total={spreads.length} current={currentSpread} />
        <div className={styles.nav}>
          <button onClick={prev} aria-label="previous spread">
            ←
          </button>
          <button onClick={next} aria-label="next spread">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
