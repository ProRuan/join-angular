import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '500ms 200ms ease-in-out';
const parentStartProperties = [{ backgroundColor: '#f6f7f8' }];
const parentEndProperties = [{ backgroundColor: 'transparent' }];
const logoStartProperties = [
  {
    width: '274px',
    height: '335px',
    position: 'absolute',
    left: 'calc(50% - 137px)',
    top: 'calc(50vh - 167.5px)',
  },
];
const logoEndProperties = [
  {
    width: '101px',
    height: '122px',
    position: 'absolute',
    left: '77px',
    top: '80px',
  },
];
const optional = { optional: true };

const NAME = 'desktopLogoAnimation';

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
        selector: '.logo',
        timings: defaultTimings,
        properties: {
          start: logoStartProperties,
          end: logoEndProperties,
        },
        options: optional,
      },
    ],
  },
];

export const desktopLogoAnimation = getAnimation(NAME, DATA);
