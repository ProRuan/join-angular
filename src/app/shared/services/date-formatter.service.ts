import { Injectable } from '@angular/core';
import { dueDatePatterns } from '../ts/pattern';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing an date formatter service.
 */
export class DateFormatterService {
  pattern: RegExp;

  /**
   * Creates a date formatter service.
   */
  constructor() {
    this.pattern = dueDatePatterns.dueDate;
  }

  /**
   * Gets a calendar date.
   * @param date - The date to format.
   * @returns The calendar date.
   */
  getCalendarDate(date: string) {
    return date.split('/').reverse().join('-');
  }

  /**
   * Gets an input date.
   * @param date - The date to format.
   * @returns The input date.
   */
  getInputDate(date: string) {
    return date.split('-').reverse().join('/');
  }
}
