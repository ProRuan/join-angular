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

/**
 * Represents a reactive input.
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
export class ReactiveInput implements ControlValueAccessor, Validator {
  fb: FormBuilder = inject(FormBuilder);

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
  img: string = '';

  inputValidators: ValidatorFn[] = [];
  validator = new InputValidator();

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
    console.log('touched: ', this.control?.touched);
    this.control?.markAsDirty();
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

  isInvalid(error: ValidationErrors | null) {
    return !!error;
  }

  getValidationError(control: AbstractControl): ValidationErrors | null {
    for (let validator of this.inputValidators) {
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
    let larger = this.focused && this.invalid;
    return larger ? 'h-70' : 'h-48';
  }

  /**
   * Gets the css class of the input.
   * @returns The css class of the input.
   */
  getInputClass() {
    let invalid = this.dirty && this.invalid;
    return invalid ? 'invalid' : 'default';
  }

  /**
   * Gets the source path of the icon.
   * @returns The source path of the icon.
   */
  getSrc() {
    return `/assets/img/input/${this.img}.png`;
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
