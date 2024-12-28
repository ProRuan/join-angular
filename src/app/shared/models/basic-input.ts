import { forwardRef, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
} from '@angular/forms';
import { InputConfigurationService } from '../services/input-configuration.service';

/**
 * Represents a basic input.
 * @implements - The ControlValueAccessor.
 */
export class BasicInput implements ControlValueAccessor {
  configurator: InputConfigurationService = inject(InputConfigurationService);

  value: string = '';
  placeholder: string = '';
  pattern: string = '';
  required: boolean = false;
  img: string = '';
  hint: Function = () => {};
  hintOff: boolean = false;
  focussed: boolean = false;
  errorForced: boolean = false;
  isInvalid: Function = () => {};
  charSet: Set<string> = new Set();
  allowedKeys: string[] = this.configurator.allowedKeys;
  control: any;

  /**
   * Registers the function to be called on change.
   * @param fn - The function to register.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Updates the model on change.
   * @param value - The value to update.
   */
  onChange(value: string) {}

  /**
   * Registers the function to be called on touched.
   * @param fn - The function to register.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Marks the model as touched.
   */
  onTouched() {}

  /**
   * Writes the input value.
   * @param value - The value to write.
   */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
   * Updates the input value on change.
   * @param event - The occurring event.
   */
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Sets the focus state of the input.
   * @param event - The occurring event.
   * @param value - The value to set.
   */
  onFocusChange(event: Event, value: boolean) {
    this.focussed = value;
  }

  /**
   * Provides the css class of the input height.
   * @returns - The css class to apply.
   */
  getHeightClass() {
    return this.isHintDisplayed() ? 'h-70' : 'h-48';
  }

  /**
   * Provides the css class of the error state.
   * @returns - The css class to apply.
   */
  getErrorClass() {
    return this.isError() ? 'error' : '';
  }

  /**
   * Verifies the error state of the input.
   * @returns - A boolean value.
   */
  isError() {
    let hintDisplayed = this.isHintDisplayed();
    let inputInvalid = this.isInputInvalid();
    return this.errorForced || hintDisplayed || inputInvalid;
  }

  /**
   * Verifies the display state of the hint.
   * @returns - A boolean value.
   */
  isHintDisplayed() {
    return !this.hintOff && this.focussed && this.isInvalid();
  }

  /**
   * Verifies the invalid state of the input.
   */
  isInputInvalid() {
    return !this.hintOff && this.isFilled() && this.isInvalid();
  }

  /**
   * Verifies the fill state of the input.
   * @returns - A boolean value.
   */
  isFilled() {
    return this.value.length > 0;
  }

  /**
   * Updates the input value on change.
   * @param event - The KeyboardEvent.
   */
  onValueChange(event: KeyboardEvent) {
    let key = this.getKey(event);
    if (this.isDisallowedKey(key)) {
      event.preventDefault();
    }
  }

  /**
   * Provides the pressed key.
   * @param event - The KeyboardEvent.
   * @returns - The pressed key.
   */
  getKey(event: KeyboardEvent) {
    return event.key ? event.key.toLowerCase() : '';
  }

  /**
   * Verifies the key to disallow.
   * @param key - The key to verifiy.
   * @returns - A boolean value.
   */
  isDisallowedKey(key: string) {
    return !this.charSet.has(key) && !this.allowedKeys.includes(key);
  }

  /**
   * Provides the source path.
   * @param img - The image file.
   * @returns - The source path.
   */
  getSrc(img: string) {
    return '../../../../assets/img/global/' + img;
  }

  /**
   * Configurates the input.
   * @param type - The input type.
   */
  configurateInput(type: string) {
    let input = this.configurator.getInput(type);
    this.configurateBasicAttributes(input);
    this.configurateAdvancedAttributes(input);
  }

  /**
   * Configurates the basic attributes of the input.
   * @param input - The input object.
   */
  configurateBasicAttributes(input: any) {
    this.placeholder = input.placeholder;
    this.required = input.required;
    this.img = input.img;
    this.charSet = input.charSet;
  }

  /**
   * Configurates the advanced attributes of the input.
   * @param input - The input object.
   */
  configurateAdvancedAttributes(input: any) {
    this.pattern = input.pattern;
    this.hint = () => input.hint(this.value);
    this.isInvalid = () => input.isInvalid(this.value);
  }

  /**
   * Validates the input.
   * @param control - The input control.
   * @returns - The validation error or null.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    let required = this.getValidationError('required');
    let matched = this.getValidationError('pattern');
    return required || matched || null;
  }

  /**
   * Provides the validation error.
   * @param key - The key of the input attribute.
   * @returns - The validation error or void.
   */
  getValidationError(key: string): { [x: string]: boolean } | void {
    if (this.isAttributeInvalid(key)) {
      return this.getAttributeState(key);
    }
  }

  /**
   * Verifies the invalidity of the input attribute.
   * @param key - The key of the input attribute.
   * @returns - A boolean value or an emtpy string.
   */
  isAttributeInvalid(key: string) {
    return key == 'required' ? this.isRequired() : this.isMismatch();
  }

  /**
   * Verifies the requirement of the input value.
   * @returns - A boolean value.
   */
  isRequired() {
    return this.required && !this.control.value;
  }

  /**
   * Verifies the mismatch between input value und input pattern.
   * @returns - A boolean value.
   */
  isMismatch() {
    return this.isNotPattern();
  }

  /**
   * Verifies the negative pattern test.
   * @returns - A boolean value.
   */
  isNotPattern() {
    return this.pattern && !new RegExp(this.pattern).test(this.control.value);
  }

  /**
   * Provides the attribute state.
   * @param key - The key of the input attribute.
   * @returns - The attribute state.
   */
  getAttributeState(key: string) {
    return { [key]: true };
  }
}

/**
 * Provides the provider.
 * @param object - The providing object.
 * @param component - The component to reference.
 * @returns - The provider.
 */
export function getProvider(object: any, component: any) {
  return {
    provide: object,
    useExisting: forwardRef(() => component),
    multi: true,
  };
}
