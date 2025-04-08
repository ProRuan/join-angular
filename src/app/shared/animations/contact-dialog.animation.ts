import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '300ms ease-out';
const fadeOutTimings = '100ms ease-in-out';
const parentStartProperties = [{ backgroundColor: 'transparent' }];
const parentEndProperties = [{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }];
const desktopStartProperties = [{ transform: 'translateX(100%)' }];
const desktopEndProperties = [{ transform: 'translateX(0%)' }];
const mobileStartProperties = [{ transform: 'translateY(100%)' }];
const mobileEndProperties = [{ transform: 'translateY(0%)' }];
const fadeStartProperties = [{ opacity: 0 }];
const fadeEndProperties = [{ opacity: 1 }];
const optional = { optional: true };

const NAME = 'contactDialogAnimation';

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
        selector: '.slide-x',
        timings: defaultTimings,
        properties: {
          start: desktopStartProperties,
          end: desktopEndProperties,
        },
        options: optional,
      },
      {
        selector: '.slide-y',
        timings: defaultTimings,
        properties: {
          start: mobileStartProperties,
          end: mobileEndProperties,
        },
        options: optional,
      },
      {
        selector: '.fade',
        timings: fadeOutTimings,
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
        selector: '.slide-x',
        timings: defaultTimings,
        properties: {
          start: desktopEndProperties,
          end: desktopStartProperties,
        },
        options: optional,
      },
      {
        selector: '.slide-y',
        timings: defaultTimings,
        properties: {
          start: mobileEndProperties,
          end: mobileStartProperties,
        },
        options: optional,
      },
      {
        selector: '.fade',
        timings: fadeOutTimings,
        properties: {
          start: fadeEndProperties,
          end: fadeStartProperties,
        },
        options: optional,
      },
    ],
  },
];

export const contactDialogAnimation = getAnimation(NAME, DATA);
