import { User } from '../models/user';

/**
 * Provides an array.
 * @param value - The input array.
 * @param defaultValue - The default array.
 * @returns - An array.
 */
export function getArray<type>(value?: type[], defaultValue: type[] = []) {
  return value ?? defaultValue;
}

/**
 * Provides a boolean.
 * @param value - The input boolean.
 * @param defaultValue - The default boolean.
 * @returns - A boolean.
 */
export function getBoolean(value?: boolean, defaultValue: boolean = false) {
  return value ?? defaultValue;
}

/**
 * Provides the capitalized word.
 * @param word - The word to capitalize.
 * @returns - The capitalized word.
 */
export function getCapitalized(word: string) {
  if (word.length > 1) {
    return word[0].toUpperCase() + word.slice(1);
  } else if (word.length > 0) {
    return word.toUpperCase();
  } else {
    return word;
  }
}

/**
 * Provides the day start time as number.
 * @param date - The date as string.
 * @returns - The day start time as number.
 */
export function getDayStartTime(date: string) {
  let dayStartTime = new Date(date).setHours(0, 0, 0, 0);
  return new Date(dayStartTime).getTime();
}

/**
 * Provides the ISO date string.
 * @returns - The ISO date string.
 */
export function getISODateString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Provides a string.
 * @param value - The input string.
 * @param defaultValue - The default string.
 * @returns - A string.
 */
export function getString(value?: string, defaultValue: string = '') {
  return value ?? defaultValue;
}

/**
 * Provides the current time.
 * @returns - The current time.
 */
export function getTime() {
  return new Date().getTime();
}

/**
 * Verifies the existence of the value.
 * @param value - The value.
 * @returns - A boolean value.
 */
export function isExistent(value: any) {
  return value !== undefined;
}

/**
 * Loads the user.
 * @returns - The user or undefined.
 */
export function loadUser() {
  let userAsText = localStorage.getItem('user');
  if (userAsText) {
    let user = JSON.parse(userAsText);
    return new User(user);
  } else {
    return undefined;
  }
}

/**
 * Saves the user.
 * @param data - The user data.
 */
export function saveUser(data: User) {
  let user = new User(data);
  let userAsText = JSON.stringify(user);
  localStorage.setItem('user', userAsText);
}

/**
 * Stops the event.
 * @param event - The event.
 */
export function stop(event: Event) {
  event.stopPropagation();
}
