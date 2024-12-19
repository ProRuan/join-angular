import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { DateData } from '../../interfaces/date-data';

@Component({
  selector: 'app-due-date-input',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './due-date-input.component.html',
  styleUrl: './due-date-input.component.scss',
  providers: [
    getProvider(NG_VALIDATORS, DueDateInputComponent),
    getProvider(NG_VALUE_ACCESSOR, DueDateInputComponent),
  ],
})

/**
 * Represents a due date input component.
 * @extends - The BasicInput.
 */
export class DueDateInputComponent extends BasicInput {
  date: string = '';
  dateInvalid: boolean = false;
  datePat: RegExp = /([0-3]?[0-9])[\.\/]([0-1]?[0-9])[\.\/]([0-9]{4})/;
  calenderPat: RegExp = /([0-9]{4})[\-]([0-1]?[0-9])[\-]([0-3]?[0-9])/;
  arrowKeys: Set<string> = new Set(['ArrowLeft', 'ArrowRight']);
  modifiedKeys: Set<string> = new Set(['a', 'c', 'x']);
  slashNumbers: Set<number> = new Set([2, 5]);

  /**
   * Verifies the key on keydown.
   * @param event - The KeyboardEvent.
   */
  onVerifyKey(event: KeyboardEvent) {
    if (this.isPreventDefault(event)) {
      event.preventDefault();
    } else if (!this.isBackspace(event)) {
      this.addSlash();
    } else if (this.isBackspace(event)) {
      this.clearInputValue(event);
    }
  }

  /**
   * Verifies the event to prevent.
   * @param event - The KeyboardEvent.
   * @returns - A boolean value.
   */
  isPreventDefault(event: KeyboardEvent) {
    let arrowKey = this.isArrowKey(event);
    let keyModified = this.isKeyModified(event);
    let keyAllowed = this.isKeyAllowed(event);
    return !arrowKey && !keyModified && !keyAllowed;
  }

  /**
   * Verifies the arrow key.
   * @param event - The event.
   * @returns - A boolean value.
   */
  isArrowKey(event: KeyboardEvent) {
    return this.arrowKeys.has(event.key);
  }

  /**
   * Verifies the modified key.
   * @param event - The KeyboardEvent.
   * @returns - A boolean value.
   */
  isKeyModified(event: KeyboardEvent) {
    return event.ctrlKey && this.modifiedKeys.has(event.key);
  }

  /**
   * Verifies the allowed key.
   * @param event - The KeyboardEvent.
   * @returns - A boolean value.
   */
  isKeyAllowed(event: KeyboardEvent) {
    return event.key.match(/[0-9]/) || this.isBackspace(event);
  }

  /**
   * Verifies the backspace.
   * @param event - The KeyboardEvent.
   * @returns - A boolean value.
   */
  isBackspace(event: KeyboardEvent) {
    return event.key == 'Backspace';
  }

  /**
   * Adds a slash.
   */
  addSlash() {
    setTimeout(() => {
      let number = this.value.length;
      let slashTimed = this.slashNumbers.has(number);
      this.value += slashTimed ? '/' : '';
    }, 0);
  }

  /**
   * Clears the input value.
   * @param event - The KeyboardEvent.
   */
  clearInputValue(event: KeyboardEvent) {
    let input = event.target as HTMLInputElement;
    let selectionStart = input.selectionStart;
    if (selectionStart && selectionStart < this.value.length) {
      this.value = '';
      event.preventDefault();
    }
  }

  /**
   * Updates the date on keyup.
   */
  onUpdateDate() {
    let dateMatched = this.value.match(this.datePat);
    if (dateMatched) {
      let date = this.getDate(dateMatched);
      this.date = this.getFormattedDate(date, '-', true);
    }
  }

  /**
   * Provides the date.
   * @param result - The RegExpMatchArray.
   * @returns The date.
   */
  getDate(result: RegExpMatchArray) {
    return {
      day: result[1],
      month: result[2],
      year: result[3],
    };
  }

  /**
   * Provides the formatted date.
   * @param date - The date.
   * @param sign - The separator.
   * @param reversed - A boolean value.
   * @returns - The formatted date.
   */
  getFormattedDate(date: DateData, sign: string, reversed?: boolean) {
    if (reversed) {
      return date.year + sign + date.month + sign + date.day;
    } else {
      return date.day + sign + date.month + sign + date.year;
    }
  }

  // implement!!!
  validateDate(date: DateData) {
    let dateInput = this.getFormattedDate(date, '.');
    let validDate = new Date(this.getFormattedDate(date, '/', true));
    let dateMatch = dateInput == validDate.toLocaleDateString();
    if (validDate) {
      console.log('date input: ', dateInput);
      console.log('date validation: ', validDate.toLocaleDateString());
      console.log('date match: ', dateMatch);
    }
  }

  /**
   * Updates the value on change.
   * @param event - The event.
   */
  onUpdateValue(event: Event) {
    let input = event.target as HTMLInputElement;
    let dateMatched = input.value.match(this.calenderPat);
    if (dateMatched) {
      let date = this.getDate(dateMatched);
      this.value = this.getFormattedDate(date, '/', true);
    }
  }

  /**
   * Provides the css class of the hint.
   * @returns - The css class to apply.
   */
  getHintClass() {
    return this.dateInvalid ? 'o-1' : '';
  }
}
