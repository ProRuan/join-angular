import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
} from '@angular/forms';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import { passwordPatterns } from '../../../ts/pattern';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    getProvider(NG_VALUE_ACCESSOR, PasswordInputComponent),
    getProvider(NG_VALIDATORS, PasswordInputComponent),
  ],
})

/**
 * Class representing a password input component.
 * @extends {ReactiveInput}
 */
export class PasswordInputComponent extends ReactiveInput {
  placeholder: string = 'Password';
  patterns = passwordPatterns;

  override img: string = 'lock';

  @Input() override control: AbstractControl | null = null;

  @Input() override inputValidators: ValidatorFn[] = [
    this.validator.required(),
    this.validator.forbidden(this.patterns.forbidden),
    this.validator.minLength(8),
    this.validator.upperCase(this.patterns.upperCase),
    this.validator.lowerCase(this.patterns.lowerCase),
    this.validator.digit(this.patterns.digit),
    this.validator.specialChar(this.patterns.specialChar),
    this.validator.maxLength(127),
  ];

  /**
   * Initializes a password input component.
   */
  ngOnInit() {
    this.control?.setValidators(this.inputValidators);
  }
}
