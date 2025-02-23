import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

type Control = AbstractControl;

/**
 * Class providing validator functions for an input validation.
 */
export class InputValidator {
  errors: Record<string, string> = {
    forbidden: 'Forbidden character: ',
    upperCase: 'Use 1+ upper-case characters',
    lowerCase: 'Use 1+ lower-case characters',
    digit: 'Use 1+ digits',
    specialChar: 'Use 1+ special characters',
    sequence: 'Invalid character sequence: ',
    name: 'Start with 2+ letters',
    email: 'Enter a valid email',
    password: "Your passwords don't match. Please try again.",
    dueDate: 'Enter a valid date.',
  };

  /**
   * Validates the filled state of an input.
   * @returns ValidatorFn.
   */
  required(): ValidatorFn {
    const text = 'This field is required';
    return (control: Control) => this.require(control, 'required', text);
  }

  require(control: Control, key: string, value: string) {
    const error = this.getSimpleError(key, value);
    return control.value ? null : error;
  }

  getSimpleError(key: string, value: string) {
    return { [key]: value };
  }

  /**
   * Validates the minimum length of an input value.
   * @param value - The value to set.
   * @returns ValidatorFn.
   */
  minLength(minLength: number): ValidatorFn {
    return (control: Control) => this.minimum(control, 'minLength', minLength);
  }

  // use better method name!!!
  minimum(control: Control, key: string, minLength: number) {
    const longEnough = control.value.length < minLength ? true : false;
    const value = `Use ${minLength}+ characters`;
    const error = this.getSimpleError(key, value);
    return longEnough ? error : null;
  }

  /**
   * Validates the maximum length of an input value.
   * @param value - The value to set.
   * @returns ValidatorFn.
   */
  maxLength(maxLength: number): ValidatorFn {
    return (control: Control) => this.maximum(control, 'maxLength', maxLength);
  }

  // use better method name!!!
  maximum(control: Control, key: string, maxLength: number) {
    const tooLong = control.value.length > maxLength ? true : false;
    const value = `Maximum ${maxLength} characters allowed`; // improve!!!
    const error = this.getSimpleError(key, value);
    return tooLong ? error : null;
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
    return (control: Control) => this.reject(control, key, pattern);
  }

  /**
   * Throws an error, if the excluding pattern matches the input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns ValidationErrors or null.
   */
  private reject(control: Control, key: string, pattern: RegExp) {
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
  private getError(key: string, pattern: RegExp, control?: Control) {
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
  private getChar(pattern: RegExp, control?: Control) {
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
    return (control: Control) => this.accept(control, key, pattern);
  }

  /**
   * Throws an error, if the including pattern mismatches the input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns ValidationErrors or null.
   */
  private accept(control: Control, key: string, pattern: RegExp) {
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

  // call it pattern or matchword?!
  password(password: string) {
    let pattern = new RegExp(`^${password}$`);
    return this.acceptPattern('password', pattern);
  }

  dueDate(pattern: RegExp): ValidatorFn {
    return this.acceptPattern('dueDate', pattern);
  }

  invalidDate(pattern: RegExp): ValidatorFn {
    return (control: Control) => this.validateDate(control, pattern);
  }

  validateDate(control: Control, pattern: RegExp): ValidationErrors | null {
    let dateMatched = new RegExp(pattern).test(control.value);
    if (dateMatched) {
      let matchedDate = control.value.match(pattern);
      if (matchedDate) {
        let date = this.getDate(matchedDate);
        let testDate = `${date.year}.${date.month}.${date.day}`;
        if (new Date(testDate).toDateString() != 'Invalid Date') {
          return null;
        } else {
          return { invalidDate: 'invalid date' };
        }
      }
    }
    return null;
  }

  getDate(result: RegExpMatchArray) {
    return { day: result[1], month: result[2], year: result[3] };
  }

  minDate(pattern: RegExp, minTime: number) {
    return (control: Control) => this.limitDateRange(control, pattern, minTime);
  }

  limitDateRange(control: Control, pattern: RegExp, minTime: number) {
    let dateMatched = new RegExp(pattern).test(control.value);
    if (dateMatched) {
      let matchedDate = control.value.match(pattern);
      if (matchedDate) {
        let date = this.getDate(matchedDate);
        let testDate = `${date.year}.${date.month}.${date.day}`;

        if (new Date(testDate).getTime() < minTime) {
          return { minDate: 'Date out of range' };
        } else {
          return null;
        }
      }
    }
    return null;
  }
}
