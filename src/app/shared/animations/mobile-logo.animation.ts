import { AnimationData } from '../interfaces/animation-data';
import { getAnimation } from '../ts/animate';

const defaultTimings = '800ms 200ms ease-in-out';
const parentStartProperties = [{ backgroundColor: '#2a3647' }];
const parentEndProperties = [{ backgroundColor: 'transparent' }];
const logoStartProperties = [
  {
    width: '101px',
    height: '122px',
    position: 'absolute',
    left: 'calc(50% - 50.5px)',
    top: 'calc(50vh - 61px)',
  },
];
const logoEndProperties = [
  {
    width: '64px',
    height: '78px',
    position: 'absolute',
    left: '38px',
    top: '37px',
  },
];
const optional = { optional: true };

const NAME = 'mobileLogoAnimation';

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

export const mobileLogoAnimation = getAnimation(NAME, DATA);
