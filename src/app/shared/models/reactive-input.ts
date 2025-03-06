import { forwardRef, inject, InjectionToken } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

// verify!!!
import { InputValidator } from './input-validator';
import { InputConfig } from '../interfaces/input-config';
import { InputValidatorService } from '../services/input-validator.service';

/**
 * Class representing a reactive input.
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
  error: string = ''; // errorText?!

  // define errors on input components!!!
  possibleErrors: string[] = [
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

  placeholder: string = '';
  img: string = '';

  validators: ValidatorFn[] = [];
  validator = new InputValidator();
  valOff: boolean = false; // input value!!!
  // update text input and password input for displayed error!!!

  /**
   * Gets the current value of a control.
   * @returns The current value of the control.
   */
  get value() {
    return this.control?.value;
  }

  /**
   * Sets the current value of a control.
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
   * Validates a control on change.
   */
  onChange() {
    if (this.control) {
      this.validate(this.control);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const error = this.getValidationError(control);

    this.error = '';
    for (let error of this.possibleErrors) {
      if (this.control?.hasError(error)) {
        this.error = this.control.getError(error);
        break;
      }
    }

    return error;
  }

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
    this.control?.markAsDirty(); // verfiy this!!!
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

  isInvalid() {
    return this.dirty && this.invalid;
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
