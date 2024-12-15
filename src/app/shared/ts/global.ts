import { User } from '../models/user';

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
