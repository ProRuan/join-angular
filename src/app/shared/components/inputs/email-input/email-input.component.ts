import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { emailPattern } from '../../../ts/validate';

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
 * Represents an email input component.
 * @extends {ReactiveInput}
 */
export class EmailInputComponent extends ReactiveInput {
  placeholder: string = 'Email';
  override img: string = 'email';
  pattern: RegExp = emailPattern;

  @Input() override control!: FormControl;

  @Input() inputValidators: ValidatorFn[] = [
    Validators.required,
    Validators.pattern(this.pattern),
  ];

  /**
   * Initializes an email input component.
   */
  ngOnInit() {
    this.control = this.fb.control('', this.inputValidators);
  }
}
