import { Injectable } from '@angular/core';

const uC = 'A-ZÄÖÜ';
const lC = 'a-zäöüß';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a password validation service.
 */
export class PasswordValidationService {
  [key: string]: any;
  lockAhead: string = `^(?=.*\\d)(?=.*[${lC}])(?=.*[${uC}])(?=.*[!@#$%^&*])`;
  passwordRawPat: string = `[\\d${uC}${lC}!@#$%^&*]{8,20}$`;
  passwordPat: RegExp;
  upperCase: RegExp = /[A-ZÄÖÜ]/;
  lowerCase: RegExp = /[a-zäöüß]/;
  digit: RegExp = /\d/;
  chars: string = 'abcdefghijklmnopqrstuvwxyzäöüß';
  digits: string = '0123456789';
  specials: string = '!@#$%^&*';

  /**
   * Creates a password validation service.
   */
  constructor() {
    this.passwordPat = this.getPasswordPat();
  }

  /**
   * Provides the password pattern.
   * @returns - The password pattern.
   */
  getPasswordPat() {
    return new RegExp(this.lockAhead + this.passwordRawPat);
  }

  /**
   * Provides the validated password.
   * @param password - The password to validate.
   * @returns - The validated password.
   */
  getPassword(password: string) {
    let result = this.getResult(password);
    return result ? result[0] : '';
  }

  /**
   * Provides the result of the password validation.
   * @param password - The password to match.
   * @returns - The RegExpMatchArray or null.
   */
  getResult(password: string) {
    return password.match(this.passwordPat);
  }

  /**
   * Provides the hint of the password input.
   * @param password - The password to validate.
   * @returns - The hint of the password input.
   */
  getHint(password: string) {
    if (password.length > 7) {
      return this.getSecurityHint(password);
    } else {
      return 'Enter at least 8 characters';
    }
  }

  /**
   * Provides the security hint of the password input.
   * @param password - The password to validate.
   * @returns - The security hint of the password input.
   */
  getSecurityHint(password: string) {
    if (!this.upperCase.test(password)) {
      return 'Use at least 1 capital letter.';
    } else if (!this.lowerCase.test(password)) {
      return 'Use at least 1 small letter';
    } else if (!this.digit.test(password)) {
      return 'Use at least 1 digit.';
    } else {
      return 'Use at least 1 special character.';
    }
  }

  /**
   * Provides the raw set.
   * @returns - The raw set.
   */
  getRawSet() {
    return this.chars + this.digits + this.specials;
  }

  /**
   * Verifies the invalidity of the password.
   * @param password - The password to validate.
   * @returns - A boolean value.
   */
  isInvalid(password: string) {
    let longEnough = this.isLongEnough(password);
    let valid = this.isPasswordValid(password);
    return !(longEnough && valid) ? true : false;
  }

  /**
   * Verifies the length of the password.
   * @param value - The input value.
   * @returns - A boolean value.
   */
  isLongEnough(value: string) {
    let password = this.getPassword(value);
    return password.length > 7;
  }

  /**
   * Verifies the validity of the password.
   * @param password - The password to validate.
   * @returns - A boolean value.
   */
  isPasswordValid(password: string) {
    let result = this.getResult(password);
    return result != null ? true : false;
  }

  /**
   * Provides the match pattern.
   * @param password - The password to validate.
   * @returns - The match pattern.
   */
  getMatchPattern(password: string) {
    let passwordValid = this.isPasswordValid(password);
    return passwordValid ? password : '';
  }

  /**
   * Provides the match hint.
   * @param password1 - The password1 to match.
   * @param password2 - The password2 to match.
   * @returns - The match hint.
   */
  getMatchHint(password1: string, password2: string) {
    if (this.isPasswordLonger(password1, password2)) {
      return 'This password is longer.';
    } else if (this.isPasswordWrong(password1, password2)) {
      return "Your passwords don't match. Please try again.";
    } else {
      return 'Confirm your password.';
    }
  }

  /**
   * Verifies the longer password (matchword).
   * @param password1 - The password1 to match.
   * @param password2 - The password2 to match.
   * @returns - A boolean value.
   */
  isPasswordLonger(password1: string, password2: string) {
    let password = this.isPasswordValid(password1);
    return password && password2.length > password1.length;
  }

  /**
   * Verifies the wrong password (matchword).
   * @param password1 - The password1 to match.
   * @param password2 - The password2 to match.
   * @returns - A boolean value.
   */
  isPasswordWrong(password1: string, password2: string) {
    let password = this.isPasswordValid(password1);
    let lengthMatch = this.isLengthMatch(password1, password2);
    let valueMatch = this.isValueMatch(password1, password2);
    return password && lengthMatch && !valueMatch;
  }

  /**
   * Verifies the length match of the passwords.
   * @param password1 - The password1 to match.
   * @param password2 - The password2 to match.
   * @returns - A boolean value.
   */
  isLengthMatch(password1: string, password2: string) {
    return password1.length == password2.length;
  }

  /**
   * Verifies the value match of the passwords.
   * @param password1 - The password1 to match.
   * @param password2 - The password2 to match.
   * @returns - A boolean value.
   */
  isValueMatch(password1: string, password2: string) {
    return password1 == password2;
  }

  /**
   * Verifies the password mismatch.
   * @param password1 - The password1 to match.
   * @param password2 - The password2 to match.
   * @returns - A boolean value.
   */
  isMismatch(password1: string, password2: string) {
    let passwordValid = this.isPasswordValid(password1);
    return passwordValid && password1 != password2;
  }
}
