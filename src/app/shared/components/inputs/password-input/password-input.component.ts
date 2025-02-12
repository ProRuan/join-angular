import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputConfig } from '../../../interfaces/input-config';

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
  @Input() override control: AbstractControl | null = null;

  @Input() set config(config: InputConfig) {
    this.set(config);
  }
}
