import { Injectable } from '@angular/core';
import { InputValidator } from '../models/input-validator';
import {
  dueDatePatterns,
  emailPatterns,
  namePatterns,
  passwordPatterns,
} from '../ts/pattern';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing an input validator service.
 */
export class InputValidatorService {
  [key: string]: any;
  rejected: boolean = false;
  validator = new InputValidator();

  required = [this.validator.required()];

  name = [
    this.validator.required(),
    this.validator.forbidden(namePatterns.forbidden),
    this.validator.minLength(2),
    this.validator.sequence(namePatterns.sequence),
    this.validator.name(namePatterns.name),
    this.validator.maxLength(127),
  ];

  email = [
    this.validator.required(),
    this.validator.forbidden(emailPatterns.forbidden),
    this.validator.minLength(6),
    this.validator.email(emailPatterns.email),
    this.validator.maxLength(127),
  ];

  password = [
    this.validator.required(),
    this.validator.forbidden(passwordPatterns.forbidden),
    this.validator.minLength(8),
    this.validator.upperCase(passwordPatterns.upperCase),
    this.validator.lowerCase(passwordPatterns.lowerCase),
    this.validator.digit(passwordPatterns.digit),
    this.validator.specialChar(passwordPatterns.specialChar),
    this.validator.maxLength(127),
  ];

  dueDate = [
    this.validator.required(),
    this.validator.forbidden(dueDatePatterns.forbidden),
    this.validator.dueDate(dueDatePatterns.dueDate),
    this.validator.invalidDate(dueDatePatterns.dueDate),
    this.validator.minDate(dueDatePatterns.dueDate),
  ];

  /**
   * Marks a form as rejected.
   * @param value - The value to set.
   */
  setRejected(value: boolean) {
    this.rejected = value;
  }

  /**
   * Gets a ValidatorFn array for a matchword input.
   * @param password - The password to match.
   * @returns The ValidatorFn array for the matchword input.
   */
  getMatchword(password: string) {
    return [
      this.validator.required(),
      this.validator.forbidden(passwordPatterns.forbidden),
      this.validator.minLength(8),
      this.validator.matchword(password),
      this.validator.maxLength(127),
    ];
  }
}
