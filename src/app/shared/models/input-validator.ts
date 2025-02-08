import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * Class providing validator functions for an input validation.
 */
export class InputValidator {
  errors: Record<string, string> = {
    forbidden: 'Forbidden character: ',
    sequence: 'Invalid character sequence: ',
    name: 'Start with 2+ letters',
    email: 'Enter a valid email',
    upperCase: 'Use 1+ upper-case characters',
    lowerCase: 'Use 1+ lower-case characters',
    digit: 'Use 1+ digits',
    specialChar: 'Use 1+ special characters',
  };

  /**
   * Validates the filled state of an input.
   * @returns ValidatorFn.
   */
  required(): ValidatorFn {
    return Validators.required;
  }

  /**
   * Validates the minimum length of an input value.
   * @param value - The value to set.
   * @returns ValidatorFn.
   */
  minLength(value: number): ValidatorFn {
    return Validators.minLength(value);
  }

  /**
   * Validates the maximum length of an input value.
   * @param value - The value to set.
   * @returns ValidatorFn.
   */
  maxLength(value: number): ValidatorFn {
    return Validators.maxLength(value);
  }

  /**
   * Validates the existence of forbidden characters within the input value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  forbidden(pattern: RegExp): ValidatorFn {
    return this.rejectPattern('forbidden', pattern);
  }

  /**
   * Rejects an input value by an excluding pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  private rejectPattern(key: string, pattern: RegExp): ValidatorFn {
    return (control: AbstractControl) => this.reject(control, key, pattern);
  }

  /**
   * Throws an error, if the excluding pattern matches the input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns ValidationErrors or null.
   */
  private reject(control: AbstractControl, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern, control);
    return error.pattern.test(control.value) ? error.value : null;
  }

  /**
   * Gets the error.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @param control - The abstract control.
   * @returns The error.
   */
  private getError(key: string, pattern: RegExp, control?: AbstractControl) {
    const char = this.getChar(pattern, control);
    const value = this.getErrorValue(key, char);
    return { pattern, value };
  }

  /**
   * Gets the char.
   * @param pattern - The test pattern.
   * @param control - The abstract control.
   * @returns The char.
   */
  private getChar(pattern: RegExp, control?: AbstractControl) {
    return control?.value ? control.value.match(pattern) : undefined;
  }

  /**
   * Gets ValidationErrors.
   * @param key - The error key.
   * @returns ValidationErrors.
   */
  private getErrorValue(key: string, char?: string): ValidationErrors {
    const text = this.getErrorText(key, char);
    return { [key]: text };
  }

  /**
   * Gets an error text.
   * @param key - The error key.
   * @param char - The char.
   * @returns The error text.
   */
  private getErrorText(key: string, char?: string) {
    const text = this.errors[key];
    return char ? text + char : text;
  }

  /**
   * Validates the character sequence within the input value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  sequence(pattern: RegExp): ValidatorFn {
    return this.rejectPattern('sequence', pattern);
  }

  /**
   * Validates a name within an inut value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  name(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('name', pattern);
  }

  /**
   * Accepts an input value by an including pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  private acceptPattern(key: string, pattern: RegExp): ValidatorFn {
    return (control: AbstractControl) => this.accept(control, key, pattern);
  }

  /**
   * Throws an error, if the including pattern mismatches the input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns ValidationErrors or null.
   */
  private accept(control: AbstractControl, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern);
    return pattern.test(control.value) ? null : error.value;
  }

  /**
   * Validates an email within an input value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  email(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('email', pattern);
  }

  /**
   * Validates the existence of upper-case characters within the input value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  upperCase(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('upperCase', pattern);
  }

  /**
   * Validates the existence of lower-case characters within theinput value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  lowerCase(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('lowerCase', pattern);
  }

  /**
   * Validates the existence of digits within the input value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  digit(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('digit', pattern);
  }

  /**
   * Validates the existence of special characters within the input value.
   * @param pattern - The test pattern.
   * @returns ValidatorFn.
   */
  specialChar(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('specialChar', pattern);
  }
}
