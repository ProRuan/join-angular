import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputConfig } from '../../../interfaces/input-config';
import { stopPropagation } from '../../../ts/global';

type TextStyle = { [key: string]: string };

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
  maskedValue: string = '';
  masked: boolean = true;
  textStyle!: TextStyle;

  @Input() override control: AbstractControl | null = null;

  @Input() set config(config: InputConfig) {
    this.setInput(config);
  }

  @Input() set matchValue(value: string) {
    this.setValidators(value);
    this.updateValueAndValidity();
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
   * Initializes a password input component.
   */
  ngOnInit() {
    this.textStyle = this.getAltTextStyle();
    this.updateMaskedValue();
  }

  /**
   * Gets an alternative text style.
   * @returns The alternative text style.
   */
  getAltTextStyle() {
    return {
      color: 'white',
      caretColor: 'black',
      fontFamily: 'courier, monospace',
    };
  }

  /**
   * Updates a password input on change.
   */
  override onChange(): void {
    this.updateMaskedValue();
    this.validateExistingControl();
  }

  /**
   * Updates a masked value.
   */
  updateMaskedValue() {
    this.maskedValue = '';
    for (let i = 0; i < this.value.length; i++) {
      this.maskedValue += '\u25cf';
    }
  }

  /**
   * Gets the css class of a selection.
   * @returns The css class of the selection.
   */
  getSelectionClass() {
    return this.masked ? 'selection' : '';
  }

  /**
   * Gets a text style.
   * @returns The text style.
   */
  getTextStyle() {
    return this.isMaskedAndFilled() ? this.textStyle : null;
  }

  /**
   * Verifies the masked and filled state of an input.
   * @returns A boolean value.
   */
  isMaskedAndFilled() {
    return this.masked && this.isFilled();
  }

  /**
   * Gets the css class of a button icon.
   * @returns The css class of the button icon.
   */
  getIconClass() {
    if (this.isMaskedAndFilled()) {
      return 'vis-off';
    } else if (this.isFilled()) {
      return 'vis-on';
    } else {
      return 'lock';
    }
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

  /**
   * Disallows specified key combinations.
   * @param event - The KeyboardEvent.
   */
  onDisallow(event: KeyboardEvent) {
    if (this.isDisallowedKey(event)) {
      stopPropagation(event);
    }
  }

  /**
   * Verifies a disallowed key.
   * @param event - The KeyboardEvent.
   * @returns A boolean value.
   */
  isDisallowedKey(event: KeyboardEvent) {
    let ctrlKey = event.ctrlKey;
    let key = event.key.toLowerCase();
    return ctrlKey && (key == 'f' || key == 'g');
  }

  /**
   * Prevents an event on copy or cut.
   * @param event - The ClipboardEvent.
   */
  onPrevent(event: ClipboardEvent) {
    event.preventDefault();
  }
}
