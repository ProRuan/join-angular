import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InputValidatorKit } from './input-validator-kit';

type Control = AbstractControl;

/**
 * Class providing validator functions for an input validation.
 * @extends InputValidatorKit
 */
export class InputValidator extends InputValidatorKit {
  /**
   * Validates the filled state of an input.
   * @returns The ValidatorFn.
   */
  required(): ValidatorFn {
    return (control: Control) => this.getRequiredError(control);
  }

  /**
   * Validates the minimum length of an input value.
   * @param minLength - The minimum length.
   * @returns The ValidatorFn.
   */
  minLength(minLength: number): ValidatorFn {
    return (control: Control) => this.getMinLengthError(control, minLength);
  }

  /**
   * Validates the maximum length of an input value.
   * @param maxLength - The maximum length.
   * @returns The ValidatorFn.
   */
  maxLength(maxLength: number): ValidatorFn {
    return (control: Control) => this.getMaxLengthError(control, maxLength);
  }

  /**
   * Validates the existence of forbidden characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  forbidden(pattern: RegExp): ValidatorFn {
    return this.getRejectorFn('forbidden', pattern);
  }

  /**
   * Validates the character sequence within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  sequence(pattern: RegExp): ValidatorFn {
    return this.getRejectorFn('sequence', pattern);
  }

  /**
   * Validates a name within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  name(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('name', pattern);
  }

  /**
   * Validates an email within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  email(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('email', pattern);
  }

  /**
   * Validates the existence of upper-case characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  upperCase(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('upperCase', pattern);
  }

  /**
   * Validates the existence of lower-case characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  lowerCase(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('lowerCase', pattern);
  }

  /**
   * Validates the existence of digits within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  digit(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('digit', pattern);
  }

  /**
   * Validates the existence of special characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  specialChar(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('specialChar', pattern);
  }

  /**
   * Validates the match between a password and a matchword.
   * @param password - The password to match.
   * @returns The ValidatorFn.
   */
  matchword(password: string): ValidatorFn {
    let pattern = new RegExp(`^${password}$`);
    return this.getAcceptorFn('matchword', pattern);
  }

  /**
   * Validates an input due date.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  dueDate(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('dueDate', pattern);
  }

  /**
   * Validates the invalidity of an input date.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  invalidDate(pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getInvalidDateError(control, pattern);
  }

  /**
   * Validates an input due date for being in range.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  minDate(pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getMinDateError(control, pattern);
  }

  /**
   * Validates a phone number within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  phone(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('phone', pattern);
  }
}
