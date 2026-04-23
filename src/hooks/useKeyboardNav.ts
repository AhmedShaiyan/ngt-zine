import { useEffect } from 'react';

export function useKeyboardNav(handlers: { onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') handlers.onPrev();
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') handlers.onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlers]);
}
