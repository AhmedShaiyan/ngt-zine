import { CoverLeft, CoverRight } from '../spreads/Cover';
import { IntroLeft, IntroRight } from '../spreads/Intro';
import { Spread02Left, Spread02Right } from '../spreads/Spread02';
import { Spread03Left, Spread03Right } from '../spreads/Spread03';
import { Spread04Left, Spread04Right } from '../spreads/Spread04';
import { Spread05Left, Spread05Right } from '../spreads/Spread05';
import { Spread06Left, Spread06Right } from '../spreads/Spread06';
import { Spread07Left, Spread07Right } from '../spreads/Spread07';
import { Spread08Left, Spread08Right } from '../spreads/Spread08';
import { Spread09Left, Spread09Right } from '../spreads/Spread09';
import { Spread10Left, Spread10Right } from '../spreads/Spread10';
import type { SpreadDef } from '../types';

export const spreads: SpreadDef[] = [
  {
    id: 'cover',
    singlePage: true,
    Left: CoverLeft,
    Right: CoverRight,
  },
  {
    id: 'intro',
    narration: '/media/NGT1.mp3',
    Left: IntroLeft,
    Right: IntroRight,
  },
  {
    id: 'spread-02',
    narration: '/media/NGT2.mp3',
    Left: Spread02Left,
    Right: Spread02Right,
  },
  {
    id: 'spread-03',
    narration: '/media/NGT3.mp3',
    Left: Spread03Left,
    Right: Spread03Right,
  },
  {
    id: 'spread-04',
    Left: Spread04Left,
    Right: Spread04Right,
  },
  {
    id: 'spread-05',
    Left: Spread05Left,
    Right: Spread05Right,
  },
  {
    id: 'spread-06',
    Left: Spread06Left,
    Right: Spread06Right,
  },
  {
    id: 'spread-07',
    Left: Spread07Left,
    Right: Spread07Right,
  },
  {
    id: 'spread-08',
    Left: Spread08Left,
    Right: Spread08Right,
  },
  {
    id: 'spread-09',
    Left: Spread09Left,
    Right: Spread09Right,
  },
  {
    id: 'spread-10',
    Left: Spread10Left,
    Right: Spread10Right,
  },
];
