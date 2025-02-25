import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { LabelComponent } from '../../label/label.component';
import { getProvider, ReactiveInput } from '../../../models/reactive-input';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DateFormatterService } from '../../../services/date-formatter.service';
import { dueDatePatterns } from '../../../ts/pattern';
import { getISODateString } from '../../../ts/global';

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
 * Class representing a due date input component.
 * @extends ReactiveInput
 */
export class DueDateInputComponent extends ReactiveInput {
  dateFormatter: DateFormatterService = inject(DateFormatterService);

  pattern: RegExp = dueDatePatterns.dueDate;
  minDate: string = '';

  @Input() override control: AbstractControl<any, any> | null = null;
  @Input() calendar: AbstractControl | null = null;

  /**
   * Gets the value of a task control.
   * @returns The value of the task control.
   */
  get dueDate() {
    return this.calendar?.value;
  }

  /**
   * Sets the value of a task control.
   * @param value - The value to set.
   */
  set dueDate(value: string) {
    this.calendar?.setValue(value);
  }

  /**
   * Initializes a due date input component.
   */
  ngOnInit() {
    this.minDate = getISODateString();
  }

  /**
   * Gets the css class of an input border.
   * @returns The css class of the input border.
   */
  getBorderClass() {
    if (this.isInvalid()) {
      return 'invalid';
    } else if (this.focused) {
      return 'focus';
    } else {
      return 'default';
    }
  }

  /**
   * Updates an input on keydown.
   */
  onInputUpdate() {
    setTimeout(() => this.updateCalendar(), 0);
  }

  /**
   * Updates a calendar.
   */
  updateCalendar() {
    this.dueDate = this.getDueDate();
  }

  /**
   * Gets a due date.
   * @returns The due date.
   */
  getDueDate() {
    if (this.isInputValid()) {
      return this.dateFormatter.getCalendarDate(this.value);
    } else {
      return '';
    }
  }

  /**
   * Verifies the validity of the input value.
   * @returns A boolean value.
   */
  isInputValid() {
    return this.pattern.test(this.value);
  }

  /**
   * Updates a calendar on change.
   * @param event - The event.
   */
  onCalendarUpdate(event: Event) {
    let calendar = event.target as HTMLInputElement;
    this.dueDate = calendar.value;
    this.updateInput();
    this.resetInputState();
  }

  /**
   * Updates an input.
   */
  updateInput() {
    this.value = this.dateFormatter.getInputDate(this.dueDate);
  }

  /**
   * Resets an input state.
   */
  resetInputState() {
    this.error = '';
    this.focused = false;
  }
}
