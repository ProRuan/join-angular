import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

let name = 'revelation';

let startStyle = style({
  backgroundColor: '#f6f7f8',
});

let endStyle = style({
  backgroundColor: 'transparent',
  pointerEvents: 'none',
});

const START_STATE = state(`${name}-start`, startStyle);

const END_STATE = state(`${name}-end`, endStyle);

const STATE_TO_STATE = `${name}-start => ${name}-end`;

const PROPERTIES = '300ms 700ms ease-in-out';

const TRANSITION = transition(STATE_TO_STATE, [animate(PROPERTIES)]);

const ANIMATION = [START_STATE, END_STATE, TRANSITION];

export const revelation = trigger(name, ANIMATION);
