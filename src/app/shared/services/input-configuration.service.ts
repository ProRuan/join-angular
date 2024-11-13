import { Injectable } from '@angular/core';
import { nameVal, emailVal, passwordVal } from './input-validation.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents an input configuration service.
 */
export class InputConfigurationService {
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

  input: { [key: string]: any } = {
    name: {
      placeholder: 'Name',
      pattern: nameVal.namePat,
      required: true,
      img: 'person.png',
      hint: () => nameVal.getHint(),
      charSet: this.getCharSet(nameVal),
      isInvalid: (value: string) => nameVal.isInvalid(value),
    },
    email: {
      placeholder: 'Email',
      pattern: emailVal.emailPat,
      required: true,
      img: 'email.png',
      hint: () => emailVal.getHint(),
      charSet: this.getCharSet(emailVal),
      isInvalid: (value: string) => emailVal.isInvalid(value),
    },
    password: {
      placeholder: 'Password',
      pattern: passwordVal.passwordPat,
      required: true,
      img: 'lock.png',
      hint: (value: string) => passwordVal.getHint(value),
      charSet: this.getCharSet(passwordVal),
      isInvalid: (value: string) => passwordVal.isInvalid(value),
    },
    matchword: {
      placeholder: 'Confirm password',
      pattern: (value: string) => passwordVal.getMatchPattern(value),
      required: true,
      img: 'lock.png',
      hint: (matchValue: string, value: string) =>
        passwordVal.getMatchHint(matchValue, value),
      charSet: this.getCharSet(passwordVal),
      isInvalid: (matchValue: string, value: string) =>
        passwordVal.isMismatch(matchValue, value),
    },
  };

  /**
   * Provides the char set.
   * @param val - The validation service.
   * @returns - The char set.
   */
  getCharSet(val: any) {
    let rawCharSet = val.getRawSet();
    return new Set(rawCharSet);
  }

  /**
   * Provides the input configuration.
   * @param key - The key of the input type.
   * @returns - The input configuration.
   */
  getInput(key: string) {
    return this.input[key];
  }
}
