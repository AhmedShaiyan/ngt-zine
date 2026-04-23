import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface ZineContextValue {
  currentSpread: number;
  setCurrentSpread: (index: number) => void;
  totalSpreads: number;
  muted: boolean;
  setMuted: (m: boolean) => void;
  /** True while any in-spread AudioPlayer or VideoClip is playing. */
  mediaPlaying: boolean;
  setMediaPlaying: (v: boolean) => void;
}

const ZineContext = createContext<ZineContextValue | null>(null);

export function ZineProvider({
  children,
  totalSpreads,
}: {
  children: ReactNode;
  totalSpreads: number;
}) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [muted, setMuted] = useState(false);
  const [mediaPlaying, setMediaPlaying] = useState(false);

  const value = useMemo(
    () => ({
      currentSpread,
      setCurrentSpread,
      totalSpreads,
      muted,
      setMuted,
      mediaPlaying,
      setMediaPlaying,
    }),
    [currentSpread, totalSpreads, muted, mediaPlaying]
  );

  return <ZineContext.Provider value={value}>{children}</ZineContext.Provider>;
}

export function useZine() {
  const ctx = useContext(ZineContext);
  if (!ctx) throw new Error('useZine must be used within ZineProvider');
  return ctx;
}
