import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '100ms ease-in-out';
const parentStartProperties = [{ backgroundColor: 'transparent' }];
const parentEndProperties = [{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }];
const slideStartProperties = [{ transform: 'translateX(100%)' }];
const slideEndProperties = [{ transform: 'translateX(0%)' }];
const fadeStartProperties = [{ opacity: 0 }];
const fadeEndProperties = [{ opacity: 1 }];
const optional = { optional: true };

const NAME = 'dialogAnimation';

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
      {
        selector: '.fade',
        timings: defaultTimings,
        properties: {
          start: fadeStartProperties,
          end: fadeEndProperties,
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
      {
        selector: '.fade',
        timings: defaultTimings,
        properties: {
          start: fadeEndProperties,
          end: fadeStartProperties,
        },
        options: optional,
      },
    ],
  },
];

export const dialogAnimation = getAnimation(NAME, DATA);
