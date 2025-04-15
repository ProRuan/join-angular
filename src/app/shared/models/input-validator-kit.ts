import { AbstractControl, ValidatorFn } from '@angular/forms';
import { inject } from '@angular/core';
import { DateFormatterService } from '../services/date-formatter.service';

type Control = AbstractControl;

/**
 * Class representing an input validator kit.
 */
export class InputValidatorKit {
  dateFormatter: DateFormatterService = inject(DateFormatterService);

  errors: Record<string, string> = {
    forbidden: 'Forbidden character: ',
    upperCase: 'Use 1+ upper-case characters',
    lowerCase: 'Use 1+ lower-case characters',
    digit: 'Use 1+ digits',
    specialChar: 'Use 1+ special characters',
    sequence: 'Invalid character sequence: ',
    name: 'Start with 2+ letters',
    email: 'Enter a valid email',
    matchword: "Your passwords don't match. Please try again.",
    dueDate: 'Enter a valid date',
    phone: 'Enter a valid phone number',
  };

  requiredError = { required: 'This field is required' };
  invalidDateError = { invalidDate: 'Invalid date' };
  minDateError = { minDate: 'Date out of range' };
  minTime: number;

  /**
   * Creates an input validator.
   */
  constructor() {
    this.minTime = this.dateFormatter.getMinTime();
  }

  /**
   * Gets a required error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  protected getRequiredError(control: Control) {
    const error = this.requiredError;
    return control.value ? null : error;
  }

  /**
   * Gets a minLength error.
   * @param control - The abstract control.
   * @param minLength - The minimum length.
   * @returns The ValidationErrors or null.
   */
  protected getMinLengthError(control: Control, minLength: number) {
    const tooShort = this.isTooShort(control, minLength);
    const error = this.getMinLengthErrorObject(minLength);
    return tooShort ? error : null;
  }

  /**
   * Checks if the input value is too short.
   * @param control - The abstract control.
   * @param minLength - The minimum length.
   * @returns A boolean value.
   */
  protected isTooShort(control: Control, minLength: number) {
    return control.value.length < minLength;
  }

  /**
   * Gets a minLength error object.
   * @param minLength - The minimum length.
   * @returns The minLength error object.
   */
  protected getMinLengthErrorObject(minLength: number) {
    return { minLength: `Use ${minLength}+ characters` };
  }

  /**
   * Gets an maxLength error.
   * @param control - The abstract control.
   * @param maxLength - The maximum length.
   * @returns ValidationErrors or null.
   */
  protected getMaxLengthError(control: Control, maxLength: number) {
    const tooLong = this.isTooLong(control, maxLength);
    const error = this.getMaxLengthErrorObject(maxLength);
    return tooLong ? error : null;
  }

  /**
   * Checks if an input value is too long.
   * @param control - The abstract control.
   * @param maxLength - The maximum length.
   * @returns A boolean value.
   */
  protected isTooLong(control: Control, maxLength: Number) {
    return control.value.length > maxLength;
  }

  /**
   * Gets a maxLength error object.
   * @param maxLength - The maximum length.
   * @returns The maxLength error object.
   */
  protected getMaxLengthErrorObject(maxLength: number) {
    return { maxLength: `Maximum ${maxLength} characters allowed` };
  }

  /**
   * Rejects an input value by an excluding pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  protected getRejectorFn(key: string, pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getRejectionError(control, key, pattern);
  }

  /**
   * Throws an error, if the excluding pattern matches an input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  protected getRejectionError(control: Control, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern, control);
    return error.pattern.test(control.value) ? error.value : null;
  }

  /**
   * Gets an error.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @param control - The abstract control.
   * @returns The error.
   */
  protected getError(key: string, pattern: RegExp, control?: Control) {
    const char = this.getChar(pattern, control);
    const value = this.getErrorValue(key, char);
    return { pattern, value };
  }

  /**
   * Gets a char.
   * @param pattern - The test pattern.
   * @param control - The abstract control.
   * @returns The char.
   */
  protected getChar(pattern: RegExp, control?: Control) {
    return control?.value ? control.value.match(pattern) : '';
  }

  /**
   * Gets ValidationErrors.
   * @param key - The error key.
   * @returns The ValidationErrors.
   */
  protected getErrorValue(key: string, char: string) {
    const text = this.getErrorText(key, char);
    return { [key]: text };
  }

  /**
   * Gets an error text.
   * @param key - The error key.
   * @param char - The char.
   * @returns The error text.
   */
  protected getErrorText(key: string, char: string) {
    const text = this.errors[key];
    return char ? `${text} "${char}"` : text;
  }

  /**
   * Accepts an input value by an including pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  protected getAcceptorFn(key: string, pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getAcceptionError(control, key, pattern);
  }

  /**
   * Throws an error, if the including pattern mismatches an input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  protected getAcceptionError(control: Control, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern);
    return pattern.test(control.value) ? null : error.value;
  }

  /**
   * Gets an invalidDate error.
   * @param control - The abstract control.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  protected getInvalidDateError(control: Control, pattern: RegExp) {
    let dateMatched = pattern.test(control.value);
    return dateMatched ? this.getDateError(control) : null;
  }

  /**
   * Gets a date error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  protected getDateError(control: Control) {
    let date = this.dateFormatter.getCalendarDate(control.value);
    let dateInvalid = this.isDateInvalid(date);
    const error = this.invalidDateError;
    return dateInvalid ? error : null;
  }

  /**
   * Checks a date for invalidity.
   * @param date - The date.
   * @returns A boolean value.
   */
  protected isDateInvalid(date: string) {
    return this.dateFormatter.isDateInvalid(date);
  }

  /**
   * Gets a minDate error.
   * @param control - The abstract control.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  protected getMinDateError(control: Control, pattern: RegExp) {
    let dateMatched = pattern.test(control.value);
    return dateMatched ? this.getMinTimeError(control) : null;
  }

  /**
   * Gets a minimum time error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  protected getMinTimeError(control: Control) {
    let date = this.dateFormatter.getCalendarDate(control.value);
    let datePast = this.isDatePast(date);
    const error = this.minDateError;
    return datePast ? error : null;
  }

  /**
   * Checks if a date has been exceeded.
   * @param date - The date.
   * @returns A boolean value.
   */
  protected isDatePast(date: string) {
    return new Date(date).getTime() < this.minTime;
  }
}
