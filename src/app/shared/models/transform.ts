import {
  animate,
  AnimationMetadata,
  AnimationStateMetadata,
  AnimationStyleMetadata,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * Represents a transform.
 */
export class Transform {
  name: string;
  propertiesA: { [key: string]: string | number };
  propertiesB: { [key: string]: string | number };
  styleA?: AnimationStyleMetadata;
  styleB?: AnimationStyleMetadata;
  stateA?: AnimationStateMetadata;
  stateB?: AnimationStateMetadata;
  stateToState?: string;
  timings?: string | number;
  transition?: AnimationTransitionMetadata;
  animation?: AnimationMetadata[];

  /**
   * Creates a transform.
   * @param name - The transform name.
   * @param propertiesA - The property a.
   * @param propertiesB - The property b.
   */
  constructor(
    name: string,
    propertiesA: { [key: string]: string | number },
    propertiesB: { [key: string]: string | number }
  ) {
    this.name = name;
    this.propertiesA = propertiesA;
    this.propertiesB = propertiesB;
    this.set();
  }

  /**
   * Provides the transform start.
   */
  get start(): string {
    return this.name + '-start';
  }

  /**
   * Provides the transform end.
   */
  get end(): string {
    return this.name + '-end';
  }

  /**
   * Sets the transform properties.
   */
  set() {
    this.setStyles();
    this.setStates();
    this.setStateToState();
    this.setTimings();
    this.setTransition();
    this.setAnimation();
  }

  /**
   * Sets the styles.
   */
  setStyles() {
    this.styleA = style(this.propertiesA);
    this.styleB = style(this.propertiesB);
  }

  /**
   * Sets the states.
   */
  setStates() {
    if (this.styleA && this.styleB) {
      this.stateA = state(this.start, this.styleA);
      this.stateB = state(this.end, this.styleB);
    }
  }

  /**
   * Sets the state change expression.
   */
  setStateToState() {
    this.stateToState = `${this.start} => ${this.end}`;
  }

  /**
   * Sets the timings.
   */
  setTimings() {
    this.timings = '300ms 700ms ease-in-out';
  }

  /**
   * Sets the transition.
   */
  setTransition() {
    if (this.stateToState && this.timings) {
      this.transition = transition(this.stateToState, [animate(this.timings)]);
    }
  }

  /**
   * Sets the animation.
   */
  setAnimation() {
    if (this.stateA && this.stateB && this.transition) {
      this.animation = [this.stateA, this.stateB, this.transition];
    }
  }

  /**
   * Triggers the animation.
   * @returns - The animation trigger meta data of false.
   */
  trigger(): AnimationTriggerMetadata | false {
    if (this.animation) {
      return trigger(this.name, this.animation);
    } else {
      return false;
    }
  }
}
