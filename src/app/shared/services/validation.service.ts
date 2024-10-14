import { Injectable } from '@angular/core';
import { NameVal } from '../models/name-val';
import { EmailVal } from '../models/email-val';
import { PasswordVal } from '../models/password-val';
import { ResourceLoader } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a validation service.
 */
export class ValidationService {
  superDashPat: RegExp = /\-{2,}/g;
  superSpacePat: RegExp = /[\s|\-]{2,}/g;

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

  /**
   * Provides the validated password.
   * @param password - The password to validate.
   * @returns - The validated password.
   */
  getPassword(password: string) {
    return new PasswordVal(password).password;
  }

  getPwMismatch(password1: string, password2: string) {
    let pw1Validated = new PasswordVal(password1).ok;
    let pw2Validated = new PasswordVal(password2).ok;
    if (pw1Validated && pw2Validated && password1 != password2) {
      return true;
    } else {
      return false;
    }
  }

  getValidPassword(password: string) {
    return new PasswordVal(password).ok;
  }
}
