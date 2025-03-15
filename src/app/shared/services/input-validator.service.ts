import { Injectable } from '@angular/core';
import { InputValidator } from '../models/input-validator';
import {
  dueDatePatterns,
  emailPatterns,
  namePatterns,
  passwordPatterns,
} from '../ts/pattern';
import { getArrayCopy } from '../ts/global';

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
  ];

  /**
   * Marks a form as rejected.
   * @param value - The value to set.
   */
  setRejected(value: boolean) {
    this.rejected = value;
  }

  /**
   * Gets a validator function array for a matchword input.
   * @param password - The password to match.
   * @returns The validator function array for the matchword input.
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

  /**
   * Gets a validator function array for a due date input.
   * @param extended - A boolean value.
   * @returns The validator function array for the due date input.
   */
  getDueDate(extended: boolean = false) {
    let validators = getArrayCopy(this.dueDate);
    if (extended) {
      let validator = this.getMinDate();
      validators.push(validator);
      return validators;
    } else {
      return validators;
    }
  }

  /**
   * Gets a minimum date validator function.
   * @returns The minimum date validator function.
   */
  getMinDate() {
    return this.validator.minDate(dueDatePatterns.dueDate);
  }
}
