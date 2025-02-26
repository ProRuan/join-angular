import { forwardRef, inject, InjectionToken } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { InputValidator } from './input-validator';
import { InputConfig } from '../interfaces/input-config';
import { InputValidatorService } from '../services/input-validator.service';

/**
 * Represents a reactive input.
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
export class ReactiveInput implements ControlValueAccessor, Validator {
  fb: FormBuilder = inject(FormBuilder);
  inputs: InputValidatorService = inject(InputValidatorService);

  // create one input component ... ?

  // copy and compare
  // ----------------
  // - Class/Interface/Service/Component representing ...
  // - private functions ... !
  // - shortcut: { name, forbidden, sequence } ...

  // tasks
  // -----
  // pattern specialChars inside of the methods (name, email, password) ...
  // pattern.ts shorcuts: d, l, ...
  // ReactiveInputComponent or TextInputComponent ... ?!
  // global name + pattern  length ...
  // onKeydown() ... ?
  // email error: username@domain.tld ...

  // create own requried/minLength/pattern validator with error object!

  // password input, phone input etc.
  // TextInputComponent
  // build charSet A-Z ...
  // export digitPattern ...
  // /name/g ...?!

  // class PasswordValidator ... !
  // required()
  // forbidden(param)
  // set invalid + error text

  // rename PasswordValidatorFn to InputValidator ...
  // replace { [key: string]: any } with Record<stirng, any> ...
  // replace class PasswordValidatorFn with InputValidator ...

  // rename to InputValidatorFn!

  control: AbstractControl | null = null;

  focused: boolean = false;
  // touched: boolean = false;
  error: string = '';
  placeholder: string = '';
  img: string = '';

  validators: ValidatorFn[] = [];
  validator = new InputValidator();
  valOff: boolean = false; // input value!!!
  // update text input and password input for displayed error!!!

  onChange = (value: string) => {};
  onTouched = () => {};

  /**
   * Gets the current value of the control.
   * @returns The current value of the control.
   */
  get value() {
    return this.control?.value;
  }

  /**
   * Sets the current value of the control.
   * @param value - The value to set.
   */
  set value(value: string) {
    this.control?.setValue(value);
  }

  get invalid() {
    return this.control?.invalid;
  }

  get dirty() {
    return this.control?.dirty;
  }

  /**
   * Writes the input value.
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
   * Registers a function to be called on touched.
   * @param fn - The function to register.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Sets the input value on input.
   * @param event - The occurring event.
   */
  onInput(event: Event) {
    this.value = this.getInputValue(event);
    this.onChange(this.value);
    this.onTouched();
    this.control?.markAsDirty();

    // define errors on input component!!!
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
      'dueDate',
      'invalidDate',
      'minDate',
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

  /**
   * Gets the input value by an event.
   * @param event - The occurring event.
   * @returns The input value.
   */
  getInputValue(event: Event) {
    let input = event.target as HTMLInputElement;
    return input.value;
  }

  /**
   * Focuses the input on focus.
   */
  onFocus() {
    this.focused = true;
  }

  /**
   * Blurs the input on blur.
   */
  onBlur() {
    this.focused = false;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const error = this.getValidationError(control);

    // only for testing!!!
    console.log('error: ', error);

    return error;
  }

  isInvalid() {
    return this.dirty && this.invalid;
  }

  // isInvalid(error: ValidationErrors | null) {
  //   return !!error;
  // }

  // catch error here?!
  getValidationError(control: AbstractControl): ValidationErrors | null {
    for (let validator of this.validators) {
      const result = validator(control);
      if (result) {
        return result;
      }
    }
    return null;
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
    let invalid =
      (!this.valOff && this.dirty && this.invalid) || this.inputs.rejected; // clean?!
    return invalid ? 'invalid' : 'default';
  }

  /**
   * Gets the source path of the icon.
   * @returns The source path of the icon.
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

  // rename isError() and isErrorPermanently()!!!
  isErrorPermanently() {
    return !this.control?.pristine && this.error;
  }

  set(config: InputConfig) {
    this.placeholder = config.placeholder;
    this.img = config.img;
    this.valOff = config.valOff;
  }

  isFilled() {
    return this.value.length > 0;
  }

  markAsDirty(control: AbstractControl | null) {
    if (control?.pristine) {
      control?.markAsDirty();
    }
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
