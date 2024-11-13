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
  chars: string = 'abcdefghijklmnopqrstuvwxyzäöüß';
  digits: string = '0123456789';
  specials: string = '_%+-@.';

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
   * Provides the result of the email validation.
   * @param email - The email to validate.
   * @returns - The RegExpMatchArray or null.
   */
  getResult(email: string) {
    return email.match(this.emailPat);
  }

  /**
   * Provides the hint of the email input.
   * @returns - The hint of the email input.
   */
  getHint() {
    return 'Enter a valid email.';
  }

  /**
   * Provides the raw set.
   * @returns - The raw set.
   */
  getRawSet() {
    return this.chars + this.digits + this.specials;
  }

  /**
   * Verifies the invalidity of the email.
   * @param value - The value to verify.
   * @returns - A boolean value.
   */
  isInvalid(value: string) {
    let email = this.getEmail(value);
    return email.length < 1 ? true : false;
  }
}
