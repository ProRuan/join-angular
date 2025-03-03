import { DialogAnimationData } from '../../interfaces/dialog-animation-data';

const defaultTimings = '100ms ease-in-out';
const parentStartProperties = [{ opacity: 0 }];
const parentEndProperties = [{ opacity: 1 }];

export const BACK_LOG_ANIMATION_DATA: DialogAnimationData[] = [
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
