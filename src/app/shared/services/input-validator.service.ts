import { Injectable } from '@angular/core';
import { InputValidator } from '../models/input-validator';
import { emailPatterns, namePatterns, passwordPatterns } from '../ts/pattern';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorService {
  [key: string]: any;
  rejected: boolean = false;
  validator = new InputValidator();

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

  constructor() {}

  setRejected(value: boolean) {
    this.rejected = value;
  }

  getMatchword(value: string) {
    return [
      this.validator.required(),
      this.validator.forbidden(passwordPatterns.forbidden),
      this.validator.minLength(8),
      this.validator.password(value),
      this.validator.maxLength(127),
    ];
  }
}
