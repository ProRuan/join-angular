import { forwardRef, inject, InjectionToken } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputValidatorService } from '../services/input-validator.service';
import { InputConfig } from '../interfaces/input-config';

/**
 * Class representing a reactive input.
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
export class ReactiveInput implements ControlValueAccessor, Validator {
  fb: FormBuilder = inject(FormBuilder);
  validators: InputValidatorService = inject(InputValidatorService);

  control: AbstractControl | null = null;
  placeholder: string = '';
  img: string = '';
  valOff: boolean = false;
  focused: boolean = false;
  error: string = '';
  possibleErrors: string[] = [];

  /**
   * Gets the current value of an input control.
   * @returns The current value of the input control.
   */
  get value() {
    return this.control?.value;
  }

  /**
   * Gets the invalid state of an input control.
   * @reutrns A boolean value.
   */
  get invalid() {
    return this.control?.invalid;
  }

  /**
   * Gets the dirty state of an input control.
   * @returns A boolean value.
   */
  get dirty() {
    return this.control?.dirty;
  }

  /**
   * Sets the current value of an input control.
   * @param value - The value to set.
   */
  set value(value: string) {
    this.control?.setValue(value);
  }

  /**
   * Writes an input value.
   * @param value - The value to write.
   */
  writeValue(value: string) {
    this.control?.setValue(value);
  }

  /**
   * Registers a function to be called on change.
   * @param fn - The function to register.
   */
  registerOnChange(fn: any) {
    this.control?.valueChanges.subscribe(fn);
  }

  /**
   * Validates an input control on change.
   */
  onChange() {
    this.validateExistingControl();
  }

  /**
   * Validates an existing input control.
   */
  validateExistingControl() {
    if (this.control) {
      this.validate(this.control);
    }
  }

  /**
   * Validates an input control.
   * @param control - The input control.
   * @returns The ValidationErrors or null.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    this.error = this.getValidationError(control);
    return control.errors;
  }

  /**
   * Gets a validation error.
   * @param control - The input control.
   * @returns The validation error.
   */
  getValidationError(control: AbstractControl): string {
    for (let error of this.possibleErrors) {
      if (control?.hasError(error)) {
        return control.getError(error);
      }
    }
    return '';
  }

  /**
   * Registers a function to be called on touched.
   * @param fn - The function to register.
   */
  registerOnTouched(fn: any) {}

  /**
   * Updates an input value on input.
   * @param event - The event.
   */
  onInput(event: Event) {
    this.setInputValue(event);
    this.onChange();
    this.markAsDirty(this.control);
  }

  /**
   * Sets an input value.
   * @param event - The event.
   */
  setInputValue(event: Event) {
    let input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  /**
   * Marks an input as dirty.
   * @param control - The input control.
   */
  markAsDirty(control: AbstractControl | null) {
    if (control?.pristine) {
      control?.markAsDirty();
    }
  }

  /**
   * Focuses an input on focus.
   */
  onFocus() {
    this.focused = true;
  }

  /**
   * Blurs an input on blur.
   */
  onBlur() {
    this.focused = false;
  }

  /**
   * Gets the css class of the component.
   * @returns The css class of the component.
   */
  getCompClass() {
    return this.valOff ? 'h-48' : 'h-70';
  }

  /**
   * Gets the css class of the input.
   * @returns The css class of the input.
   */
  getInputClass(): string {
    let invalid = this.isInvalid();
    return invalid ? 'invalid' : 'default';
  }

  /**
   * Verifies the invalid state of an input.
   * @returns A boolean value.
   */
  isInvalid() {
    let invalid = !this.valOff && this.dirty && this.invalid;
    let rejected = this.validators.rejected;
    return invalid || rejected;
  }

  /**
   * Gets the source path of an input icon.
   * @returns The source path of the input icon.
   */
  getSrc() {
    return `/assets/img/input/${this.img}.png`;
  }

  /**
   * Verifies the existence of an error.
   * @returns A boolean value.
   */
  isError() {
    return !this.valOff && this.focused && this.error;
  }

  /**
   * Verifies the existence of a permanent error.
   * @returns A boolean value.
   */
  isPermanentError() {
    return !this.control?.pristine && this.error;
  }

  /**
   * Sets an input configuration.
   * @param config - The input configuration.
   */
  setInput(config: InputConfig) {
    this.placeholder = config.placeholder;
    this.img = config.img;
    this.valOff = config.valOff;
    this.setPossibleErrors(config);
  }

  /**
   * Sets possible errors.
   * @param config - The input configuration.
   */
  setPossibleErrors(config: InputConfig) {
    if (config.possibleErrors) {
      this.possibleErrors = config.possibleErrors;
    }
  }

  /**
   * Updates control value and validity.
   */
  updateValueAndValidity() {
    this.control?.updateValueAndValidity();
  }

  /**
   * Verifies the filled state of an input.
   * @returns A boolean value.
   */
  isFilled() {
    return this.value.length > 0;
  }
}

/**
 * Gets the provider of a dependency.
 * @param token - The injection token of the implement.
 * @param component - The component to refer.
 * @returns The provider of the dependency.
 */
export function getProvider<T>(token: InjectionToken<any>, component: T) {
  return {
    provide: token,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
