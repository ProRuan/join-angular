import { Injectable } from '@angular/core';
import { getCapitalized, getLastElement } from '../ts/global';
import { doubleNamePattern } from '../ts/pattern';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a name formatter service.
 */
export class NameFormatterService {
  pattern: RegExp;

  /**
   * Creates a name formatter service.
   */
  constructor() {
    this.pattern = doubleNamePattern;
  }

  /**
   * Gets a formatted name.
   * @param name - The name to format.
   * @returns The formatted name.
   */
  getFormattedName(name: string) {
    let userName = this.getValidatedName(name);
    return this.getFormattedUserName(userName);
  }

  /**
   * Gets a validated name.
   * @param name - The name to validate.
   * @returns The validated name.
   */
  getValidatedName(name: string) {
    let names = this.getNames(name);
    return names ? this.getUserName(names) : name;
  }

  /**
   * Gets names as an array.
   * @param name - The input name.
   * @returns The names as an array.
   */
  private getNames(name: string) {
    return this.pattern.test(name) ? name.match(this.pattern) : null;
  }

  /**
   * Gets a user name.
   * @param names - The names as an array.
   * @returns The user name.
   */
  private getUserName(names: string[]) {
    let firstName = this.getFirstName(names);
    let lastName = this.getLastName(names);
    return lastName ? `${firstName} ${lastName}` : firstName;
  }

  /**
   * Gets a first name.
   * @param names - The names as an array.
   * @returns Gets the first name.
   */
  private getFirstName(names: string[]) {
    return names[0];
  }

  /**
   * Gets a last name.
   * @param names - The names as an array.
   * @returns The last name.
   */
  private getLastName(names: string[]) {
    return names.length > 1 ? getLastElement(names) : '';
  }

  /**
   * Gets a formatted user name.
   * @param userName - The user name.
   * @returns The formatted user name.
   */
  private getFormattedUserName(userName: string) {
    let doubleNames = userName.split(' ');
    doubleNames = doubleNames.map((n) => this.getFormattedDoubleName(n));
    return doubleNames.join(' ');
  }

  /**
   * Gets a formatted double name.
   * @param doubleName - The double name.
   * @returns The formatted double name.
   */
  private getFormattedDoubleName(doubleName: string) {
    let singleNames = doubleName.split('-');
    singleNames = singleNames.map((n) => getCapitalized(n));
    return singleNames.join('-');
  }

  /**
   * Gets initials from a name.
   * @param name - The name.
   * @returns The initials.
   */
  getInitials(name: string) {
    let names = name.split(' ');
    let initials = names.map((name) => name[0]);
    return initials.join('');
  }
}
