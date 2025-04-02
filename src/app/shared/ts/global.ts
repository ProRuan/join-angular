import { SimpleChanges } from '@angular/core';
import { Model } from '../interfaces/model';
import { getRandomId } from './identify';
import { ConvertableObject } from './type';
import { Subscription } from 'rxjs';

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
 * Gets an array copy.
 * @param array - The array.
 * @returns The array copy.
 */
export function getArrayCopy<T>(array: T[]) {
  return [...array];
}

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
 * Gets the current value of a changed property.
 * @param changes - The changes.
 * @param key - The property key.
 * @returns The current value.
 */
export function getCurrentValue<T>(changes: SimpleChanges, key: string) {
  return changes[key]?.currentValue as T;
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
 * Gets a last index from an array.
 * @param values - The array.
 * @returns The last index.
 */
export function getLastIndex<T>(values: T[]) {
  return values.length - 1;
}

/**
 * Gets an item from the local storage.
 * @param key - The item key.
 * @returns The item.
 */
export function getLocalItem(key: string) {
  let value = localStorage.getItem(key);
  return getParsedValue(value);
}

/**
 * Gets a parsed value.
 * @param value - The value to parse.
 * @returns The parsed value.
 */
function getParsedValue(value: string | null) {
  return value ? JSON.parse(value) : null;
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
 * Gets object data from a model.
 * @param model - The model.
 * @returns The object data.
 */
export function getObjectData<T>(model: T) {
  return { ...model };
}

/**
 *Gets an object array from a custom array.
 * @param items - The custom array.
 * @returns The object array.
 */
export function getObjectArray<T extends ConvertableObject<T>>(items: T[]) {
  return items.map((item) => item.getObject());
}

/**
 * Gets an item from the session storage.
 * @param key - The item key.
 * @returns The item.
 */
export function getSessionalItem(key: string) {
  let value = sessionStorage.getItem(key);
  return getParsedValue(value);
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
 * Sets an item at the session storage.
 * @param key - The item key.
 * @param value - The item value.
 */
export function setSessionalItem(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value));
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
 * Unsubscribes a subscription.
 * @param subscription - The subscription.
 */
export function unsubscribe(subscription?: Subscription) {
  if (subscription && !subscription.closed) {
    subscription.unsubscribe();
  }
}
