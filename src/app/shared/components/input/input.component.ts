import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordMaskService } from '../../services/password-mask.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})

/**
 * Represents an input component.
 * @implements - The ControlValueAccessor.
 */
export class InputComponent implements ControlValueAccessor {
  masker: PasswordMaskService = inject(PasswordMaskService);

  value: string = '';
  mask: string = '';
  maskTimeout: any;
  visible: boolean = false;
  focussed: boolean = false;
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() img: string = '';
  @Input() condition: boolean = false;
  @Input() hint: string = '';
  @Input() disabled: boolean = false;

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
   * @param event - The event which occurs on change.
   */
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Provides the css class of the outer input container.
   * @returns - The css class to apply.
   */
  getContClass() {
    if (this.disabled) {
      return 'semi-opacity';
    } else if (this.isHintDisplayed()) {
      return 'height-plus';
    } else {
      return '';
    }
  }

  /**
   * Verifies the display state of the hint.
   * @returns - A boolean value.
   */
  isHintDisplayed() {
    return this.focussed && this.condition;
  }

  /**
   * Verifies the input of the type password.
   * @returns - A boolean value.
   */
  isPasswordType() {
    return this.type == 'password';
  }

  /**
   * Provides the css class of the password input.
   * @returns - The css class to apply.
   */
  getPasswordClass() {
    if (this.isError()) {
      return this.visible ? 'error' : `${this.type} error`;
    } else {
      return this.visible ? '' : this.type;
    }
  }

  /**
   * Verifies the error state of the input.
   * @returns - A boolean value.
   */
  isError() {
    return this.isHintDisplayed() || this.isValueInvalid();
  }

  /**
   * Verifies the invalidity of the input value.
   * @returns - A boolean value.
   */
  isValueInvalid() {
    return this.condition && this.isFilled();
  }

  /**
   * Verifies the fill state of the input.
   * @returns - A boolean value.
   */
  isFilled() {
    return this.value.length > 0;
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
   * Updates the password mask on change.
   * @param event - The keyboard event.
   */
  onPasswordChange(event: KeyboardEvent) {
    clearTimeout(this.maskTimeout);
    this.maskPassword(event);
  }

  /**
   * Masks the password.
   * @param event - The keyboard event.
   */
  maskPassword(event: KeyboardEvent) {
    let key = this.masker.getKey(event);
    if (this.masker.isDisallowedKey(key)) {
      event.preventDefault();
    } else if (this.masker.isChangingKey(key)) {
      this.updateMask(event, key);
    }
  }

  /**
   * Updates the password mask.
   * @param event - The occurring event.
   * @param key - The key to process.
   */
  updateMask(event: Event, key: string) {
    let cursorPos = this.masker.getCursorPos(event);
    setTimeout(() => {
      this.mask = this.masker.getMask(key, this.value, cursorPos);
      this.maskTimeout = setTimeout(() => {
        this.mask = this.masker.getFinalMask(this.mask, cursorPos);
      }, 250);
    }, 0);
  }

  /**
   * Prevents copy event and cut event.
   * @param event - The occurring event.
   */
  onCopyCut(event: Event): void {
    let clipboard = event as ClipboardEvent;
    clipboard.clipboardData?.setData('text', '');
    event.preventDefault();
  }

  /**
   * Provides the css class of the password visibility.
   * @returns - The css class to apply.
   */
  getVis() {
    if (this.isFilled()) {
      return this.visible ? 'reveal' : 'conceal';
    } else {
      return '';
    }
  }

  /**
   * Toggles the visibility of the password.
   */
  onVisChange() {
    this.visible = !this.visible ? true : false;
  }

  /**
   * Provides the css class of the input error.
   * @returns - The css class to apply.
   */
  getErrorClass() {
    return this.isError() ? 'error' : '';
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return '../../../../assets/img/global/' + this.img;
  }

  /**
   * Provides the css class of the mask input.
   * @returns - The css class to apply.
   */
  getMaskClass() {
    return this.visible ? 'hide-mask' : '';
  }
}
