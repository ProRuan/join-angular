import { forwardRef, inject, InjectionToken } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

/**
 * Represents a reactive input.
 * @implements {ControlValueAccessor}
 * @implements {Validator}
 */
export class ReactiveInput implements ControlValueAccessor, Validator {
  fb: FormBuilder = inject(FormBuilder);

  control!: FormControl;
  focused: boolean = false;
  touched: boolean = false;
  invalid: boolean = false;
  error: string = '';
  img: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  /**
   * Gets the current value of the control.
   * @returns The current value of the control.
   */
  get value() {
    return this.control.value;
  }

  /**
   * Sets the current value of the control.
   * @param value - The value to set.
   */
  set value(value: string) {
    this.control.setValue(value);
  }

  /**
   * Writes the input value.
   * @param value - The value to write.
   */
  writeValue(value: string) {
    this.control.setValue(value);
  }

  /**
   * Registers a function to be called on change.
   * @param fn - The function to register.
   */
  registerOnChange(fn: any) {
    this.control.valueChanges.subscribe(fn);
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
    if (!this.touched) {
      this.touched = true;
    }
  }

  /**
   * Blurs the input on blur.
   */
  onBlur() {
    this.focused = false;
  }

  // edit!!!
  // ----------
  validate(control: AbstractControl): ValidationErrors | null {
    this.invalid = false;
    this.error = '';
    if (this.control.invalid) {
      this.invalid = true;
      if (this.control.hasError('minlength')) {
        this.error = 'Enter at least 2 characters.';
      }
      return { invalidName: true };
    } else {
      return null;
    }
    // return this.control.valid ? null : { invalidName: true };
  }

  // Custom Validators
  uppercaseValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return /[A-Z]/.test(value) ? null : { uppercase: true };
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
    let invalid = this.touched && this.invalid;
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
