import { Injectable } from '@angular/core';
import { dueDatePatterns } from '../ts/pattern';
import { getDayStartTime, getISODateString } from '../ts/global';

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
   * Gets a minimum time (minimum date).
   * @returns The minimum time (minimum date).
   */
  getMinTime() {
    const minDate = getISODateString();
    return getDayStartTime(minDate);
  }

  /**
   * Gets a calendar date.
   * @param date - The input date.
   * @returns The calendar date.
   */
  getCalendarDate(date: string) {
    const calendarDate = this.getFormattedCalendarDate(date);
    return this.isDateInvalid(calendarDate) ? '' : calendarDate;
  }

  /**
   * Gets a formatted calendar date.
   * @param date - The date to format.
   * @returns The formatted calendar date.
   */
  private getFormattedCalendarDate(date: string) {
    const [d, m, year] = date.split('/');
    const day = this.getFormattedDatePart(d);
    const month = this.getFormattedDatePart(m);
    return `${year}-${month}-${day}`;
  }

  /**
   * Gets a formatted date part.
   * @param datePart - The date part to format.
   * @returns The formatted date part.
   */
  private getFormattedDatePart(datePart: string) {
    let num = Number(datePart);
    return num < 10 ? `0${num}` : num.toString();
  }

  /**
   * Verifies a date.
   * @param date - The date to verify.
   * @returns A boolean value.
   */
  isDateInvalid(date: string) {
    return new Date(date).toDateString() === 'Invalid Date';
  }

  /**
   * Gets an input date.
   * @param date - The date to format.
   * @returns The input date.
   */
  getInputDate(date: string) {
    return date.split('-').reverse().join('/');
  }

  /**
   * Verifies a current date.
   * @param date - The date to verify.
   * @returns A boolean value.
   */
  isCurrentDate(date: string) {
    let time = new Date(date).getTime();
    let minTime = this.getMinTime();
    return time >= minTime;
  }
}
