import { Injectable } from '@angular/core';
import { InputValidator } from '../models/input-validator';
import { emailPatterns, passwordPatterns } from '../ts/pattern';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorService {
  validator = new InputValidator();

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

  constructor() {}
}
