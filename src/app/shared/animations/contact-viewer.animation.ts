import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '100ms ease-in-out';
const enterStartProperties = [{ transform: 'translateX(calc(100% + 110px))' }];
const enterEndProperties = [{ transform: 'translateX(0)' }];
const leaveStartProperties = [{ opacity: 1 }];
const leaveEndProperties = [{ opacity: 0 }];

const NAME = 'contactViewerAnimation';

const DATA: AnimationData[] = [
  {
    parent: {
      state: ':enter',
      timings: defaultTimings,
      properties: {
        start: enterStartProperties,
        end: enterEndProperties,
      },
    },
    children: [],
  },
  {
    parent: {
      state: ':leave',
      timings: defaultTimings,
      properties: {
        start: leaveStartProperties,
        end: leaveEndProperties,
      },
    },
    children: [],
  },
];

export const contactViewerAnimation = getAnimation(NAME, DATA);
