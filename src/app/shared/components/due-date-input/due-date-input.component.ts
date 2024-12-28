import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BasicInput, getProvider } from '../../models/basic-input';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { HintComponent } from '../hint/hint.component';
import { DateData } from '../../interfaces/date-data';
import { getDayStartTime, getISODateString } from '../../ts/global';

@Component({
  selector: 'app-due-date-input',
  standalone: true,
  imports: [CommonModule, LabelComponent, HintComponent],
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
  minDate: string = '';
  minTime: number = 0;
  calenderPat: RegExp = /([0-9]{4})[\-]([0-1]?[0-9])[\-]([0-3]?[0-9])/;
  arrowKeys: Set<string> = new Set(['ArrowLeft', 'ArrowRight']);
  modifiedKeys: Set<string> = new Set(['a', 'c', 'x']);
  dateInvalid: boolean = false;
  dateHint: string = 'Enter a valid date.';

  @Output('date') dateChange = new EventEmitter<string>();

  override pattern: string = '([\\d]{2})\\/([\\d]{2})\\/([\\d]{4})';
  override required: boolean = true;

  /**
   * Initializes the due date input component.
   */
  ngOnInit() {
    this.minDate = getISODateString();
    this.minTime = getDayStartTime(this.minDate);
  }

  /**
   * Provides the css class of the input border.
   * @returns - The css class to apply.
   */
  getBorderClass() {
    if (this.dateInvalid) {
      return 'error';
    } else if (this.focussed) {
      return 'focus';
    } else {
      return '';
    }
  }

  /**
   * Verifies the key on keydown.
   * @param event - The KeyboardEvent.
   */
  onVerifyKey(event: KeyboardEvent) {
    if (this.isPreventDefault(event)) {
      event.preventDefault();
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
    return event.key.match(/[\d\/]/) || this.isBackspace(event);
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
   * Updates the date on keyup.
   */
  onUpdateDate() {
    let matchedDate = this.value.match(this.pattern);
    if (matchedDate) {
      let date = this.getDate(matchedDate);
      this.date = this.getFormattedDate(date, '-', true);
      this.validate(this.control);
    }
  }

  /**
   * Provides the date.
   * @param result - The RegExpMatchArray.
   * @returns - The date.
   */
  getDate(result: RegExpMatchArray) {
    return { day: result[1], month: result[2], year: result[3] };
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

  /**
   * Updates the value on change.
   * @param event - The event.
   */
  onUpdateValue(event: Event) {
    let input = event.target as HTMLInputElement;
    let matchedDate = input.value.match(this.calenderPat);
    if (matchedDate) {
      let date = this.getDate(matchedDate);
      this.value = this.getFormattedDate(date, '/', true);
      this.dateChange.emit(this.value);
      this.focussed = false;
    }
  }

  /**
   * Verifies the mismatch between input value and input pattern.
   * @returns - A boolean value.
   */
  override isMismatch() {
    this.validateDate();
    return this.isNotPattern();
  }

  /**
   * Validates the date.
   * @returns - A boolean value or void.
   */
  validateDate(): boolean | void {
    let dateMatched = new RegExp(this.pattern).test(this.control.value);
    if (dateMatched) {
      let matchedDate = this.control.value.match(this.pattern);
      if (matchedDate) {
        this.updateDateInvalidity(matchedDate);
        return this.dateInvalid;
      }
    }
  }

  /**
   * Updates the invalidity state of the date.
   * @param matchedDate - The matched date.
   */
  updateDateInvalidity(matchedDate: RegExpMatchArray) {
    let date = this.getAdjustedDate(matchedDate);
    let dateMatch = this.isDateMatch(date);
    let time = this.getTime(date);
    this.dateInvalid = !(dateMatch && time >= this.minTime);
  }

  /**
   * Provides the adjusted date.
   * @param matchedDate - The matched date.
   * @returns The adjusted date.
   */
  getAdjustedDate(matchedDate: RegExpMatchArray) {
    let date = this.getDate(matchedDate);
    this.formatDatePart(date, 'day');
    this.formatDatePart(date, 'month');
    return date;
  }

  /**
   * Formates the date part.
   * @param date - The date.
   * @param key - The key of the date part.
   */
  formatDatePart(date: DateData, key: string) {
    let datePart = parseInt(date[key]);
    date[key] = datePart.toString();
  }

  /**
   * Verifies the date match.
   * @param date - The date.
   * @returns - A boolean value.
   */
  isDateMatch(date: DateData) {
    let dateInput = this.getFormattedDate(date, '.');
    let formattedDate = new Date(this.getFormattedDate(date, '/', true));
    let dateOutput = formattedDate.toLocaleDateString();
    return dateInput == dateOutput;
  }

  /**
   * Provides the time.
   * @param date - The date.
   * @returns - The time.
   */
  getTime(date: DateData) {
    let formattedDate = this.getFormattedDate(date, '/', true);
    return new Date(formattedDate).getTime();
  }
}
