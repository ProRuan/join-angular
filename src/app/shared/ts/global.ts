import { Converter } from '../interfaces/converter';
import { Model } from '../interfaces/model';
import { User } from '../models/user';
import { getRandomId } from './identify';

const DD: string = '(0[1-9]|[12][0-9]|3[01])';
const MM: string = '(0[1-9]|1[0-2])';
const YYYY: string = '([0-9]{4})';
const calenderRawPat: string = `${YYYY}[\\/\\-]${MM}[\\/\\-]${DD}`;

export const calenderPat: RegExp = new RegExp(calenderRawPat);

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
 * Provides the custom array.
 * @param items - The input array.
 * @param Model - The custom class.
 * @returns - The custom array.
 */
export function getCustomArray<T>(items: T[] = [], Model: Model<T>) {
  return items.map((item) => new Model(item));
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
 * Provides the verified id.
 * @param id - The id to verify.
 * @returns - The id.
 */
export function getId(id?: string) {
  const verified = id && id.length > 0;
  return verified ? id : getRandomId();
}

/**
 * Provides the ISO date string.
 * @returns - The ISO date string.
 */
export function getISODateString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Provides a number.
 * @param value - The input number.
 * @param defaultValue - The default number.
 * @returns - A number.
 */
export function getNumber(value?: number, defaultValue: number = 0) {
  return value ?? defaultValue;
}

/**
 * Provides the model as object.
 * @param model - The model to convert.
 * @returns - The model as object.
 */
export function getObject<T>(model: T) {
  return { ...model };
}

/**
 * Provides the object array.
 * @param items - The input array.
 * @param Converter - The converter class.
 * @returns - The object array.
 */
export function getObjectArray<T>(items: T[] = [], Converter: Converter<T>) {
  return items.map((item) => new Converter(item).getObject());
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
 * Verifies the default array.
 * @param value - The array.
 * @param defaultValue - The default array.
 * @returns - A boolean value.
 */
export function isDefaultArray<T>(value: T[], defaultValue: T[] = []) {
  return value.length === defaultValue.length;
}

/**
 * Verifies the default string.
 * @param value - The string.
 * @param defaultValue - The default string.
 * @returns - A boolean value.
 */
export function isDefaultString(value: string, defaultValue: string = '') {
  return value === defaultValue;
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
 * Checks the value for true.
 * @param value - The value.
 * @returns - A boolean value.
 */
export function isTrue(value: boolean | null) {
  return value ? true : false;
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
