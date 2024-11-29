import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getProvider } from '../../models/basic-input';
import { PasswordInput } from '../../models/password-input';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, PasswordInputComponent),
    getProvider(NG_VALUE_ACCESSOR, PasswordInputComponent),
  ],
})

/**
 * Represents a password input component.
 * @extends - The PasswordInput.
 */
export class PasswordInputComponent extends PasswordInput {
  @Input('name') type: string = 'name';
  @Input('pattern') override pattern: string = '';
  @Input('hintOff') override hintOff: boolean = false;
  @Input('errorForced') override errorForced: boolean = false;
  @Input('ngModel') set password(value: string) {
    this.value = value;
    this.setMask();
  }
  @Output('ngModelChange') modelChange = new EventEmitter<string>();

  /**
   * Provides the password.
   * @returns - The password.
   */
  get password() {
    return this.value;
  }

  /**
   * Sets the password mask.
   */
  setMask() {
    this.mask = this.value.replaceAll(/./g, '\u25CF');
  }

  /**
   * Updates the model on change.
   * @param value - The input value.
   */
  onModelChange(value: string) {
    this.value = value;
    this.modelChange.emit(this.value);
  }

  /**
   * Initializes the password input component.
   */
  ngOnInit() {
    this.configurateInput(this.type);
  }

  /**
   * Provides the css class of the outer container.
   * @returns - The css class to apply.
   */
  getContClass() {
    let opacity = this.isLocked() ? 'semi-opacity' : '';
    let height = this.isExpanded() ? 'h-70' : 'h-48';
    return `${opacity} ${height}`;
  }

  /**
   * Verifies the locked state of the input.
   * @returns - A boolean value.
   */
  isLocked() {
    return this.isMatchwordInput() ? this.isPatternInvalid() : false;
  }

  /**
   * Verifies the matchword input.
   * @returns - A boolean value.
   */
  isMatchwordInput() {
    return this.type == 'matchword';
  }

  /**
   * Verifies the invalidity of the pattern.
   * @returns - A boolean value.
   */
  isPatternInvalid() {
    let input = this.configurator.getInput('password');
    return input.isInvalid(this.pattern);
  }

  /**
   * Verifies the expanded state of the input.
   * @returns - A boolean value.
   */
  isExpanded() {
    return this.isMatchwordInput() || this.isHintDisplayed();
  }
}
