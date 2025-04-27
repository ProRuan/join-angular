import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { JoinService } from '../../../services/join.service';
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
 * @extends ReactiveInput
 */
export class PasswordInputComponent extends ReactiveInput {
  join: JoinService = inject(JoinService);

  masked: boolean = true;
  matchValueSubject = new BehaviorSubject<string>(this.value);
  matchValue$ = this.matchValueSubject.asObservable();

  @Input() override control: AbstractControl | null = null;

  @Input() set config(config: InputConfig) {
    this.setInput(config);
  }

  @Input() set matchValue(value: string) {
    this.matchValueSubject.next(value);
  }

  /**
   * Initializes a password input component.
   */
  ngOnInit() {
    this.updateValidation();
  }

  /**
   * Updates a password validation.
   */
  updateValidation() {
    this.matchValue$.subscribe({
      next: (value) => this.updateValidationState(value),
    });
  }

  /**
   * Updates a password validation state.
   * @param value - The match value.
   */
  updateValidationState(value: string) {
    if (value) {
      this.setValidators(value);
      this.updateValueAndValidity();
      if (this.isFilled()) this.validateExistingControl();
    }
  }

  /**
   * Sets matchword validators.
   * @param value - The match value.
   */
  setValidators(value: string) {
    let validators = this.validators.getMatchword(value);
    this.control?.setValidators(validators);
  }

  /**
   * Gets an input type.
   * @returns The input type.
   */
  getType() {
    return this.masked ? 'password' : 'text';
  }

  /**
   * Prevents an event on copy or cut.
   * @param event - The ClipboardEvent.
   */
  onPrevent(event: ClipboardEvent) {
    event.preventDefault();
  }

  /**
   * Gets the css class of a button icon.
   * @returns The css class of the button icon.
   */
  getIconClass() {
    if (this.isMaskedAndFilled()) return 'vis-off';
    if (this.isFilled()) return 'vis-on';
    return 'lock';
  }

  /**
   * Verifies the masked and filled state of an input.
   * @returns A boolean value.
   */
  isMaskedAndFilled() {
    return this.masked && this.isFilled();
  }

  /**
   * Verifies the disabled state of a button.
   * @returns A boolean value.
   */
  isDisabled() {
    return !this.isFilled();
  }

  /**
   * Toggles the visibility of a password on click.
   */
  onToggle() {
    this.masked = !this.masked;
  }
}
