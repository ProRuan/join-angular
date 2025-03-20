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
    left: 'calc(calc(100% - 101px) / 2)',
    top: 'calc(calc(100vh - 122px) / 2)',
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
const pathStartProperties = [{ fill: '#ffffff' }];
const pathEndProperties = [{ fill: '#2a3647' }];
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
      {
        selector: '.path',
        timings: defaultTimings,
        properties: {
          start: pathStartProperties,
          end: pathEndProperties,
        },
        options: optional,
      },
    ],
  },
];

export const mobileLogoAnimation = getAnimation(NAME, DATA);
