import { CharCodeGroup } from '../interfaces/char-code-group';

let charCodes: string[] = [];
const DIGITS: CharCodeGroup = { start: 48, amount: 10 };
const UPPERCASES: CharCodeGroup = { start: 65, amount: 26 };
const LOWERCASES: CharCodeGroup = { start: 97, amount: 26 };

init();

/**
 * Initializes the charCodes.
 */
function init() {
  addCharCodeGroup(DIGITS);
  addCharCodeGroup(UPPERCASES);
  addCharCodeGroup(LOWERCASES);
}

/**
 * Adds a char code group.
 * @param group - The char code group to add.
 */
function addCharCodeGroup(group: CharCodeGroup) {
  let a = group.start;
  let n = group.start + group.amount;
  for (let i = a; i < n; i++) {
    charCodes.push(String.fromCharCode(i));
  }
}

/**
 * Provides a random index.
 * @param i - The index of the id.
 * @returns - A random index.
 */
function getRandomIndex(i: number) {
  if (i != 0) {
    return Math.round(Math.random() * 61);
  } else {
    return Math.round(1 + Math.random() * 60);
  }
}

/**
 * Provides a random id.
 * @returns - The random id.
 */
export function getRandomId() {
  let id = '';
  for (let i = 0; i < 20; i++) {
    let index = getRandomIndex(i);
    id += charCodes[index];
  }
  return id;
}
