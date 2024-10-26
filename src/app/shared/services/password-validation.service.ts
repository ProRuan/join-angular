import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a password validation service.
 */
export class PasswordValidationService {
  [key: string]: any;
  lockAhead: string = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])';
  passwordRawPat: string = '[\\dA-Za-z!@#$%^&*]{8,20}$';
  passwordPat: RegExp;

  /**
   * Creates a password validation service.
   */
  constructor() {
    this.passwordPat = this.getPasswordPat();
  }

  getPasswordPat() {
    return new RegExp(this.lockAhead + this.passwordRawPat);
  }

  getPassword(password: string) {
    let result = this.getResult(password);
    return result ? result[0] : '';
  }

  getResult(password: string) {
    return password.match(this.passwordPat);
  }

  isPasswordValid(password: string) {
    let result = this.getResult(password);
    return result != null ? true : false;
  }

  isInvalidPassword(value: string) {
    let longEnough = this.isLongEnough(value);
    let valid = this.isPasswordValid(value);
    return !(longEnough && valid) ? true : false;
  }

  isLongEnough(value: string) {
    let password = this.getPassword(value);
    return password.length > 7;
  }
}
