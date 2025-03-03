import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '100ms ease-in-out';
const parentStartProperties = [{ opacity: 0 }];
const parentEndProperties = [{ opacity: 1 }];

const NAME = 'backLogAnimation';

const DATA: AnimationData[] = [
  {
    parent: {
      state: ':enter',
      timings: defaultTimings,
      properties: {
        start: parentStartProperties,
        end: parentEndProperties,
      },
    },
  },
  {
    parent: {
      state: ':leave',
      timings: defaultTimings,
      properties: {
        start: parentEndProperties,
        end: parentStartProperties,
      },
    },
  },
];

export const backLogAnimation = getAnimation(NAME, DATA);
