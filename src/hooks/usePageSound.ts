import { useCallback, useRef } from 'react';

export function usePageSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback((muted: boolean) => {
    if (muted) return;
    try {
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const sr = ctx.sampleRate;

      // ── Layer 1: low-frequency paper thump (transient body resonance) ────────
      const thumpDur = 0.06;
      const thumpN = Math.ceil(sr * thumpDur);
      const thumpBuf = ctx.createBuffer(1, thumpN, sr);
      const thumpData = thumpBuf.getChannelData(0);
      for (let i = 0; i < thumpN; i++) thumpData[i] = Math.random() * 2 - 1;

      const thumpSrc = ctx.createBufferSource();
      thumpSrc.buffer = thumpBuf;

      const thumpLP = ctx.createBiquadFilter();
      thumpLP.type = 'lowpass';
      thumpLP.frequency.value = 320;
      thumpLP.Q.value = 1.8;

      const thumpGain = ctx.createGain();
      const t = ctx.currentTime;
      thumpGain.gain.setValueAtTime(0, t);
      thumpGain.gain.linearRampToValueAtTime(0.7, t + 0.008);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, t + thumpDur);

      thumpSrc.connect(thumpLP);
      thumpLP.connect(thumpGain);

      // ── Layer 2: mid-range paper swish (main movement) ─────────────────────
      const swishDur = 0.22;
      const swishN = Math.ceil(sr * swishDur);
      const swishBuf = ctx.createBuffer(1, swishN, sr);
      const swishData = swishBuf.getChannelData(0);
      // Shaped noise: rises then falls like a page moving through air
      for (let i = 0; i < swishN; i++) {
        const env = Math.sin((i / swishN) * Math.PI);
        swishData[i] = (Math.random() * 2 - 1) * env;
      }

      const swishSrc = ctx.createBufferSource();
      swishSrc.buffer = swishBuf;

      const swishBP = ctx.createBiquadFilter();
      swishBP.type = 'bandpass';
      swishBP.frequency.value = 900;
      swishBP.Q.value = 0.6;

      const swishHP = ctx.createBiquadFilter();
      swishHP.type = 'highpass';
      swishHP.frequency.value = 400;

      const swishGain = ctx.createGain();
      swishGain.gain.setValueAtTime(0, t);
      swishGain.gain.linearRampToValueAtTime(0.35, t + 0.03);
      swishGain.gain.setValueAtTime(0.35, t + 0.10);
      swishGain.gain.exponentialRampToValueAtTime(0.001, t + swishDur);

      swishSrc.connect(swishBP);
      swishBP.connect(swishHP);
      swishHP.connect(swishGain);

      // ── Layer 3: high-frequency paper crinkle / edge snap ──────────────────
      const crinkleDur = 0.12;
      const crinkleN = Math.ceil(sr * crinkleDur);
      const crinkleBuf = ctx.createBuffer(1, crinkleN, sr);
      const crinkleData = crinkleBuf.getChannelData(0);
      for (let i = 0; i < crinkleN; i++) crinkleData[i] = Math.random() * 2 - 1;

      const crinkleSrc = ctx.createBufferSource();
      crinkleSrc.buffer = crinkleBuf;

      const crinkleHP = ctx.createBiquadFilter();
      crinkleHP.type = 'highpass';
      crinkleHP.frequency.value = 3500;

      const crinkleGain = ctx.createGain();
      crinkleGain.gain.setValueAtTime(0, t);
      crinkleGain.gain.linearRampToValueAtTime(0.18, t + 0.012);
      crinkleGain.gain.exponentialRampToValueAtTime(0.001, t + crinkleDur);

      crinkleSrc.connect(crinkleHP);
      crinkleHP.connect(crinkleGain);

      // ── Master bus ──────────────────────────────────────────────────────────
      const master = ctx.createGain();
      master.gain.value = 0.9;

      thumpGain.connect(master);
      swishGain.connect(master);
      crinkleGain.connect(master);
      master.connect(ctx.destination);

      thumpSrc.start(t);
      thumpSrc.stop(t + thumpDur);
      swishSrc.start(t);
      swishSrc.stop(t + swishDur);
      crinkleSrc.start(t);
      crinkleSrc.stop(t + crinkleDur);
    } catch {
      // AudioContext may be unavailable or blocked
    }
  }, []);
}
