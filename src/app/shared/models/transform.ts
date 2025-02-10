import {
  animate,
  AnimationMetadata,
  AnimationTransitionMetadata,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Properties } from '../interfaces/properties';
import { Styles } from '../interfaces/styles';
import { States } from '../interfaces/states';

/**
 * Class representing a transform (animation).
 */
export class Transform {
  name: string;
  properties: Properties;
  styles: Styles;
  states: States;
  stateChangeExpr: string;
  timings: string | number;
  transition: AnimationTransitionMetadata;
  animation: AnimationMetadata[];

  /**
   * Creates a transform (animation).
   * @param name - The transform name.
   * @param properties - The css properties.
   * @param timings - The transform timings.
   */
  constructor(name: string, properties: Properties, timings: string) {
    this.name = name;
    this.properties = properties;
    this.styles = this.getStyles();
    this.states = this.getStates();
    this.stateChangeExpr = this.getStateChangeExpr();
    this.timings = this.getTimings(timings);
    this.transition = this.getTransition();
    this.animation = this.getAnimation();
  }

  /**
   * Gets the animation start.
   * @returns The animation start.
   */
  get start(): string {
    return this.name + '-start';
  }

  /**
   * Gets the animation end.
   * @returns The animation end.
   */
  get end(): string {
    return this.name + '-end';
  }

  /**
   * Gets the animation styles.
   * @returns The animation styles.
   */
  getStyles() {
    return {
      start: style(this.properties.start),
      end: style(this.properties.end),
    };
  }

  /**
   * Gets the animation states.
   * @returns The animation states.
   */
  getStates() {
    return {
      start: state(this.start, this.styles.start),
      end: state(this.end, this.styles.end),
    };
  }

  /**
   * Gets the state change expression.
   * @returns The state change expression.
   */
  getStateChangeExpr() {
    return `${this.start} => ${this.end}`;
  }

  /**
   * Gets the animation timings.
   * @param timings - The animation timings.
   * @returns The animation timings.
   */
  getTimings(timings: string) {
    return timings;
  }

  /**
   * Gets the transition.
   * @returns The transition.
   */
  getTransition() {
    return transition(this.stateChangeExpr, [animate(this.timings)]);
  }

  /**
   * Gets the animation.
   * @returns The animation.
   */
  getAnimation() {
    return [this.states.start, this.states.end, this.transition];
  }

  /**
   * Triggers the animation.
   * @returns The animation trigger meta data.
   */
  trigger(): AnimationTriggerMetadata {
    return trigger(this.name, this.animation);
  }
}
