import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '100ms ease-in-out';
const parentStartProperties = [{ backgroundColor: 'transparent' }];
const parentEndProperties = [{ backgroundColor: 'rgba(0, 0, 0, 0)' }];
const slideStartProperties = [{ transform: 'translateX(198px)' }];
const slideEndProperties = [{ transform: 'translateX(0)' }];
const optional = { optional: true };

const NAME = 'flipMenuAnimation';

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
    children: [
      {
        selector: '.slide',
        timings: defaultTimings,
        properties: {
          start: slideStartProperties,
          end: slideEndProperties,
        },
        options: optional,
      },
    ],
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
    children: [
      {
        selector: '.slide',
        timings: defaultTimings,
        properties: {
          start: slideEndProperties,
          end: slideStartProperties,
        },
        options: optional,
      },
    ],
  },
];

export const flipMenuAnimation = getAnimation(NAME, DATA);
