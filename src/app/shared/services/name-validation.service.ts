import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a name validation service.
 */
export class NameValidationService {
  superDashPat: RegExp = /\-{2,}/g;
  superSpacePat: RegExp = /[\s|\-]{2,}/g;
  nameRawPat: string = '(([A-Za-z])[A-Za-z]+(?:\\-[A-Za-z]{2,})?)';
  namePat: RegExp;
  chars: string = 'abcdefghijklmnopqrstuvwxyzäöüß';
  dash: string = '-';
  space: string = ' ';

  /**
   * Creates a name validation service.
   */
  constructor() {
    this.namePat = this.getNamePat();
  }

  /**
   * Provides the name pattern.
   * @returns - The name pattern.
   */
  getNamePat() {
    return new RegExp(`${this.nameRawPat}(?:\\s${this.nameRawPat})*`);
  }

  /**
   * Provides the full name.
   * @param name - The input name.
   * @returns - The full name.
   */
  getFullName(name: string) {
    let fullName = this.getNameGroup(name, 0);
    return this.getFormattedFullName(fullName);
  }

  /**
   * Provides the name group.
   * @param name - The input name.
   * @param i - The index of the name group.
   * @returns - The name group.
   */
  getNameGroup(name: string, i: number) {
    let result = this.getResult(name);
    return result ? result[i] : '';
  }

  /**
   * Provides the result of the name validation.
   * @param name - The input name.
   * @returns - The result of the name validation.
   */
  getResult(name: string) {
    name = this.getCleanedUpName(name);
    let result = name.match(this.namePat);
    return result ? result : '';
  }

  /**
   * Provides the cleaned up name.
   * @param name - The input name.
   * @returns - The cleaned up name.
   */
  getCleanedUpName(name: string) {
    name = name.replaceAll(this.superDashPat, '-');
    name = name.replaceAll(this.superSpacePat, ' ');
    return name;
  }

  /**
   * Verifies the validity of the name.
   * @param name - The name to validate.
   * @returns - A boolean value.
   */
  isNameValid(name: string) {
    let result = this.getResult(name);
    return result ? true : false;
  }

  /**
   * Provides the formatted full name.
   * @param fullName - The full name to format.
   * @returns - The formatted full name.
   */
  getFormattedFullName(fullName: string) {
    let names = fullName.split(' ');
    return this.getFormattedNames(names);
  }

  /**
   * Provides the formatted names.
   * @param names - The names to format.
   * @returns - The formatted names.
   */
  getFormattedNames(names: string[]) {
    names.forEach((name, i) => {
      names[i] = this.getFormattedName(name);
    });
    return this.getRewrittenFullName(names);
  }

  /**
   * Provides the formatted name.
   * @param name - The name to format.
   * @returns - The formatted name.
   */
  getFormattedName(name: string) {
    if (name.includes('-')) {
      return this.getFormattedDoubleName(name);
    } else {
      return this.getFormatted(name);
    }
  }

  /**
   * Provides the formatted double name.
   * @param name - The input name.
   * @returns - The formatted double name.
   */
  getFormattedDoubleName(name: string) {
    let doubleName = name.split('-');
    this.formatDoubleName(doubleName);
    return this.getRewrittenName(name, doubleName);
  }

  /**
   * Formats the double name.
   * @param doubleName - The double name to format.
   */
  formatDoubleName(doubleName: string[]) {
    doubleName.forEach((singleName, i) => {
      doubleName[i] = this.getFormatted(singleName);
    });
  }

  /**
   * Provides the formatted name or initial.
   * @param name - The name or initial to format.
   * @returns - The formatted name or initial.
   */
  getFormatted(name: string) {
    if (name) {
      let initial = name[0].toUpperCase();
      return initial + name.slice(1).toLowerCase();
    } else {
      return name;
    }
  }

  /**
   * Provides the rewritten name.
   * @param name - The name to rewrite.
   * @param doubleName - The input double name.
   * @returns - The rewritten name.
   */
  getRewrittenName(name: string, doubleName: string[]) {
    doubleName.forEach((singleName, i) => {
      i == 0 ? (name = singleName) : (name += `-${singleName}`);
    });
    return name;
  }

  /**
   * Provides the rewritten full name.
   * @param names - The input names.
   * @returns - The rewritten full name.
   */
  getRewrittenFullName(names: string[]) {
    let fullName = '';
    names.forEach((name) => {
      fullName == '' ? (fullName = name) : (fullName += ` ${name}`);
    });
    return fullName;
  }

  /**
   * Provides the user name.
   * @param name - The input name.
   * @returns - The user name.
   */
  getUserName(name: string) {
    let userName = this.getName(name, 1);
    if (this.isNameGroup(name, 3)) {
      userName += this.getLastName(name);
    }
    return userName;
  }

  /**
   * Provides the name.
   * @param name - The input name.
   * @param index - The index of the name group.
   * @returns - The name.
   */
  getName(name: string, index: number) {
    name = this.getNameGroup(name, index);
    return this.getFormattedName(name);
  }

  /**
   * Verifies the name group.
   * @param name - The input name.
   * @param i - The index of the name group.
   * @returns - A boolean value.
   */
  isNameGroup(name: string, i: number) {
    let result = this.getResult(name);
    return result && result[i] ? true : false;
  }

  /**
   * Provides the last name.
   * @param name - The name input.
   * @returns - The last name.
   */
  getLastName(name: string) {
    let lastName = this.getName(name, 3);
    return ` ${lastName}`;
  }

  /**
   * Provides the initials.
   * @param name - The input name.
   * @returns - The initials.
   */
  getInitials(name: string) {
    let initials = this.getInitial(name, 2);
    if (this.isNameGroup(name, 4)) {
      initials += this.getInitial(name, 4);
    }
    return initials;
  }

  /**
   * Provides the initial.
   * @param name - The input name.
   * @param index - The index of the name group.
   * @returns - The initial.
   */
  getInitial(name: string, index: number) {
    let firstInitial = this.getNameGroup(name, index);
    return this.getFormatted(firstInitial);
  }

  /**
   * Provides the hint of the name input.
   * @returns - The hint of the name input.
   */
  getHint() {
    return 'Enter at least 2 letters.';
  }

  /**
   * Provides the raw set.
   * @returns - The raw set.
   */
  getRawSet() {
    return this.chars + this.dash + this.space;
  }

  /**
   * Verifies the invalidity of the name.
   * @param value - The value to verify.
   * @returns - A boolean value.
   */
  isInvalid(value: string) {
    let name = this.getUserName(value);
    return name.length < 2 ? true : false;
  }
}
