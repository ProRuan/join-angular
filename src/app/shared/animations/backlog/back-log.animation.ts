import { BACK_LOG_ANIMATION_DATA } from './back-log.data';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChildAnimationData,
  DialogAnimationData,
  PropertyData,
} from '../../interfaces/dialog-animation-data';

const name = 'backLogAnimation';
const data = BACK_LOG_ANIMATION_DATA;

/**
 * Gets a dialog animation.
 * @returns The dialog animation.
 */
function getDialogAnimation() {
  const definitions = getDefinitions();
  return trigger(name, definitions);
}

/**
 * Gets animation definitions.
 * @returns The animation definitions.
 */
function getDefinitions() {
  return data.map((d) => getTransitionData(d));
}

/**
 * Gets transition data.
 * @param data - The dialog animation data.
 * @returns The transition data.
 */
function getTransitionData(data: DialogAnimationData) {
  const state = data.parent.state;
  const steps = getGroupData(data);
  return transition(state, steps);
}

/**
 * Gets group data.
 * @param data - The dialog animation data.
 * @returns The group data.
 */
function getGroupData(data: DialogAnimationData) {
  const steps = getSteps(data);
  return [group(steps)];
}

/**
 * Gets animation steps.
 * @param data - The dialog animation data.
 * @returns The animation steps.
 */
function getSteps(data: DialogAnimationData) {
  const startStyle = getStyleData(data.parent.properties.start);
  const animation = getParentAnimation(data);
  const queries = getQueries(data);
  return [startStyle, animation, ...queries];
}

/**
 * Gets style data.
 * @param properties - The property data.
 * @returns The style data.
 */
function getStyleData(properties: PropertyData[]) {
  return style(properties);
}

/**
 * Gets a parent animation.
 * @param data - The dialog animation data.
 * @returns The parent animation.
 */
function getParentAnimation(data: DialogAnimationData) {
  const parent = data.parent;
  const styleData = getStyleData(parent.properties.end);
  return animate(parent.timings, styleData);
}

/**
 * Gets animation queries.
 * @param data - The dialog animation data.
 * @returns The animation queries.
 */
function getQueries(data: DialogAnimationData) {
  const children = data.children;
  return children.map((child) => getQuery(child));
}

/**
 * Gets query data.
 * @param child - The child animation data.
 * @returns The query data.
 */
function getQuery(child: ChildAnimationData) {
  const selector = child.selector;
  const animation = getChildAnimation(child);
  const options = child.options;
  return query(selector, animation, options);
}

/**
 * Gets a child animation.
 * @param child - The child animation data.
 * @returns The child animation.
 */
function getChildAnimation(child: ChildAnimationData) {
  const startStyle = getStyleData(child.properties.start);
  const timings = child.timings;
  const styleData = getStyleData(child.properties.end);
  return [startStyle, animate(timings, styleData)];
}

export const backLogAnimation = getDialogAnimation();
