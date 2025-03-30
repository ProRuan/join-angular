import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '400ms 1200ms ease-in';
const parentStartProperties = [{ opacity: 1 }];
const parentEndProperties = [{ opacity: 0 }];

const NAME = 'greetingAnimation';

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

export const greetingAnimation = getAnimation(NAME, DATA);
