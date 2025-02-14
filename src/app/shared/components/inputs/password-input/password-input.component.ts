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
  @Input() set matchValue(value: string) {
    if (value.length > 7) {
      this.control?.setValidators(this.inputs.getMatchword(value));
    } else {
      this.control?.setValidators([]);
    }
    // sometimes no error update ...
    // move to sign-up component ... ?!
    this.control?.updateValueAndValidity();

    const errors = [
      'required',
      'forbidden',
      'minLength',
      'upperCase',
      'lowerCase',
      'digit',
      'specialChar',
      'sequence',
      'name',
      'email',
      'password',
      'maxLength',
    ];
    this.error = '';
    for (let i = 0; i < errors.length; i++) {
      let error = errors[i];
      if (this.control?.hasError(error)) {
        this.error = this.control.getError(error);
        break;
      }
    }
    console.log('error: ', this.error);
  }

  // PasswordInputComponent: mask, button etc. ...

  // JoinService
  // -----------
  // getUserBySid() ...
  // getUserDoc() ...
  // getSessionId() ...

  // LoginComponent
  // --------------
  // logIn() --> sid ...
  // rememberUser() ...
  // onUserLogin() + onGuestLogin() ...

  @Input() set config(config: InputConfig) {
    this.set(config);
  }
}
