import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

let name = 'relocation';

let startStyle = style({
  left: 'calc(calc(100% - 274px) / 2)',
  top: 'calc(calc(100vh - 335px) / 2)',
  width: '274px',
});

let endStyle = style({
  left: '77px',
  top: '80px',
  width: '100px',
});

const START_STATE = state(`${name}-start`, startStyle);

const END_STATE = state(`${name}-end`, endStyle);

const STATE_TO_STATE = `${name}-start => ${name}-end`;

const PROPERTIES = '300ms 700ms ease-in-out';

const TRANSITION = transition(STATE_TO_STATE, [animate(PROPERTIES)]);

const ANIMATION = [START_STATE, END_STATE, TRANSITION];

export const relocation = trigger(name, ANIMATION);
