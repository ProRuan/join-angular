import { Injectable } from '@angular/core';
import { NameVal } from '../models/name-val';
import { EmailVal } from '../models/email-val';
import { PasswordVal } from '../models/password-val';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents a validation service.
 */
export class ValidationService {
  /**
   * Provides the result of the name validation.
   * @param name - The name to validate.
   * @returns - The result of the name validation.
   */
  getName(name: string) {
    return new NameVal(name).getResult();
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
}
