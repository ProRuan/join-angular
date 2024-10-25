import { inject, Injectable } from '@angular/core';
import { NameVal } from '../models/name-val';
import { EmailVal } from '../models/email-val';
import { PasswordVal } from '../models/password-val';
import { PasswordValidationService } from './password-validation.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a validation service.
 */
export class ValidationService {
  passwordVal: PasswordValidationService = inject(PasswordValidationService);

  [key: string]: any;
  chars: string = 'abcdefghijklmnopqrstuvwxyzäöüß';
  digits = '0123456789';
  emailSpecials = '_%+-@.';
  nameCharSet: Set<string>;
  emailCharSet: Set<string>;
  charSet: Set<string> = new Set();
  allowedKeys: string[] = [
    'home',
    'end',
    'insert',
    'delete',
    'backspace',
    'tab',
    'capslock',
    'shift',
    'control',
    'meta',
    'alt',
    'altgraph',
    'arrowleft',
    'arrowright',
  ];
  upperCase: RegExp = /[A-Z]/;
  lowerCase: RegExp = /[a-z]/;
  digit: RegExp = /\d/;
  // passwordSpecials: RegExp = /!@#\$%\^&\*/;
  nameHint: string = 'Enter at least 2 letters.';
  emailHint: string = 'Enter a valid email.';

  superDashPat: RegExp = /\-{2,}/g;
  superSpacePat: RegExp = /[\s|\-]{2,}/g;

  constructor() {
    this.nameCharSet = this.getCharSet('name');
    this.emailCharSet = this.getCharSet('email');
  }

  getCharSet(type: string) {
    let allowedChars = this.getAllowedChars(type);
    return new Set(allowedChars);
  }

  getAllowedChars(type: string) {
    if (type == 'name') {
      return this.chars + ' ' + '-';
    } else if (type == 'email') {
      return this.chars + this.digits + this.emailSpecials;
    } else {
      return '';
    }
  }

  setCharSet(type: string) {
    if (type == 'name') {
      this.charSet = this.nameCharSet;
    } else if (type == 'email') {
      this.charSet = this.emailCharSet;
    }
  }

  getKey(event: KeyboardEvent) {
    return event.key.toLowerCase();
  }

  isDisallowedKey(key: string) {
    return !this.charSet.has(key) && !this.allowedKeys.includes(key);
  }

  validateInput(event: KeyboardEvent, type: string) {
    this.setCharSet(type);
    this.validateKey(event);
  }

  validateKey(event: KeyboardEvent) {
    let key = this.getKey(event);
    if (this.isDisallowedKey(key)) {
      event.preventDefault();
    }
  }

  isInvalidName(value: string) {
    let name = this.getName(value);
    return name.length < 2 ? true : false;
  }

  isEmailInvalid(value: string) {
    let email = this.getEmail(value);
    return email.length < 1 ? true : false;
  }

  /**
   * Verifies the invalidity of the password.
   * @param password - The password to validate.
   * @returns A boolean value.
   */
  isInvalidPassword(password: string) {
    return this.passwordVal.isInvalidPassword(password);
  }

  isPasswordValid(password: string) {
    return !this.passwordVal.isPasswordValid(password);
  }

  getPasswordHint(value: string) {
    if (value.length > 7) {
      return this.isPasswordSecure(value);
    } else {
      return 'Enter at least 8 characters';
    }
  }

  isPasswordSecure(value: string) {
    if (!this.upperCase.test(value)) {
      return 'Use at least 1 capital letter.';
    } else if (!this.lowerCase.test(value)) {
      return 'Use at least 1 small letter';
    } else if (!this.digit.test(value)) {
      return 'Use at least 1 digit.';
    } else {
      return 'Use at least 1 special character.';
    }
  }

  /**
   * Provides the result of the name validation.
   * @param name - The name to validate.
   * @returns - The result of the name validation.
   */
  getName(name: string) {
    name = this.getCleanedUpName(name);
    let result = new NameVal(name).getResult();
    return result.name;
    // return new NameVal(name).getResult();
  }

  /**
   * Provides the cleaned up name.
   * @param name - The name.
   * @returns The cleaned up name.
   */
  getCleanedUpName(name: string) {
    name = name.replaceAll(this.superDashPat, '-');
    name = name.replaceAll(this.superSpacePat, ' ');
    return name;
  }

  /**
   * Provides the validated email.
   * @param email - The email to validate.
   * @returns - The validated email.
   */
  getEmail(email: string) {
    return new EmailVal(email).email;
  }

  getPattern(type: string) {
    let service = type + 'Val';
    let pattern = type + 'Pat';
    return this[service][pattern];
  }

  getPassword(value: string) {
    return this.passwordVal.getPassword(value);
  }

  // getPwMismatch(password1: string, password2: string) {
  //   return this.isPasswordMismatch(password1, password2) ? true : false;
  // }

  // isPasswordMismatch(password1: string, password2: string) {
  //   let pw1Valid = this.passwordVal.isPasswordValid(password1);
  //   let pw2Valid = this.passwordVal.isPasswordValid(password2);
  //   return pw1Valid && pw2Valid && password1 != password2;
  // }

  getValidPassword(password: string) {
    return this.passwordVal.isPasswordValid(password);
  }

  isPasswordLonger(password1: string, password2: string) {
    let password = this.getValidPassword(password1);
    return password && password2.length > password1.length;
  }

  isPasswordWrong(password1: string, password2: string) {
    let password = this.getValidPassword(password1);
    let lengthMatch = this.getLengthMatch(password1, password2);
    let valueMatch = this.getValueMatch(password1, password2);
    return password && lengthMatch && !valueMatch;
  }

  getLengthMatch(password1: string, password2: string) {
    return password1.length == password2.length;
  }

  getValueMatch(password1: string, password2: string) {
    return password1 == password2;
  }
}
