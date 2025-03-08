import { Injectable } from '@angular/core';
import { InputValidator } from '../models/input-validator';
import {
  dueDatePatterns,
  emailPatterns,
  namePatterns,
  passwordPatterns,
} from '../ts/pattern';
import { getDayStartTime, getISODateString } from '../ts/global';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorService {
  [key: string]: any;
  rejected: boolean = false;
  validator = new InputValidator();

  // password pattern with 4 subpatterns ...
  // password() --> 4 suberrors ... ?!

  // update errors on reactive input ... !
  // errors with ending dot or not ... ?
  // forbidden with " " ... !
  // dueDate --> date invalid ... ?!

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

  required = [this.validator.required()];

  // add more validators!!!
  dueDate = [
    this.validator.required(),
    this.validator.forbidden(dueDatePatterns.forbidden),
    this.validator.dueDate(dueDatePatterns.dueDate),
    this.validator.invalidDate(dueDatePatterns.dueDate),
    this.validator.minDate(dueDatePatterns.dueDate),
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
      this.validator.matchword(value),
      this.validator.maxLength(127),
    ];
  }
}
