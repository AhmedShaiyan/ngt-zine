import type { ComponentType } from 'react';

export interface SpreadDef {
  id: string;
  title?: string;
  ambientAudio?: string;
  /** When true, only the Right page renders (used for front cover). */
  singlePage?: boolean;
  /** Optional full-bleed background image for the left page. */
  leftBg?: string;
  /** Optional full-bleed background image for the right page. */
  rightBg?: string;
  /** Optional narration audio that auto-plays on this spread. */
  narration?: string;
  Left: ComponentType;
  Right: ComponentType;
}
