import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Represents an email validation service.
 */
export class EmailValidationService {
  emailRawPat: string = '[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}';
  emailPat: RegExp = new RegExp(this.emailRawPat);

  /**
   * Provides the validated email.
   * @param email - The email to validate.
   * @returns - The validated email.
   */
  getEmail(email: string) {
    let result = this.getResult(email);
    return result != null ? result[0] : '';
  }

  /**
   * Provides the valideted email.
   * @param email - The email to validate.
   * @returns - The email.
   */
  getResult(email: string) {
    return email.match(this.emailPat);
  }

  /**
   * Verifies the email.
   * @param email - The email to validate.
   * @returns - A boolean value.
   */
  isEmailValid(email: string) {
    let result = this.getResult(email);
    return result != null ? true : false;
  }
}
