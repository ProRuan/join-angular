import { Converter } from '../interfaces/converter';
import { Model } from '../interfaces/model';
import { getRandomId } from './identify';

// check main components ...

// check missing services ...
// check missing models ...
// check interfaces ...
// check components ...
// check scripts ...

// check other missing files (folder by folder) ...

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Gets a boolean value.
 * @param value - The input boolean value.
 * @param defaultValue - The default boolean value.
 * @returns A boolean value.
 */
export function getBoolean(value?: boolean, defaultValue: boolean = false) {
  return value ?? defaultValue;
}

/**
 * Gets a capitalized word.
 * @param word - The word to capitalize.
 * @returns The capitalized word.
 */
export function getCapitalized(word: string) {
  if (word.length > 1) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else if (word.length > 0) {
    return word.toUpperCase();
  } else {
    return word;
  }
}

/**
 * Gets a custom array.
 * @param items - The input array.
 * @param Model - The custom class.
 * @returns The custom array.
 */
export function getCustomArray<T>(items: T[] = [], Model: Model<T>) {
  return items.map((item) => new Model(item));
}

/**
 * Gets a day start time as number.
 * @param date - The date as string.
 * @returns The day start time as number.
 */
export function getDayStartTime(date: string) {
  let dayStartTime = new Date(date).setHours(0, 0, 0, 0);
  return new Date(dayStartTime).getTime();
}

/**
 * Gets a verified id.
 * @param id - The id.
 * @returns The verified id.
 */
export function getId(id?: string) {
  const verified = id && id.length > 0;
  return verified ? id : getRandomId();
}

/**
 * Gets an initial letter of a word.
 * @param word - The word.
 * @returns The initial letter.
 */
export function getInitial(word: string) {
  return word.charAt(0).toLowerCase();
}

/**
 * Gets an ISO date string.
 * @returns The ISO date string.
 */
export function getISODateString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Gets the last element of an array.
 * @param values - The array.
 * @returns The last element.
 */
export function getLastElement<T>(values: T[]) {
  let lastIndex = values.length - 1;
  return values[lastIndex];
}

/**
 * Gets an item from the local storage.
 * @param key - The item key.
 * @returns The item.
 */
export function getLocalItem(key: string) {
  let valueAsText = localStorage.getItem(key);
  if (valueAsText) {
    return JSON.parse(valueAsText);
  } else {
    return null;
  }
}

/**
 * Gets a month name.
 * @param month - The month as number.
 * @returns The month name.
 */
export function getMonthName(month: number) {
  let index = month - 1;
  return monthNames[index];
}

/**
 * Gets a number.
 * @param value - The input number.
 * @param defaultValue - The default number.
 * @returns A number.
 */
export function getNumber(value?: number, defaultValue: number = 0) {
  return value ?? defaultValue;
}

/**
 * Gets a model as object.
 * @param model - The model to convert.
 * @returns The model as object.
 */
export function getObject<T>(model: T) {
  return { ...model };
}

/**
 * Gets an object array.
 * @param items - The input array.
 * @param Converter - The converter class.
 * @returns The object array.
 */
export function getObjectArray<T>(items: T[] = [], Converter: Converter<T>) {
  return items.map((item) => new Converter(item).getObject());
}

/**
 * Gets a string.
 * @param value - The input string.
 * @param defaultValue - The default string.
 * @returns A string.
 */
export function getString(value?: string, defaultValue: string = '') {
  return value ?? defaultValue;
}

/**
 * Gets a current time.
 * @returns The current time.
 */
export function getTime() {
  return new Date().getTime();
}

/**
 * Verifies a default array.
 * @param value - The array.
 * @param defaultValue - The default array.
 * @returns A boolean value.
 */
export function isDefaultArray<T>(value: T[], defaultValue: T[] = []) {
  return value.length === defaultValue.length;
}

/**
 * Verifies a default string.
 * @param value - The string.
 * @param defaultValue - The default string.
 * @returns A boolean value.
 */
export function isDefaultString(value: string, defaultValue: string = '') {
  return value === defaultValue;
}

/**
 * Removes an item from the local storage.
 * @param key - The item key.
 */
export function removeLocalItem(key: string) {
  localStorage.removeItem(key);
}

/**
 * Sets an item at the local storage.
 * @param key - The item key.
 * @param value - The item value.
 */
export function setLocalItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Stops an event at the current object.
 * @param event - The event.
 */
export function stopPropagation(event?: Event) {
  if (event) {
    event.stopPropagation();
  }
}

/**
 * Type representing an interval id.
 */
export type IntervalId = ReturnType<typeof setTimeout>;
