import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { PasswordVal } from '../../models/password-val';

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
  val: ValidationService = inject(ValidationService);

  agent: string = '';
  cache: string = '';
  value: string = '';
  agentTimeout: any;
  visible: boolean = false;
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() img: string = '';
  @Input() condition: boolean = false;
  @Input() hint: string = '';
  @Output() onVisibility = new EventEmitter<any>();

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

  getAgent() {
    return this.visible ? 'agent-plus' : '';
  }

  /**
   * Provides the css class.
   * @returns - The css class name.
   */
  getClass() {
    return this.type && !this.visible ? this.type : '';
  }

  updatePassword(event: KeyboardEvent) {
    let chars = 'abcdefghijklmnopqrstuvwxyzäöüß';
    let digits = '0123456789';
    let special = '!@#$%^&*';
    const allowedChars = chars + digits + special;
    const charSet = new Set(allowedChars);
    let keyboard = event;
    let key = keyboard.key;
    let tempKey = key.toLowerCase();
    console.log('key: ', key);
    console.log('temp key: ', tempKey);
    let allowedKeys = [
      'home',
      'end',
      'insert',
      'delete',
      'backspace',
      'tab',
      'capslock',
      'shift',
      'control',
      'meta',
      'alt',
      'altgraph',
      'arrowleft',
      'arrowright',
    ];

    let input = event.target as HTMLInputElement;

    clearTimeout(this.agentTimeout);

    if (!charSet.has(tempKey) && !allowedKeys.includes(tempKey)) {
      keyboard.preventDefault();
    } else if (
      charSet.has(tempKey) ||
      tempKey == 'backspace' ||
      tempKey == 'delete'
    ) {
      // update confirmed value!!!
      this.cache = this.value;
      let newIndex = input.selectionStart ? input.selectionStart : 0;
      setTimeout(() => {
        // this.agent = this.value;
        this.agent = '';
        for (let i = 0; i < this.value.length; i++) {
          if (i != newIndex || tempKey == 'backspace' || tempKey == 'delete') {
            this.agent += `\u25CF`;
          } else {
            this.agent += this.value[newIndex];
          }
        }
        console.log('value: ', this.value);
        console.log('value agent: ', this.agent);

        setTimeout(() => {
          this.agent = this.agent.replace(this.agent[newIndex], '\u25CF');
        }, 250);
      }, 0);
    }
  }

  isInvalidPassword() {
    let password = this.val.getPassword(this.value);
    let passwordValid = new PasswordVal(this.value).ok;
    if (password.length < 8 || !passwordValid) {
      return true;
    } else {
      return false;
    }
  }

  getPasswordHint() {
    // let blackCircle: string = '\u25CF';
    // console.log(blackCircle); // Output: ●
    // this.password =
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle +
    //   blackCircle;

    if (this.value.length > 7) {
      if (!/[A-Z]/.test(this.value)) {
        return 'Use at least 1 capital letter.';
      } else if (!/[a-z]/.test(this.value)) {
        return 'Use at least 1 small letter';
      } else if (!/\d/.test(this.value)) {
        return 'Use at least 1 digit.';
      } else {
        return 'Use at least 1 special character.';
      }
    } else {
      return 'Enter at least 8 characters';
    }
  }

  preventCopyPaste(event: Event): void {
    let clipboard = event as ClipboardEvent;
    clipboard.clipboardData?.setData('text', '');
    event.preventDefault();
  }

  /**
   * Provides the source path.
   * @returns - The source path.
   */
  getSrc() {
    return '../../../../assets/img/global/' + this.img;
  }

  /**
   * Provides the css class of the password visibility.
   * @returns - A css class.
   */
  getVis() {
    if (this.value.length > 0) {
      return this.visible ? 'reveal' : 'conceal';
    } else {
      return '';
    }
  }

  /**
   * Verifies, if the button is to disable.
   * @returns - A boolean value.
   */
  isDisabled() {
    return this.value.length < 1;
  }

  /**
   * Toggles the visibility of the password.
   * @param event - The click event.
   */
  toggleVis(value: boolean) {
    this.visible = !this.visible ? true : false;
    this.onVisibility.emit(!value);
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
}
