import { User } from '../models/user';

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
