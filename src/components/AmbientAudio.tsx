import { useAudioFade } from '../hooks/useAudioFade';

interface AmbientAudioProps {
  src: string;
  active: boolean;
  muted?: boolean;
}

export function AmbientAudio({ src, active, muted }: AmbientAudioProps) {
  useAudioFade({ src, active, muted });
  return null;
}
