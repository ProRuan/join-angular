import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
} from '@angular/forms';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import { emailPatterns } from '../../../ts/pattern';

@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss',
  providers: [
    getProvider(NG_VALUE_ACCESSOR, EmailInputComponent),
    getProvider(NG_VALIDATORS, EmailInputComponent),
  ],
})

/**
 * Class representing an email input component.
 * @extends {ReactiveInput}
 */
export class EmailInputComponent extends ReactiveInput {
  placeholder: string = 'Email';
  patterns = emailPatterns;

  override img: string = 'email';

  @Input() override control: AbstractControl | null = null;

  @Input() override inputValidators: ValidatorFn[] = [
    this.validator.required(),
    this.validator.forbidden(this.patterns.forbidden),
    this.validator.minLength(6),
    this.validator.email(this.patterns.email),
    this.validator.maxLength(127),
  ];

  /**
   * Initializes an email input component.
   */
  ngOnInit() {
    this.control?.setValidators(this.inputValidators);
  }
}
