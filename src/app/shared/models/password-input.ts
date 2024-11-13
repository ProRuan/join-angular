import { inject } from '@angular/core';
import { PasswordMaskService } from '../services/password-mask.service';
import { BasicInput } from './basic-input';

/**
 * Represents a password input.
 * @extends - The BasicInput.
 */
export class PasswordInput extends BasicInput {
  masker: PasswordMaskService = inject(PasswordMaskService);

  visible: boolean = false;
  mask: string = '';
  maskTimeout: any;
  tempValue: string = '';
  cursorPos: number = 0;

  /**
   * Provides the css class of the password input.
   * @returns - The css class to apply.
   */
  getPasswordClass() {
    if (this.isError()) {
      return !this.visible ? 'password error' : 'error';
    } else {
      return !this.visible ? 'password' : '';
    }
  }

  /**
   * Updates the password on change.
   * @param event - The KeyboardEvent.
   */
  onPasswordChange(event: KeyboardEvent) {
    let key = this.masker.getKey(event);
    if (this.masker.isDisallowedKeyboardEvent(event, key)) {
      event.preventDefault();
    } else if (this.masker.isChangingKey(event, key)) {
      clearTimeout(this.maskTimeout);
      this.updateMask(event, key);
    }
  }

  /**
   * Updates the password mask.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   */
  async updateMask(event: KeyboardEvent, key: string) {
    this.tempValue = this.value;
    this.cursorPos = this.masker.getCursorPos(event);
    setTimeout(() => {
      this.updateMaskAfter(event, key);
    }, 0);
  }

  /**
   * Updates the mask after the event.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   */
  updateMaskAfter(event: KeyboardEvent, key: string) {
    let diff = this.value.length - this.tempValue.length;
    this.cursorPos += diff - 1;
    this.mask = this.masker.getMask(key, this.value, this.cursorPos);
    this.completeMask(event, key, diff);
  }

  /**
   * Completes the mask.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @param diff - The length difference of the values.
   */
  completeMask(event: KeyboardEvent, key: string, diff: number) {
    if (this.isMaskComplete(event, key, diff)) {
      this.setCompleteMask();
    } else {
      this.maskTimeout = setTimeout(() => {
        this.setCompleteMask();
      }, 250);
    }
  }

  /**
   * Verifies the complete mask.
   * @param event - The KeyboardEvent.
   * @param key - The pressed key.
   * @param diff - The length difference of the values.
   * @returns - A boolean value.
   */
  isMaskComplete(event: KeyboardEvent, key: string, diff: number) {
    let doingKey = this.masker.isDoingKeyComb(event, key);
    let valueShorter = this.isValueShorter(diff);
    return doingKey || valueShorter;
  }

  /**
   * Verifies the shorter length of the value.
   * @param diff - The length difference of the values.
   * @returns - A boolean value.
   */
  isValueShorter(diff: number) {
    return this.tempValue == this.value || diff < 0;
  }

  /**
   * Sets the complete mask.
   */
  setCompleteMask() {
    this.mask = this.masker.getCompleteMask(this.mask, this.cursorPos);
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
   * Provides the css class of the input visibility.
   * @returns - The ccs class to apply.
   */
  getVisClass() {
    let visibility = this.visible ? 'reveal' : 'conceal';
    return this.isFilled() ? visibility : '';
  }

  /**
   * Sets the input visibility on change.
   */
  onVisChange() {
    this.visible = !this.visible ? true : false;
  }

  /**
   * Provides the css class of the mask visibility.
   * @returns - The css class to apply.
   */
  getMaskClass() {
    return this.visible ? 'hide-mask' : '';
  }

  /**
   * Configurates the advanced attributes of the input.
   * @param input - The input object.
   */
  override configurateAdvancedAttributes(input: any) {
    if (this.isPasswordSubtype(input)) {
      this.setPasswordAttributes(input);
    } else {
      this.setMatchwordAttributes(input);
    }
  }

  /**
   * Verifies the subtype of the password input.
   * @param input - The input object.
   * @returns - A boolean value.
   */
  isPasswordSubtype(input: any) {
    let type = input.placeholder.toLowerCase();
    return type == 'password' ? true : false;
  }

  /**
   * Sets the attributes of the password input.
   * @param input - The input object.
   */
  setPasswordAttributes(input: any) {
    this.pattern = input.pattern;
    this.hint = () => input.hint(this.value);
    this.isInvalid = () => input.isInvalid(this.value);
  }

  /**
   * Sets the attributes of the matchword input.
   * @param input - The input object.
   */
  setMatchwordAttributes(input: any) {
    this.hint = () => input.hint(this.pattern, this.value);
    this.isInvalid = () => input.isInvalid(this.pattern, this.value);
  }
}
