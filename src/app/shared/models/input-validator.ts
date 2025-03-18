import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DateFormatterService } from '../services/date-formatter.service';
import { inject } from '@angular/core';

type Control = AbstractControl;

/**
 * Class providing validator functions for an input validation.
 */
export class InputValidator {
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
   * Validates the filled state of an input.
   * @returns The ValidatorFn.
   */
  required(): ValidatorFn {
    return (control: Control) => this.getRequiredError(control);
  }

  /**
   * Gets a required error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  private getRequiredError(control: Control) {
    const error = this.requiredError;
    return control.value ? null : error;
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
   * Gets a minLength error.
   * @param control - The abstract control.
   * @param minLength - The minimum length.
   * @returns The ValidationErrors or null.
   */
  private getMinLengthError(control: Control, minLength: number) {
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
  private isTooShort(control: Control, minLength: number) {
    return control.value.length < minLength;
  }

  /**
   * Gets a minLength error object.
   * @param minLength - The minimum length.
   * @returns The minLength error object.
   */
  private getMinLengthErrorObject(minLength: number) {
    return { minLength: `Use ${minLength}+ characters` };
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
   * Gets an maxLength error.
   * @param control - The abstract control.
   * @param maxLength - The maximum length.
   * @returns ValidationErrors or null.
   */
  private getMaxLengthError(control: Control, maxLength: number) {
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
  private isTooLong(control: Control, maxLength: Number) {
    return control.value.length > maxLength;
  }

  /**
   * Gets a maxLength error object.
   * @param maxLength - The maximum length.
   * @returns The maxLength error object.
   */
  private getMaxLengthErrorObject(maxLength: number) {
    return { maxLength: `Maximum ${maxLength} characters allowed` };
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
   * Rejects an input value by an excluding pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  private getRejectorFn(key: string, pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getRejectionError(control, key, pattern);
  }

  /**
   * Throws an error, if the excluding pattern matches an input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  private getRejectionError(control: Control, key: string, pattern: RegExp) {
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
  private getError(key: string, pattern: RegExp, control?: Control) {
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
  private getChar(pattern: RegExp, control?: Control) {
    return control?.value ? control.value.match(pattern) : '';
  }

  /**
   * Gets ValidationErrors.
   * @param key - The error key.
   * @returns The ValidationErrors.
   */
  private getErrorValue(key: string, char: string) {
    const text = this.getErrorText(key, char);
    return { [key]: text };
  }

  /**
   * Gets an error text.
   * @param key - The error key.
   * @param char - The char.
   * @returns The error text.
   */
  private getErrorText(key: string, char: string) {
    const text = this.errors[key];
    return char ? `${text} "${char}"` : text;
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
   * Validates a name within an inut value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  name(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('name', pattern);
  }

  /**
   * Accepts an input value by an including pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  private getAcceptorFn(key: string, pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getAcceptionError(control, key, pattern);
  }

  /**
   * Throws an error, if the including pattern mismatches an input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  private getAcceptionError(control: Control, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern);
    return pattern.test(control.value) ? null : error.value;
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
   * Gets an invalidDate error.
   * @param control - The abstract control.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  private getInvalidDateError(control: Control, pattern: RegExp) {
    let dateMatched = pattern.test(control.value);
    return dateMatched ? this.getDateError(control) : null;
  }

  /**
   * Gets a date error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  private getDateError(control: Control) {
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
  private isDateInvalid(date: string) {
    return new Date(date).toDateString() == 'Invalid Date';
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
   * Gets a minDate error.
   * @param control - The abstract control.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  private getMinDateError(control: Control, pattern: RegExp) {
    let dateMatched = pattern.test(control.value);
    return dateMatched ? this.getMinTimeError(control) : null;
  }

  /**
   * Gets a minimum time error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  private getMinTimeError(control: Control) {
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
  private isDatePast(date: string) {
    return new Date(date).getTime() < this.minTime;
  }
}
